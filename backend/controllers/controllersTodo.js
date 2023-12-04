const Todo = require('../models/modelTodo')

const mongoose = require('mongoose')




// GET tutti gli users
 const getTodos = async (req, res) => { 

    const id_user = req.params.id_user; 
    const todos = await Todo.find({ id_user }).sort({createdAt: -1}); 

    res.status(200).json(todos)
} 


const createTodo = async (req, res) => {
    // con req.body prendiamo tutti i dati dal corpo della richiesta
    const {
        id_user,
        txt,
        completed,
        data
    } = req.body

    // aggiunge il documento al DB 
    try {
        const todo = await Todo.create({
            id_user,
            txt,
            completed,
            data
        })
        console.log('inserito nel DB' + todo)
        res.status(200).json(todo)
    } catch (error) {
        console.log('non si è inserito' +  error.message)
        res.status(400).json({error: error.message})
    }
} 


const modTodo = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    const todo = await Todo.findByIdAndUpdate(id, { completed }, { new: true });
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    console.log('Updated', todo);
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
    getTodos,
    createTodo,
    modTodo
}