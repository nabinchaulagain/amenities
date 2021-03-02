const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../../src');
const { createTables, dropTables } = require('../helpers/db');

const request = supertest(app);

before(async () => {
  await createTables();
});

describe('In ads routes', () => {
  describe('GET => /api/ads', () => {
    it('should return empty arra', async () => {
      const res = await request.get('/api/ads');
      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal([]);
    });
  });

  describe('GET => /api/ads/:id', () => {
    it('should show error for non-existent ad', async () => {
      const res = await request.get('/api/ads/1023');
      expect(res.status).to.equal(404);
    });
  });
});

after(async () => {
  await dropTables();
});
