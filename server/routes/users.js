const router = require('express').Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  login,
} = require('../controllers/userController');

//import auth middleware so we can lockdown routes.
const { authMiddleware, adminMiddleware } = require('../helpers/auth');

// /api/users
router.route('/')
.get(authMiddleware, adminMiddleware, (req, res) => {getUsers (req, res);})
.post(createUser);

router.route('/login').post(login);

// /api/users/:userid
router
  .route('/:userId')
  .get(authMiddleware, adminMiddleware, (req, res) => {getSingleUser (req, res);})
  .put(authMiddleware, adminMiddleware, (req, res) => {updateUser (req, res);})
  .delete(authMiddleware, adminMiddleware, (req, res) => {deleteUser (req, res);});

module.exports = router;
