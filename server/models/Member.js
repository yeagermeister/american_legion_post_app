const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const memberSchema = new Schema(
    {
        memberID: {
            type: Number,
            required: true,
            unique: true,
          },
        name: {
            type: String,
            unique: true,
        },
        org: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            // Using regex to validate an email address
            match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          },
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
          },
    },
);

// hash user password
memberSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
  });
  
  // custom method to compare and validate password for logging in
memberSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

const Member = model('Member', memberSchema);

module.exports = Member;