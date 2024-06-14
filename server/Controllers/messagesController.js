const Messages = require('../Model/messageModel');

//destructure message from req body and create in db
module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (data) {
      return res.json({ msg: 'Message added sucessfully.' });
    } else return res.json({ msg: 'Failed to add message to the database.' });
  } catch (err) {
    next(err);
  }
};

//destructure sender and user from req body and retrieve their messages from db
module.exports.getAllMessage = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });
    const projectMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    return res.json(projectMessages);
  } catch (err) {
    next(err);
  }
};
