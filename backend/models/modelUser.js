// QUI IMPOSTIAMO UN MODELLO DA SEGUIRE PER AUMENTARE LA SICUREZZA LATO BACKEND USANDO MONGOOSE(un framework di MongoDB)

const mongoose = require('mongoose')
const Schema = mongoose.Schema


const modelUser = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true,
        validate: {
          validator: function (email) {
            // regex per validare l'email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
          },
          message: "L'email non è valida"
        }
      },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                // regex per validare la password
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(v);
            },
            message: props => `${props.value} is not a valid password! Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, and one number.`
        }
    },
    firstName: {
        type: String,
        required: true,
        //regex con cui deve matchare il nome
        match: /^[a-zA-Z\s]+$/
      },
      lastName: {
        type: String,
        required: true,
        //regex con cui deve matchare il cognome
        match: /^[a-zA-Z\s]+$/
      },
    acceptTerms: {
        type: Boolean,
        required: true,
        validate: {
          validator: function (value) {
            return value === true;
          },
          message: 'Devi accettare i termini e le condizioni.'
        }
      },
    role: {
        type: String,
        enum: ['admin', 'user', 'guest']
    }
}, { timestamps: true })


//creazione ed esportazione del model che sfrutterà lo Schema 
module.exports = mongoose.model('User', modelUser)