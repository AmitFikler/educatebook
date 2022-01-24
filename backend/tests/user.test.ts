import mongoose from 'mongoose';
import supertest from 'supertest';
import { app } from '../src/index';
import { Post } from '../src/models/Post';
import { User } from '../src/models/User';
const api = supertest(app);

const userToken: { token: String } = { token: '' };
const users = [
  {
    _id: '61e58ae42184d73091dcf6bb',
    username: 'amit@gmail.com',
    password: '$2b$10$86cxTndHzXtc8Tx2V/i76eS7Yd3xm51I.0LzDu6kcVlOS0tiRDAXi',
    role: 'student',
    createdAt: '2022-01-17T15:27:32.924Z',
    updatedAt: '2022-01-24T13:54:06.233Z',
    __v: 5,
    posts: [],
    comments: [],
  },
];

beforeAll(async () => {
  await User.deleteMany({});
  await Post.deleteMany({});
  await User.insertMany(users);
});

describe('USER TESTING:', () => {
  describe('GET /api/user:', () => {
    it('should be 1 user', async () => {
      const response = await api.get('/api/user');
      expect(response.body).toHaveLength(1);
    });
  });
  describe('POST /api/user:', () => {
    it('should create a new user', async () => {
      const response = await api.post('/api/user').send({
        username: 'test@gmail.com',
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
      const response = await api.post('/api/login').send({
        username: 'amit@gmail.com',
        password: '123456',
      });
      let hasToken = response.body.hasOwnProperty('token');
      userToken.token = response.body.token;
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
  describe('GET /api/post', () => {
    it('should be 0 posts', async () => {
      const allPosts = await api.get('/api/post');
      expect(allPosts.body).toHaveLength(0);
    });
  });

  describe('POST /api/post:', () => {
    it('should user with valid token can post a valid post', async () => {
      const response = await api
        .post('/api/post')
        .send({
          title: 'valid post',
          content: 'testing',
        })
        .set({ Authorization: 'Bearer ' + userToken.token })
        .expect(200);
      let usernameId = response.body.hasOwnProperty('usernameId');
      expect(usernameId).toBe(true);
      const allPosts = await api.get('/api/post');
      expect(allPosts.body).toHaveLength(1);
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
});

afterAll(() => {
  mongoose.connection.close();
});
