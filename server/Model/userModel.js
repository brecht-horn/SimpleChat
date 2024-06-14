const mongoose = require('mongoose');

const myURI =
  'mongodb+srv://Brechtsky:nyszuf-rezNim-hyswi2@cluster0.s4u0pt8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/chat';

const URI = myURI;

//create schema for users for use in db
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 50,
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  avatarImage: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('Users', userSchema);
