const {
  register,
  login,
  setIcon,
  getAllUsers,
} = require('../Controllers/userController');

const router = require('express').Router();

//create routes for adding, logging in, setting icons, and retrieving all users from db
router.post('/register', register);

router.post('/login', login);

router.post('/seticon/:id', setIcon);

router.get('/allusers/:id', getAllUsers);

module.exports = router;
