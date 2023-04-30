const User = require('../models/modelUser')
const mongoose = require('mongoose')


// GET tutti gli users
const getUsers = async (req, res) => {
    //User.find() è un metodo per trovare tutti gli utenti all'interno del DB 
    //con le graffe interne vuote "User.find({})" troviamo tutti gli utenti, se scrivessimo "User.find({firstName: Davide})"", troveremmo tutte le persone con il nome Davide
    //con .sort() ordiniamo tutti gli utenti e con {createdAt: -1} indichiamo che vogliamo impostare l'elenco in ordine descrescente, in modo che l'ultimo creato sarà il primo 
    const users = await User.find({}).sort({createdAt: -1})

    res.status(200).json(users)
}


// GET un user specifico 
const getUser = async (req, res) => {
    const {id} = req.params 

    //verifichiamo che l'id passato corrisponda all'id che abbiamo nel DB 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Utente non trovato'})
    } 

    const user = await User.find(id)

    if (!user) {
        return res.status(404).json({error: 'Utente non trovato'})
    }
    res.status(200).json(user)
}

// POST carico di un nuovo user
const createUser = async (req, res) => {
        // con req.body prendiamo tutti i dati dal corpo della richiesta
        const {
            email,
            password,
            firstName,
            lastName,
            confirmPassword,
            acceptTerms,
            role
        } = req.body
    
            // Verifica che la password e la conferma password siano uguali
            if (password !== confirmPassword) {
                return res.status(400).json({ error: "Password e Conferma password non corrispondono" })
            }
    
        // aggiunge il documento al DB 
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
} 


// DELETE di un user
const deleteUser = async (req, res) => {
    const {id} = req.params 

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Utente non trovato'})
    } 

    const user = await User.findOneAndDelete({_id: id})

    if (!user) {
        return res.status(400).json({error: 'Utente non trovato'})
    }

    res.status(200).json(user)
}


// PATCH modifica di un user 
const updateUser = async (req, res) => {
    const {id} = req.params 

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Utente non trovato'})
    } 

    const user = await User.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!user) {
        return res.status(400).json({error: 'Utente non trovato'})
    }

    res.status(200).json(user)
}


module.exports = {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser
}