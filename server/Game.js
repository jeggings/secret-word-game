const fs = require('node:fs')

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
const shuffle = (array) =>{
    let currentIndex = array.length;
  
    while (currentIndex != 0) {
  
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }
  

const getRandomLetter=()=>{
    return String.fromCharCode(97 + Math.floor(Math.random()*26))
}

const getRandomLetters=(numLetters=1, excludeList=[])=>{
    const returnLetters = []
    const letterList = []
    for (let i = 0; i < 26; i++){
        const char = String.fromCharCode(97 + i)
        if (!excludeList.find(x=>x==char))
            letterList.push(char)
    }
    
    // TODO : Make sure numLetters doesn't exceed available letters

    for(let i = 0; i < numLetters; i++){
        const randomIndex = Math.floor(Math.random() * letterList.length);
        returnLetters.push(letterList[randomIndex])
        letterList.splice(randomIndex,1)
    }
    
    return returnLetters
}

module.exports = class SecretWordGame {
    constructor(){
        this.words = []
        this.guessLetters = []

        const data = fs.readFileSync(`${__dirname}/data/wordlist.txt`, 'utf8')
        this.words = data.replace(/(\r\n|\n|\r)/gm, "").trim().split(',').filter(x=>x!='')

        this.currentWord = this.getRandomWord()
        for (let i in this.currentWord){
            this.guessLetters[i] = []
            for (let j = 0; j < 3; j++){
                this.guessLetters[i] = getRandomLetters(5,[this.currentWord[i]])
            }
            this.guessLetters[i].push(this.currentWord[i])
            shuffle(this.guessLetters[i])
        }

        // console.log(this.guessLetters)
        
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

    guess(guessWord){
        return guessWord == this.currentWord
    }

}

