const router = require('express').Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  login,
} = require('../../controllers/userController');

//import auth middleware so we can lockdown routes.
const { authMiddleware } = require('../../helpers/auth');

// /api/users
router.route('/')
.get(authMiddleware,(req, res) => {getUsers (req, res);})
.post(createUser);

router.route('/login').post(login);

// /api/users/:userid
router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
