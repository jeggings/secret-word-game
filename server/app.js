const express = require('express')

const app = express()
const PORT = 3000

app.use(express.static('client'))
app.use(express.json())

const SecretWordGame = require('./Game.js')
app.locals.wordGame = new SecretWordGame()

const path = require('path');


app.get('/play', function(req, res){
    res.sendFile(path.resolve(__dirname, '../client', 'play.html'));
})

app.use('/game',require('./routes/Game.routes.js'))


app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
}) 