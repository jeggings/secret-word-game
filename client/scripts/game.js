
export const getNewWord = async (socket)=>{
    socket.emit('getNewWord')
}

export const removeSingle = async (socket,charIndex)=>{
    socket.emit('removeSingle',{index:charIndex})
}

export const removeFromAll = async (socket,charIndex)=>{
    socket.emit('removeFromAll',{index:charIndex})
}

export const guessWord = async (socket,word)=>{
    socket.emit('guessWord',word)
}
