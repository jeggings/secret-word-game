const sendReset = async ()=>{
    const res = await fetch('game/reset', {method: "POST"})
    const data = await res.json()
    console.log(data)
}

sendReset()
