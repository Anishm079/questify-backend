const jwt = require('jsonwebtoken');
const logEvent = require("../utils/logErrors");

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, "companySecretCode");
    if(decoded){
      req.body.user_id = decoded.userId;
      return next();
    }
    return res.status(403).json({ error: 'Unauthorized' });
    
  } catch (error) {
    logEvent("jwt",error.message)
    res.status(403).json({ error: 'Unauthorized' });
  }
};