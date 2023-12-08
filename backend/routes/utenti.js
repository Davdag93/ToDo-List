const express = require('express')
const {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser,
    loginUser
} = require('../controllers/controllersUser')

//Creaiamo un gestore di rotte 
const router = express.Router()



//Impostiamo tutte le rotte con le varie richieste HTTP

// GET prende tutti gli utenti dal DB 
router.get('/users/', getUsers)

// POST login
router.get('/users/login', loginUser)

// GET:id prende un singolo utente dal DB 
//:id indica che è un valore che deve ricevere in un secondo momento
router.get('/users/:id', getUser)


// POST register
router.post('/users/register', createUser)



// DELETE user
router.delete('/users/delete/:id', deleteUser)


// PATCH modifica user
router.patch('/users/modifica/:id', updateUser)



module.exports = router


// FARE CHIAMATA PER L'AUTENTICAZIONE, RICEVENDO EMAIL E PASSWORD DEL FRONTEND FARE IL MATCH DEI DATI 