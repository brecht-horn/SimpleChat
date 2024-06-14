const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./Routes/userRoutes');
const messagesRoutes = require('./Routes/messagesRoutes');
const socket = require('socket.io');

const app = express();

// use env file
require('dotenv').config();

//use cors for security best practices, and express for backend communication
app.use(cors());
app.use(express.json());

//run ping for docker compose
app.get('/ping', (_req, res) => {
  return res.json({ msg: 'Ping Successful' });
});

// use user route middleware for user creation and login
app.use('/api/auth', userRoutes);

// use messages route middleware for message sending and receiving
app.use('/api/messages', messagesRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB Connection Successful');
  })
  .catch((err) => {
    console.log(err.message);
  });

//on creation of server log to console
const server = app.listen(process.env.PORT, () => {
  console.log(`Server Started on Port ${process.env.PORT}`);
});

//create socket connection
const io = socket(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

// create map for online users for sockets
global.onlineUsers = new Map();

//add user to online users for sockets
io.on('connection', (socket) => {
  global.chatSocket = socket;
  socket.on('add-user', (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  //send message with sockets
  socket.on('send-msg', (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit('msg-receive', data.message);
    }
  });
});

module.exports = app;
