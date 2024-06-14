const mongoose = require('mongoose');

require('dotenv').config();


const { MongoClient } = require('mongodb');

describe('Users DB Tests', () => {
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

  it('should insert a user into collection', async () => {
    const users = db.collection('users');

    const mockUser = {
      _id: '0',
      name: 'John',
      email: 'test',
      password: 'test',
      isAvatarImageSet: 'test',
      avatarImage: 'test',
    };
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({ _id: '0' });
    const deleted = await users.findOneAndDelete({ _id: '0' });

    expect(insertedUser).toEqual(mockUser);
  });

  it('should get all users', async () => {
    const users = db.collection('users');

    //create and insert mock user BEFORE checking all users, in case working with empty db
    const mockUser2 = {
      _id: '1',
      name: 'John',
      email: 'test1',
      password: 'test',
      isAvatarImageSet: 'test',
      avatarImage: 'test',
    };
    await users.insertOne(mockUser2);

    let data = await users
      .find()
      .toArray()
      .then((data) => data)
      .catch((err) => err);

    const deleted2 = await users.findOneAndDelete({ _id: '1' });

    expect(data.length).toBeGreaterThan(0);
  });
});
