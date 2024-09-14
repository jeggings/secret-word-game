const express = require('express')

const app = express()
const PORT = 3000

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static('client'))
app.use(express.json())

const SecretWordGame = require('./Game.js')
app.locals.wordGame = new SecretWordGame()

const path = require('path');


app.get('/play', function(req, res){
    res.sendFile(path.resolve(__dirname, '../client', 'play.html'));
})

app.use('/game',require('./routes/Game.routes.js'))

io.on('connection', (socket) => {
    console.log('a user connected')
    socket.emit('hello', 'world')
    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
  })

server.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
}) 