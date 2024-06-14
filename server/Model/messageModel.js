const mongoose = require('mongoose');

const myURI =
  'mongodb+srv://Brechtsky:nyszuf-rezNim-hyswi2@cluster0.s4u0pt8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/chat';

const URI = myURI;

//create schema for messages for use in db
const MessageSchema = mongoose.Schema(
  {
    message: {
      text: { type: String, required: true },
    },
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Messages', MessageSchema);
