const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

// Schemal to create the User model
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      // Using regex to validate an email address
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    username: {
      type: String,
      unique: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
    },
    thoughts:[{
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    }],
    memberID: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    org: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: 'user',
    },
    position: {
      type: String,
      required: true,
      default: 'member',
    },
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);  

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('user', userSchema)

module.exports = User;
