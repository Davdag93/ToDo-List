const express = require('express')
const User = require('../models/modelUser')
//Creaiamo un gestore di rotte 
const router = express.Router()



//Impostiamo tutte le rotte con le varie richieste HTTP

// GET prende tutti gli utenti dal DB 
router.get('/', (req, res) => {
    res.json("visione elenco completo utenti")
})


// GET:id prende un singolo utente dal DB 
//:id i ":" indicano che è un valore che deve ricevere in un secondo momento
router.get('/:id', (req, res) => {
    res.json("visione utente specifico")
})


// POST 
router.post('/', async (req, res) => {

    // con req.body prendiamo tutti i dati dai campi 
    const {
        email,
        password,
        firstName,
        lastName,
        confirmPassword,
        acceptTerms,
        role
    } = req.body

    try {
        const user = await User.create({
            email,
            password,
            firstName,
            lastName,
            confirmPassword,
            acceptTerms,
            role
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})



// DELETE 
router.delete('/:id', (req, res) => {
    res.json({mssg: "eliminazione utente"})
})


// PATCH
router.patch('/:id', (req, res) => {
    res.json({mssg: "aggiornamento utente"})
})




module.exports = router