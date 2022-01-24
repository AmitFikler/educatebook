import mongoose from 'mongoose';
import supertest from 'supertest';
import { app } from '../src/index';
import { User } from '../src/models/User';
const api = supertest(app);

const userToken: {
  token: string;
} = { token: '' };
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
  await User.insertMany(users);
});

describe('user testing:', () => {
  describe('GET /api/user:', () => {
    it('should be 1 user', async () => {
      const response = await api.get('/api/user');
      expect(response.body).toHaveLength(1);
    });
  });
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
    // it('should login with current details and get token', async () => {
    //   const response = await api.post('/api/login').send({
    //     username: 'amit@gmail.com',
    //     password: '123456',
    //   });
    //   let hasToken = response.body.hasOwnProperty('token');
    //   userToken.token = response.body.token;
    //   expect(hasToken).toBe(true);
    // });
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

afterAll(() => {
  mongoose.connection.close();
});
