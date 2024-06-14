const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../index');

require('dotenv').config();

const { MongoClient } = require('mongodb');

describe('Routes', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db('test');
  });

  afterAll(async () => {
    await connection.close();
  });

  //test getting all users route
  describe('GET /api/auth/allusers/:id', () => {
    it('should return all contacts', async () => {
      const res = await request(app).get(
        '/api/auth/allusers/6669d9359099691ed47dd1bf'
      );
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  //test logging in correctly
  describe('POST /api/auth/login', () => {
    it('should login a user with correct credentials', async () => {
      const res = await request(app).post('/api/auth/login').send({
        username: 'test',
        password: '11111111',
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.user.username).toBe('test');
    });
  });

  // test login with incorrect password
  it('should NOT login a user with incorrect credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({
      username: 'test',
      password: 'wrong',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.msg).toBe('Incorrect username or password');
  });

  //test getting all messages between two users
  describe('POST /api/auth/messages/getmsg', () => {
    it('should get all msgs between two users', async () => {
      const res = await request(app).post('/api/messages/getmsg').send({
        from: '6669d9359099691ed47dd1bf',
        to: '666a07f34a99a0d477feea14',
      });
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  //test sending messages between two users
  describe('POST /api/messages/addmsg', () => {
    it('should send a message between two users', async () => {
      const res = await request(app).post('/api/messages/addmsg').send({
        from: '6669d9359099691ed47dd1bf',
        to: '666a07f34a99a0d477feea14',
        message: 'test',
      });
      expect(res.statusCode).toBe(200);
      expect(res.body.msg).toBe('Message added sucessfully.');
    });
  });
});
