const mongoose = require('mongoose');

require('dotenv').config();

const { MongoClient } = require('mongodb');

describe('Messages DB Tests', () => {
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

  it('should insert a message into collection', async () => {
    const msgs = db.collection('messages');

    const mockMsg = {
      _id: '0',
      message: {
        text: 'test',
      },
      users: ['test1', 'test2'],
      sender: 'test3',
    };
    await msgs.insertOne(mockMsg);

    const insertedMsg = await msgs.findOne({ _id: '0' });
    const deleted = await msgs.findOneAndDelete({ _id: '0' });

    expect(insertedMsg).toEqual(mockMsg);
  });

  it('should get all messages', async () => {
    const msgs = db.collection('messages');

   //create and insert mock msg BEFORE checking all, in case working with empty db

    const mockMsg2 = {
      _id: '1',
      message: {
        text: 'test',
      },
      users: ['test1', 'test2'],
      sender: 'test3',
    };
    await msgs.insertOne(mockMsg2);

    let data = await msgs
      .find()
      .toArray()
      .then((data) => data)
      .catch((err) => err);

    const deleted2 = await msgs.findOneAndDelete({ _id: '1' });

    expect(data.length).toBeGreaterThan(0);
  });
});
