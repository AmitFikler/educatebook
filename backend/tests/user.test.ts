import mongoose from 'mongoose';
import supertest from 'supertest';
import { app } from '../src/index';
import { User } from '../src/models/User';
const api = supertest(app);

const userToken = { token: '' };
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

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(users);
});

describe('api testing', () => {
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
      expect(hasToken).toBe(true);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
