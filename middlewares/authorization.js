const jwt = require('jsonwebtoken')
const theTodo = require('../models').Todo

module.exports = function (req,res,next) {
  theTodo
    .findOne({ where : { id : req.params.id } })
    .then(result=>{
      if(result) {
        if(req.headers.decoded.userid == result.UserId) {
          next();
        } else {
          res.status(400).json( { msg : "you have no right to access this" } )
        }
      } else {
        res.status(400).json( { msg : "you have no right to access this" } )
      }
    })
    .catch(err=>{
      res.status(500).json( { msg : "internal server error, while doing authorization" } )
    })
}