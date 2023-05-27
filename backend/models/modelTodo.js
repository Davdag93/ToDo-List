  const mongoose = require('mongoose')
  const Schema = mongoose.Schema



  const modelTodo = new Schema({
    id_user: String,
    txt: {
        type: String,
        require: true
    },
    completed: String,
    data: String
  }, { timestamps: true })


  module.exports = mongoose.model('Todo', modelTodo)