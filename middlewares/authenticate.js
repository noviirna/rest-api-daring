const jwt = require('jsonwebtoken')

module.exports = function (req,res,next) {
  try {
    var decoded = jwt.verify(req.headers.token, 'rahasia');
    req.headers.decoded = decoded
    next();
  } catch(err) {
    console.log(err)
    res.status(400).json({ msg : "you had no token, please login first"})
  }
}