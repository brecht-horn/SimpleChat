const {
  addMessage,
  getAllMessage,
} = require('../Controllers/messagesController');

const router = require('express').Router();

//create routes for adding messages and retrieving all messages from db

router.post('/addmsg', addMessage);

router.post('/getmsg', getAllMessage);

module.exports = router;
