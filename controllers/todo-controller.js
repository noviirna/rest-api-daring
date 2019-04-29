const Todo  = require('../models').Todo
const jwt = require('jsonwebtoken')

class TodoController {
  
  static getAll(req,res){
    Todo
      .findAll({ where : { UserId : req.headers.decoded.userid}})
      .then(results=>{
        if(results.length > 0) {
          res.status(201).json(results)
        } else {
          res.status(500).json({ msg : "Internal server error, data not found" })
        }
      })
      .catch(err=>{
        res.status(500).json({ msg : "Internal server error", error : err.errors })
      })
  }

  static getOne(req,res){
    Todo
      .findOne( { where : { id : req.params.id}})
      .then(result=>{
        if(result) {
          if(result.UserId == req.headers.decoded.userid) {
            res.status(201).json(result)
          } else {
            res.status(400).json({msg : "you have no rights to view this"})
          }
        } else {
          res.status(500).json({ msg : "Internal server error, data not found" })
        }
      })
      .catch(err=>{
        console.log(err)
        res.status(500).json({ msg : "Internal server error", error : err })
      })
  }

  static newTodo(req,res){
    let obj = {
      title : req.body.title,
      description : req.body.description,
      UserId  : req.headers.decoded.userid
    }
    
    Todo
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

  static delTodo(req,res){
    Todo
    .destroy({ where : { id : req.params.id}})
    .then(deleted =>{
      if(deleted == 1) {
        res.json({ msg : `successfully delete data with id : ${req.params.id}`})
      } else {
        res.status(500).json({ msg : "Internal server error, data not found" })
      }
    })
  }

  static updTodo(req,res){
    let objupd = {}
    if(req.body.title != ""){
      objupd.title = req.body.title
    }
    if(req.body.description != ""){
      objupd.description = req.body.description
    }
    Todo
      .update(objupd, { where : { id : req.params.id }})
      .then(updated=>{
        if(updated == 1) {
          res.json({ msg : `successfully update data with id : ${req.params.id}`})
        } else {
          res.status(500).json({ msg : "Internal server error, data not found" })
        }
      })
      .catch(err=>{
        res.status(500).json({ msg : "Internal server error, failed to update" })
      })
  }

}

module.exports = TodoController