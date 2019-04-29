let router = require('express').Router()
let todos = require('../controllers/todo-controller')
let authenticate = require('../middlewares/authenticate')
let authorize = require('../middlewares/authorization')

//todos
router.use(authenticate) // untuk ngecek apakah udah login atau belum

router.get("/", todos.getAll) 
router.post("/", todos.newTodo)

router.get("/:id", todos.getOne)
router.delete("/:id", authorize, todos.delTodo)
router.put("/:id", authorize, todos.updTodo)
router.patch("/:id", authorize, todos.updTodo)

module.exports = router