const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, "companySecretCode");
    req.body.user_id = decoded.userId;
    next();
  } catch (error) {
    // console.error(error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};