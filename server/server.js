//define the npm packages we are using
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');



const db = require('./config/connection');  //import the connection to the mongo database
const routes = require('./routes');

const PORT = process.env.PORT || 3001;  //sets the port to use for the express server
const app = express();  //define the express server

//set up cors Options to prevent cors errors
var corsOptions = {
  // origin: 'http://localhost:3000',
  origin: 'http://localhost:19006',
  optionsSuccessStatus: 200,
};

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
};



app.use(cors(corsOptions)); //add the cors options to the express server
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
