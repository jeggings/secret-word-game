const sendReset = async ()=>{
    const res = await fetch('game/reset', {method: "POST"})
    const data = await res.json()
    console.log(data)
}

export const test = async (socket)=>{
    console.log('Its working!')
    socket.emit('test','thing')
}

sendReset()

