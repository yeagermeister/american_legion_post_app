const jwt = require('jsonwebtoken');

const secret = 'thislandisyourlandthislandismyland';
const expiration = '168h';

module.exports = {
    authMiddleware: function (req, res, next) {

      let token = req.body.token || req.query.token || req.headers.authorization;

      if (req.headers.authorization) {
        token = token.split(' ').pop().trim();
      }
  
      if (!token) {
        // If there's no token, you might want to handle this case (e.g., return an error response)
        return res.status(401).json({ error: 'Unauthorized' });
      }
  
      try {
        const { data } = jwt.verify(token, secret, { maxAge: expiration });
        req.user = data;
        next(); // Call next() to move to the next middleware or route handler
      } catch (error) {
        console.log('Invalid token');
        // Handle the case where the token is invalid (e.g., return an error response)
        return res.status(401).json({ error: 'Invalid token' });
      }
    },
  
    signToken: function ({ email, username, _id, role, org, position }) {
      const payload = { email, username, _id, role, org, position };
      return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
  };