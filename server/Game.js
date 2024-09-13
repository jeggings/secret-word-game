const fs = require('node:fs')

module.exports = class SecretWordGame {
    constructor(){
        console.log('hello')
        this.words = []
        const data = fs.readFileSync(`${__dirname}/data/wordlist.txt`, 'utf8')
        this.words = data.replace(/(\r\n|\n|\r)/gm, "").trim().split(',').filter(x=>x!='')

        this.currentWord = this.getRandomWord()
    }

    getRandomWord(){
        const randomIndex = Math.floor((Math.random()*this.words.length))
        return this.words[randomIndex]
    }

    getRandomWordExclude (excludeWord){
        let wordCount = this.words.length
        if (this.words.find(x=>x==excludeWord)){
            wordCount--
        }
        const randomIndex = Math.floor((Math.random()*wordCount))
        return this.words.filter(x=>x!=excludeWord)[randomIndex]
    }

}

