// QUI IMPOSTIAMO UN MODELLO DA SEGUIRE PER AUMENTARE LA SICUREZZA LATO BACKEND USANDO MONGOOSE(un framework di MongoDB)

const mongoose = require('mongoose')
const Schema = mongoose.Schema


const modelUser = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String, 
        required: true
    },
    acceptTerms: {
        type: Boolean,
        required: true
    },
    role: {
        type: String
    }
}, { timestamps: true })


module.exports = mongoose.model('Users', modelUser)