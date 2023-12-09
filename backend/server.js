// QUESTO è IL CUORE DEL NOSTRO SERVER EXPRESS 

require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const usersRoutes = require('./routes/utenti')
const todoRoutes = require('./routes/todo')
const app = express()
const cors = require('cors');

//middleware
// Per renderlo accessibile a tutte le richieste va inserito prima nel codice 
//QUESTO MIDDLEWARE ci rende accessibile tutto quello che passa come richiesta ad esempio per poter usare "req.body" in una richiesta POST 
app.use(express.json())


app.use(cors());
  


// QUESTO E' UN middleware globale (di prova) CHE SI ATTIVERA' PER OGNI RICHIESTA CHE ARRIVA DAL URL (stampando in console la path successiva al numero di porta ed il metodo usato {GET/POST/ecc})
app.use('/',(req, res, next) => {
    console.log(req.path, req.method)
    res.json({mssg: "Benevenuto, queste sono l'API dell'app To Do List di Davide D'Agostino"})
    next()
})


// Questo è un test veloce per testare che il server funzioni
// QUI INDICHIAMO IL PERCORSO URL SU CUI ESSERE ATTIVO CON LA SOTTOSTANTE RICHIESTA GET
/*app.get('/', (req, res) => {
    res.json({mssg: 'Welcome'})
}) */



// Qui inseriamo il collegamento alle rotte presenti nella cartella routes
//routes 
//il percorso(path) /api/users sarà frapposto tra "http://localhost:4000" e la path che inseriremo nelle richieste get/post ecc in routes. esempio: http://localhost:4000/api/users/_id
app.use('/api', usersRoutes, todoRoutes)


// Connessione al DB 
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // INDICHIAMO AD EXPRESS SU CHE PORTA DEVE COLLEGARSI SOLO DOPO CHE SI E' COLLEGATO AL DB
        app.listen(process.env.PORT || 3000, () => {
            console.log('connesso al DB & server attivo sulla porta', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })




// INDICHIAMO AD EXPRESS SU CHE PORTA DEVE COLLEGARSI
/*
app.listen(process.env.PORT || 3000, () => {
    console.log('server attivo sulla porta', process.env.PORT)
}) 
*/





// POSSIAMO USARE L'APP DESKTOP Postman PER TESTARE TUTTE LE RICHIESTE HTTP PRIMA DI COLLEGARE BACKEND E FRONTEND

/*  API Endpoints

    GET     /users          -> Prende tutti gli utenti presenti nel DB 
    GET     /users/:id      -> Prende un singolo utente presente nel DB 
    POST    /users/:id      -> Crea ed inserisce un nuovo utente nel DB 
    DELETE  /users/:id      -> Elimina un singolo utente dal DB 
    PATCH   /users/:id      -> Aggiorna uno o più dati di un singolo utente presente nel DB 
    PUT     /users/:id      -> Sostituisce per interno con nuovi dati un singolo utente presente nel DB 

*/
