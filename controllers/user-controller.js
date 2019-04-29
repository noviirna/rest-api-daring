const User = require('../models').User
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class ControllerUser{
  static getAll(req, res){
    User.
      findAll()
      .then(results=>{
        if(results.length > 1) {
          res.json(results)
        } else {
          res.status(500).json({ msg : "Internal server error, data not found" })
        }
      })
      .catch(err=>{
        res.status(500).json({ msg : "Internal Server Error"})
      })
  }

  static getOne(req, res){
    User.
      findOne({ where : { id : req.params.id } })
      .then(result=>{
        if(result) {
          res.json(result)
        } else {
          res.status(500).json({ msg : "Internal server error, data not found" })
        }
      })
      .catch(err=>{
        res.status(500).json({ msg : "Internal Server Error"})
      })
  }

  static signIn(req,res){
    User.findOne( { where : { username : req.body.username }})
    .then(result=>{
      if(result) {
        if( bcrypt.compareSync(req.body.password, result.password) ) {
          let data = {
            userid : result.id,
            username : result.username
          }
          let token = jwt.sign(data, "rahasia")
          res.json( { token })
        } else {
          res.status(400).json({ msg : "username / password invalid"})
        }    
      } else {
        res.status(400).json({ msg : "username / password invalid"})
      }
    })
    .catch(err=>{
      res.status(500).json({ msg : "Internal Server Error"})
    })
  }

  static newUser(req,res){
    let obj = {
      username : req.body.username,
      password : req.body.password
    }
    User
      .findOrCreate({
        where : obj,
        defaults : obj
      })
      .then(result=>{
        res.json(result[0])
      })
      .catch(err=>{
        res.status(500).json({ msg : "Internal Server Error"})
      })
  }

  static updateUser(req,res){
    let obj = {}
    if(req.body.email != "") {
      obj.email = req.body.email
    }
    if(req.body.password != "") {
      obj.password = req.body.password
    }

    User
    .update(obj, { where : { id : req.params.id }})
    .then(updated=>{
      if(updated == 1) {
        res.json({ msg : `successfully delete data with id : ${req.params.id}`})
      } else {
        res.status(500).json({ msg : "Internal server error, data not found" })
      }
    })
    .catch(err=>{
      res.status(500).json({ msg : "Internal Server Error" })
    })
  }

  static deleteUser(req,res){
    User
      .destroy({ where : { id : req.params.id}})
      .then(deleted =>{
        if(deleted == 1) {
          res.json({ msg : `successfully delete data with id : ${req.params.id}`})
        } else {
          res.status(500).json({ msg : "Internal server error, data not found" })
        }
      })
  }
}

module.exports = ControllerUser