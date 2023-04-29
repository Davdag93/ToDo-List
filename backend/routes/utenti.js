const express = require('express')
//Creaiamo un gestore di rotte 
const router = express.Router()



//Impostiamo tutte le rotte con le varie richieste HTTP

// GET prende tutti gli utenti dal DB 
router.get('/', (req, res) => {
    res.json("ciao")
})


// GET:id prende un singolo utente dal DB 
//:id i ":" indicano che è un valore che deve ricevere in un secondo momento
router.get('/:id', (req, res) => {
    
})


// POST 
router.post('/', (req, res) => {

})



// DELETE 
router.delete('/:id', (req, res) => {

})


// PATCH
router.patch('/:id', (req, res) => {

})




module.exports = router