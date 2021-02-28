const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../../src');
const { createTables, dropTables } = require('../helpers/db');
const getToken = require('../helpers/getLoginToken');

const request = supertest(app);

before(async () => {
  await createTables();
});

describe('In auth routes', () => {
  describe('POST => /auth/signup', () => {
    it('should show error for invalid data', async () => {
      const user = {};
      const res = await request.post('/api/auth/signup').send(user);
      expect(res.status).to.equal(400);
      expect(res.body).to.have.keys('error', 'detail');
      expect(res.body.detail).to.have.keys('email', 'username', 'password');
    });

    it('should create account for valid data', async () => {
      const user = {
        username: 'nabin',
        password: 'nabin',
        email: 'nabinch@email.com'
      };
      const res = await request.post('/api/auth/signup').send(user);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.keys('message', 'user');
      expect(res.body.user.username).to.equal(user.username);
      expect(res.body.user.email).to.equal(user.email);
    });

    it("shouldn't create user for duplicate username", async () => {
      const user = {
        username: 'nabin2',
        password: 'nabin',
        email: 'nabinch2@email.com'
      };
      const res1 = await request.post('/api/auth/signup').send(user);
      expect(res1.status).to.equal(200);
      const res = await request.post('/api/auth/signup').send(user);
      expect(res.status).to.equal(409);
      expect(res.body).to.have.keys('error', 'detail');
    });
  });

  describe('POST => /auth/login', () => {
    it('should show error for invalid username', async () => {
      const userData = { username: 'invalid', password: 'nabin' };
      const res = await request.post('/api/auth/login').send(userData);
      expect(res.status).to.equal(404);
      expect(res.body).to.have.keys('error', 'detail');
    });

    it('should show error for invalid password', async () => {
      const userData = {
        email: 'valid@gmail.com',
        username: 'valid',
        password: 'invalid'
      };
      const signUpRes = await request.post('/api/auth/signup').send(userData);
      expect(signUpRes.status).to.equal(200);
      const res = await request
        .post('/api/auth/login')
        .send({ username: userData.username, password: 'wrong' });
      expect(res.status).to.equal(401);
    });

    it('should send token if credentials are valid', async () => {
      const userData = {
        username: 'nabinch',
        password: 'nabinch',
        email: 'chaulagainnabin9@gmail.com'
      };
      const signUpRes = await request.post('/api/auth/signup').send(userData);
      expect(signUpRes.status).to.equal(200);
      const res = await request
        .post('/api/auth/login')
        .send({ username: userData.username, password: userData.password });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.keys('message', 'token');
      expect(res.body.token).to.match(/.+\..+\..+/);
    });
  });

  describe('GET => /auth/api', () => {
    it('should show not logged in status', async () => {
      const res = await request.get('/api/auth');
      expect(res.status).to.equal(200);
      expect(res.body.isLoggedIn).to.equal(false);
    });

    it('should show logged in status', async () => {
      const token = await getToken(request);
      const res = await request.get('/api/auth').set({ Authorization: token });
      expect(res.status).to.equal(200);
      expect(res.body.isLoggedIn).to.equal(true);
    });
  });
});

after(async () => {
  await dropTables();
});
