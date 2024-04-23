import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000")
socket.connect();

export const SendMessage = () => {
    const [message,setMessage] = useState('');
    const [receivedMessage,setReceivedMessage] = useState('');

    const sendMessage = ()=>{
socket.emit('send_message',{message})
setMessage('')

    }
    useEffect(()=>{

socket.on('receive_message',(data)=>{
    setReceivedMessage(data.message)
})

    },[])

  return (
   
    <>
     <div className="flex justify-center mt-10 gap-2">
      <input
      value={message}
      onChange={(e)=>{
        setMessage(e.target.value)
      }}
        type="text"
        placeholder="Type Your Message here"
        className="input input-bordered w-full max-w-xs"
      />
      <button className="btn" onClick={sendMessage}>Send Message</button>

    </div>
    
    <div className="text-center text-2xl mt-10 text-green-400">{receivedMessage?receivedMessage:null}</div>
    </>
  );
};
