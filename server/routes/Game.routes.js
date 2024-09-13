const express = require('express')
const router = express.Router()

router.get('/current', function(req, res){
    console.log(req.app.locals.wordGame.currentWord)
    res.send(req.app.locals.wordGame.currentWord);
});

router.get('/guessletters', function(req, res){
    res.send(req.app.locals.wordGame.guessLetters);
});

router.post('/removeFromAll', function(req, res){
    req.app.locals.wordGame.removeFromAll()
    res.send(req.app.locals.wordGame.guessLetters);
}); 

router.post('/removeFromOne', function(req, res){
    console.log(req.body)
    req.app.locals.wordGame.removeFromOne(req.body.index)
    res.send(req.app.locals.wordGame.guessLetters);
}); 

router.post('/guess', function(req, res){
    console.log(req.body)
    res.send(req.app.locals.wordGame.guess(req.body.guess));
}); 

router.post('/reset', function(req, res){
    const game = req.app.locals.wordGame
    game.init()
    res.send({data:game.currentWord})
}); 

router.get('/random', function(req, res){
    const game = req.app.locals.wordGame
    res.send({data:game.getRandomWord()});
}); 

module.exports = router