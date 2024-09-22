const fs = require('node:fs')

const NUM_HERRINGS = 4

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

const getRandomArrayElement = (arr)=>{
    return arr[Math.floor((Math.random()*arr.length))]
}

module.exports = class SecretWordGame {
    constructor(){
        this.words = []
        this.guessLetters = []
        this.removedLetters = []
        this.sockets = []

        const data = fs.readFileSync(`${__dirname}/data/wordlist.txt`, 'utf8')
        this.words = data.replace(/(\r\n|\n|\r)/gm, "").trim().split(',').filter(x=>x!='')

        this.init()

        // Print Game state
        // console.log(this.currentWord)
        // console.log(this.guessLetters)
    }

    init(){
        this.currentWord = this.getRandomWordExclude(this.currentWord)
        console.log(`Current Word : ${this.currentWord}`)
        for (let i in this.currentWord){
            this.guessLetters[i] = []
            for (let j = 0; j < 3; j++){
                this.guessLetters[i] = getRandomLetters(NUM_HERRINGS,[this.currentWord[i]])
            }
            this.guessLetters[i].push(this.currentWord[i])
            shuffle(this.guessLetters[i])
            this.removedLetters[i]=[]
        }
        
    }

    removeFromOne(index){
        this.removeRandomWrong(index)
    }

    removeFromAll(){
        for (let i in this.currentWord){
            this.removeRandomWrong(i)
        }
    }

    removeRandomWrong(charIndex){
        const wrongLetters = this.guessLetters[charIndex].filter((potentialLetter)=>{
            return (
                potentialLetter !== this.currentWord[charIndex] && 
                    !this.removedLetters[charIndex].find(x=>x==potentialLetter))
        })

        if(wrongLetters.length > 0){
            this.removedLetters[charIndex].push(getRandomArrayElement(wrongLetters))
        }

    }

    getRandomWord(){
        return getRandomArrayElement(this.words)
    }

    getRandomWordExclude (excludeWord){
        return getRandomArrayElement(this.words.filter(x=>x!=excludeWord))
    }

    getGameState(){
        return {
            'letters':this.guessLetters,
            'removed':this.removedLetters,
            'winState':this.winState
        }
    }

    guess(guessWord){
        this.winState = guessWord.toUpperCase() == this.currentWord.toUpperCase()
        this.broadCastGameState()
        return this.winState
    }

    addSocket(socket){
        this.sockets.push(socket)
    }

    removeSocket(socket){
        const socketIndex = this.sockets.findIndex((x=>x==socket))
        if (socketIndex >= 0)
            this.sockets.splice(socketIndex,1)
    }

    sendGameState(socket){
        socket?.emit('GameState',this.getGameState())
    }

    broadCastGameState(){
        this.sockets.forEach((socket)=>{this.sendGameState(socket)})
    }
}

