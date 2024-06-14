const User = require('../Model/userModel');
const bcrypt = require('bcrypt');

//destructure form fields and add new user to database, as long as the name or email address are not already in use
module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.json({ msg: 'Username already taken', status: false });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: 'Email Address already in use', status: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};

//destructure login info from req body and check db for correct user credentials
module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ msg: 'Incorrect username or password', status: false });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ msg: 'Incorrect username or password', status: false });
    }
    delete user.password;
    return res.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};

// {
//   log: `userController.login: ERROR: ${err}`,
//   message: {
//     err: 'Error occured in userController.login. Incorrect Username or Password.',
//   },
// }

//set icon for user in database
module.exports.setIcon = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage,
    });
    return res.json({
      isSet: true,
      image: avatarImage,
    });
  } catch (err) {
    next(err);
  }
};

//get all users from db
module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      'email',
      'username',
      'avatarImage',
      '_id',
    ]);
    return res.json(users);
  } catch (err) {
    next(err);
  }
};
