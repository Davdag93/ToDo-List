const express = require('express')
const { 
    getTodos,
    createTodo,
    modTodo
} = require('../controllers/controllersTodo')

const router = express.Router()



router.get('/todos/:id_user', getTodos)

router.post('/todo', createTodo)

router.patch('/todo/modifica/:id', modTodo)

router.delete('/todo/delete/:id')



module.exports = router