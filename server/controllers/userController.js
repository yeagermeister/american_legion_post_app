const { User, Thought } = require('../models');
const { signToken } = require('../helpers/auth');

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {
          users
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId})
      .lean()
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({
              user
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => {
        const token = signToken(user);
        res.json({ token, user })
      })
      .catch((err) => res.status(500).json(err));
  },
  // login a user, sign a token, and send it back
  // {body} is destructured req.body
  async login({ body }, res) {
    console.log("trying to log in: ", body);
    const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });
    if (!user) {
      return res.status(400).json({ message: "Can't find this user" });
    }

    const correctPw = await user.isCorrectPassword(body.password);

    if (!correctPw) {
      return res.status(400).json({ message: 'Wrong password!' });
    }
    const token = signToken(user);
    res.json({ token, user });
  },

  // Delete a user
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No such user exists' })
          : Thought.findOneAndRemove(
              { users: req.params.userId },
              { $pull: { username: req.params.userId } },
              { new: true }
            )
      )
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: 'User deleted, but no thoughts found',
            })
          : res.json({ message: 'User successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
// Update a username and/or email address
  updateUser(req, res) {
    User.findOneAndUpdate(
      {_id: req.params.userId},
      req.body, { new: true, runValidators: true }
    )
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user with this id!' })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
  },
  // add a friend
  addFriend(req,res) {
    User.findOneAndUpdate(
      {_id: req.params.userId},
      {$addToSet: {'friends' : req.params.friendId}},
      { new: true, runValidators: true }
    )
    .then((user) =>
    !user
      ? res.status(404).json({ message: 'No user with this id!' })
      : res.json(user)
   )
    .catch((err) => res.status(500).json(err));
  },
  // delete a friend
  deleteFriend(req,res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
    .then((user) =>
    !user
      ? res.status(404).json({ message: 'No user with this id!' })
      : res.json(user)
  )
  .catch((err) => res.status(500).json(err));
  }
};
