let user = require('./user-route')
let todo = require('./todo-route')
let theUser = require('../controllers/user-controller')

let router = require('express').Router()

router.post("/signup", theUser.newUser) // success
router.post("/signin", theUser.signIn)

router.use("/users", user)
router.use("/todos", todo)

module.exports = router