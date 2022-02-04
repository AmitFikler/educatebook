import mongoose from 'mongoose';
import supertest from 'supertest';
import app, { server } from '../src';
import { Comment } from '../src/models/Comments';
import { Post } from '../src/models/Post';
import { User } from '../src/models/User';
const api = supertest(app);

const userToken: { token: String } = { token: '' }; // amit@gmail.com token
const users = [
  {
    _id: '61e58ae42184d73091dcf6bb',
    username: 'amit@gmail.com',
    password: '$2b$10$86cxTndHzXtc8Tx2V/i76eS7Yd3xm51I.0LzDu6kcVlOS0tiRDAXi', //123456
    role: 'student',
    createdAt: '2022-01-17T15:27:32.924Z',
    updatedAt: '2022-01-24T13:54:06.233Z',
    __v: 5,
    posts: [],
    comments: [],
  },
  {
    _id: '61eedb80d67609479e328f9f',
    username: 'test@gmail.com',
    password: '$2b$10$QowR0IpE0zKP.bVBSLR0UO/jpja7.Z/PbI7T3xlQ15IZfUsWteVIG', //654321
    role: 'tutor',
    posts: ['61eedbf7212687000f4add13'],
    comments: [],
    createdAt: '2022-01-24T17:01:52.366Z',
    updatedAt: '2022-01-24T17:01:52.366Z',
    __v: 0,
  },
];

const posts = [
  {
    usernameId: '61eedb80d67609479e328f9f',
    title: 'TEST POST',
    content: 'this is test@gmail.com post',
    likes: 0,
    comments: [],
    _id: '61eedbf7212687000f4add13',
    createdAt: '2022-01-24T17:03:51.293Z',
    updatedAt: '2022-01-24T17:03:51.293Z',
    __v: 0,
  },
];

beforeAll(async () => {
  await User.deleteMany({});
  await Post.deleteMany({});
  await User.insertMany(users);
  await Post.insertMany(posts);
});

describe('USER TESTING:', () => {
  describe('GET /api/user:', () => {
    it('should be 2 users', async () => {
      const response = await api.get('/api/user');
      expect(response.body).toHaveLength(2);
    });
  });
  describe('POST /api/user:', () => {
    it('should create a new user', async () => {
      const response = await api.post('/api/user').send({
        username: 'testing@gmail.com',
        password: 'test123',
        role: 'student',
      });
      expect(response.text).toBe('user created!');
    });

    it('should hash user password', async () => {
      const user = await User.findOne({ username: 'test@gmail.com' });
      expect(user?.password === 'test123').toBe(false);
    });

    it('should throw error (status 400) if username not valid email', async () => {
      await api
        .post('/api/user')
        .send({
          username: 'testgmail.com',
          password: 'test123',
          role: 'student',
        })
        .expect(400);
    });
  });
});

describe('LOGIN TESTING', () => {
  describe('POST /api/login:', () => {
    it('should login with current details and get token', async () => {
      const response = await api
        .post('/api/login')
        .send({
          username: 'amit@gmail.com',
          password: '123456',
        })
        .expect(202);
      let hasToken = response.body.hasOwnProperty('token');
      userToken.token = response.body.token; // amit@gmail.com token
      expect(hasToken).toBe(true);
    });

    it('should throw (403) with incurrent details (password)', async () => {
      const response = await api
        .post('/api/login')
        .send({
          username: 'amit@gmail.com',
          password: 'NOT_PASSWORD',
        })
        .expect(403);
      expect(response.body.error).toBe('wrong password');
    });

    it('should throw (403) with incurrent details (username)', async () => {
      const response = await api
        .post('/api/login')
        .send({
          username: 'amitFAIL@gmail.com',
          password: '123456',
        })
        .expect(403);
      expect(response.body.error).toBe('wrong username');
    });
  });
});

describe('POST TESTING:', () => {
  describe('GET /api/post:', () => {
    it('should be 1 post', async () => {
      const allPosts = await api.get('/api/post');
      expect(allPosts.body).toHaveLength(1);
    });
  });

  describe('POST /api/post:', () => {
    it('should user with valid token can post a valid post', async () => {
      const allPostsBefore = await Post.find({});
      const response = await api
        .post('/api/post')
        .send({
          title: 'valid post',
          content: 'testing',
        })
        .set({ Authorization: 'Bearer ' + userToken.token })
        .expect(201);
      const user = await User.findById(response.body.usernameId);
      const postInsideUserPosts = user?.posts.includes(response.body._id);
      expect(postInsideUserPosts).toBe(true);
      const allPostsAfter = await Post.find({});
      expect(allPostsBefore.length + 1).toBe(allPostsAfter.length);
    });

    it('should throw (401) if user with invalid token', async () => {
      await api
        .post('/api/post')
        .send({
          title: 'valid post',
          content: 'testing',
        })
        .set({ Authorization: 'Bearer ' + 'invalidToken' })
        .expect(401);
    });

    it('should throw (400) if user with invalid post', async () => {
      await api
        .post('/api/post')
        .send({
          title: '',
          content: 'testing',
        })
        .set({ Authorization: 'Bearer ' + userToken.token })
        .expect(400);
    });
  });

  describe('PUT /api/post/like:', () => {
    it('should like a post', async () => {
      const postToLike = await Post.findOne();
      const postBeforeLike = postToLike?.likes;
      await api
        .put('/api/post/like')
        .send({
          postId: postToLike?.id,
        })
        .expect(200);
      const postAfterLike = await Post.findById(postToLike?.id);
      expect(postAfterLike?.likes).toBe(postBeforeLike! + 1);
    });

    it('should throw if gets invalid id', async () => {
      const postToLike = await Post.findOne();
      expect(postToLike?.likes).toBe(1);
      await api.put('/api/post/like').send({
        postId: 'invalidId',
      });
      const postAfterLike = await Post.findById(postToLike?.id);
      expect(postAfterLike?.likes).toBe(1);
    });

    it('should throw (400) if not gets id', async () => {
      const postToLike = await Post.findOne();
      expect(postToLike?.likes).toBe(1);
      await api
        .put('/api/post/like')
        .send({
          postId: '',
        })
        .expect(404);
      const postAfterLike = await Post.findById(postToLike?.id);
      expect(postAfterLike?.likes).toBe(1);
    });
  });

  describe('DELETE /api/post:', () => {
    it('should throw (401) if user with invalid token', async () => {
      const allPostsBefore = await Post.find({});
      await api
        .delete(`/api/post/${allPostsBefore[0]._id}`)
        .set({ Authorization: 'Bearer ' + 'invalidToken' })
        .expect(401);
    });

    it('should throw (400) if user with invalid post id', async () => {
      await api
        .delete(`/api/post/invalidId`)
        .set({ Authorization: 'Bearer ' + userToken.token })
        .expect(404);
    });
    it(`should user can not delete a post that is not his`, async () => {
      await api
        .delete(`/api/post/61eedbf7212687000f4add13`)
        .set({ Authorization: 'Bearer ' + userToken.token }) // Unauthorized
        .expect(401);
    });

    it(`should deletes the post if that user's post`, async () => {
      const userAmitBefore = await User.findOne({ username: 'amit@gmail.com' });
      const allPostsBefore = await Post.find({});
      const amitPost = await Post.findOne({ usernameId: userAmitBefore?._id });
      await api
        .delete(`/api/post/${amitPost?._id}`)
        .set({ Authorization: 'Bearer ' + userToken.token }) // authorized
        .expect(204);
      const userAmitAfter = await User.findOne({ username: 'amit@gmail.com' });
      const postInsideUserPosts = userAmitAfter!.posts.includes(
        allPostsBefore[0]._id
      );
      expect(postInsideUserPosts).toBe(false);
      const allPostsAfter = await Post.find({});
      expect(allPostsBefore.length - 1).toBe(allPostsAfter.length);
    });
  });
});

describe('COMMENTS TESTING:', () => {
  describe('PUT /api/comment:', () => {
    it('User can comment on posts', async () => {
      const allComentsBefore = await Comment.find({});
      const postToComment = await Post.findOne(); // find a post
      const commentBefore = postToComment?.comments; // get the comments before
      const response = await api // make a comment
        .post('/api/comment')
        .send({
          commentOn: postToComment?.id,
          content: 'testing',
        })
        .set({ Authorization: 'Bearer ' + userToken.token })
        .expect(201);

      const postAfterComment = await Post.findById(postToComment?.id); // get the post after comment
      const allCommentAfter = await Comment.find({}); // get all comments after
      expect(allCommentAfter.length).toBe(allComentsBefore.length + 1); // check if the comment was added
      expect(postAfterComment?.comments.length).toBe(commentBefore!.length + 1); // check if the comments are increased
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});
