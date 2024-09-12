const sendReset = async ()=>{
    const res = await fetch('reset', {method: "POST"})
    const data = await res.json()
    console.log(data)
}

sendReset()
