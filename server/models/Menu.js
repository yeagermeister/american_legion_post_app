const { Schema, model } = require('mongoose');
const { formatDate } = require('../helpers/helpers');

// Schema to create Menu model
const menuSchema = new Schema(
  {
    menuText: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 280,
      mutable: true
    },    
    serveDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
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

const Menu = model('Menu', menuSchema);

module.exports = Menu;
