const express = require('express')
const {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser
} = require('../controllers/controllersUser')

//Creaiamo un gestore di rotte 
const router = express.Router()



//Impostiamo tutte le rotte con le varie richieste HTTP

// GET prende tutti gli utenti dal DB 
router.get('/', getUsers)


// GET:id prende un singolo utente dal DB 
//:id indica che è un valore che deve ricevere in un secondo momento
router.get('/:id', getUser)


// POST 
router.post('/', createUser)


// DELETE 
router.delete('/:id', deleteUser)


// PATCH
router.patch('/:id', updateUser)



module.exports = router