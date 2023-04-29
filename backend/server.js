// QUESTO è IL CUORE DEL NOSTRO SERVER EXPRESS 

require('dotenv').config()
const express = require('express')
const usersRoutes = require('./routes/utenti')
const app = express()




// QUESTO E' UN middleware globale (di prova) CHE SI ATTIVERA' PER OGNI RICHIESTA CHE ARRIVA DAL URL (stampando in console la path successiva al numero di porta ed il metodo usato {GET/POST/ecc})
// Per renderlo accessibile a tutte le richieste va inserito prima nel codice 
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})



// Questo è un test veloce per testare che il server funzioni
// QUI INDICHIAMO IL PERCORSO URL SU CUI ESSERE ATTIVO CON LA SOTTOSTANTE RICHIESTA GET
/* app.get('/', (req, res) => {
    res.json({mssg: 'Welcome'})
}) */



// Qui inseriamo il collegamento alle rotte presenti nella cartella routes
//routes 
//il percorso(path) /api/users sarà frapposto tra "http://localhost:4000/" e la path che inseriremo nelle richieste get/post ecc in routes. esempio: http://localhost:4000/api/users/_id
app.use('/api/users', usersRoutes)




// INDICHIAMO AD EXPRESS SU CHE PORTA DEVE COLLEGARSI
app.listen(process.env.PORT, () => {
    console.log('server attivo sulla porta', process.env.PORT)
})






// POSSIAMO USARE L'APP DESKTOP Postman PER TESTARE TUTTE LE RICHIESTE HTTP PRIMA DI COLLEGARE BACKEND E FRONTEND

/*  API Endpoints

    GET     /users          -> Prende tutti gli utenti presenti nel DB 
    GET     /users/:id      -> Prende un singolo utente presente nel DB 
    POST    /users/:id      -> Crea ed inserisce un nuovo utente nel DB 
    DELETE  /users/:id      -> Elimina un singolo utente dal DB 
    PATCH   /users/:id      -> Aggiorna uno o più dati di un singolo utente presente nel DB 
    PUT     /users/:id      -> Sostituisce per interno con nuovi dati un singolo utente presente nel DB 

*/
