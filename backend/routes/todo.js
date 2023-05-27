const express = require('express')
const { 
    getTodos,
    createTodo
} = require('../controllers/controllersTodo')

const router = express.Router()



router.get('/todos/:id_user', getTodos)

router.post('/todo', createTodo)

router.patch('/todo/modifica/:id')

router.delete('/todo/delete/:id')



module.exports = router