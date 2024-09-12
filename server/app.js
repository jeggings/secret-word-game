const express = require('express')
const fs = require('node:fs')

const app = express()
const PORT = 3000

app.use(express.static('client'))
app.use(express.json())



// TODO: Move To Game Object
let words = []
let currentWord = ''

const data = fs.readFileSync(`${__dirname}/data/wordlist.txt`, 'utf8')

words = data.replace(/(\r\n|\n|\r)/gm, "").trim().split(',').filter(x=>x!='')

const getRandomWord = ()=>{
    const randomIndex = Math.floor((Math.random()*words.length))
    return words[randomIndex]
}

const getRandomWordExclude = (excludeWord)=>{
    let wordCount = words.length
    if (words.find(x=>x==excludeWord)){
        wordCount--
    }
    const randomIndex = Math.floor((Math.random()*wordCount))
    return words.filter(x=>x!=excludeWord)[randomIndex]
}

currentWord = getRandomWord()



// TODO: Move To Routes / Controllers

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
    
app.post('/guess', function(req, res){
    console.log(req.body)
    res.send({data:'Test!'});
}); 

app.post('/reset', function(req, res){
    currentWord = getRandomWordExclude(currentWord)
    res.send({data:currentWord})
}); 

app.get('/random', function(req, res){
    res.send({data:getRandomWord()});
}); 


app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
}) 