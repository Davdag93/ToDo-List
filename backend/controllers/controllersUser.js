const User = require('../models/modelUser')
const bcrypt = require('bcrypt');
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
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Utente non trovato' });
    }
  
    try {
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json({ error: 'Utente non trovato' });
      }
  
      res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ error: 'Errore interno del server' });
    }
  };


// POST login 
const loginUser = async (req, res) => {
    console.log("Richiesta post ricevuta:", req.body); 
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email, password });
  
      if (!user) {
        return res.status(401).json({ message: 'Credenziali non valide' });
      }
  
      // Questo serve per controllare se la password (quando crittografata) combacia con quella presente nel DB 
    const match = await bcrypt.compare(password, user.password);
  
      if (!match) {
        return res.status(401).json({ message: 'Credenziali non valide' });
      } 

      // Genera un token JWT valido per l'utente
      const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });

      // Invia il token come parte della risposta
      res.status(200).json({ user, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Errore del server' });
    }
  };

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
    updateUser,
    loginUser
}