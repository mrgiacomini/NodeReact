const jwt = require('jsonwebtoken');
const keys = require('../config/keys')
const User = require('../models/user');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).send({ error: 'No token provided' });

  const parts = authHeader.split(' ');

  if (!parts.length === 2)
    return res.status(401).send({ error: 'Token error' });

  const [ scheme, token ] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: 'Token malformatted' });

  jwt.verify(token, keys.JWT_SECRET, (err, decoded) => {
    
    if (err) return res.status(401).send({ error: err.name });
    
    req.userId = decoded.id;
    req.role = decoded.role;
    return next();
  });
};