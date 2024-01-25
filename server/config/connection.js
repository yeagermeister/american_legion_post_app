const { connect, connection } = require('mongoose');
const dotenv = require('dotenv').config();

const connectionString = process.env.MONGODB_URI

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected successfully')
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

module.exports = connection;
