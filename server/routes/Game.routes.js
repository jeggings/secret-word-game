const express = require('express')
const router = express.Router()

router.get('/current', function(req, res){
    console.log(req.app.locals.wordGame.currentWord)
    res.send(req.app.locals.wordGame.currentWord);
});

router.post('/guess', function(req, res){
    console.log(req.body)
    res.send({data:'Test!'});
}); 

router.post('/reset', function(req, res){
    const game = req.app.locals.wordGame
    game.currentWord = game.getRandomWordExclude(game.currentWord)
    res.send({data:game.currentWord})
}); 

router.get('/random', function(req, res){
    const game = req.app.locals.wordGame
    res.send({data:game.getRandomWord()});
}); 

module.exports = router