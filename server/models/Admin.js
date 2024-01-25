const { Schema, model } = require('mongoose');

const adminSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            // Using regex to validate an email address
            match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          },
    }
);

const Admin = model('Admin', adminSchema);

module.exports = Admin;
