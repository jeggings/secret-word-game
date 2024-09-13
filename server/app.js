const express = require('express')

const app = express()
const PORT = 3000

app.use(express.static('client'))
app.use(express.json())

const SecretWordGame = require('./Game.js')
app.locals.wordGame = new SecretWordGame()

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.use('/game',require('./routes/GameRoutes.js'))


app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
}) 