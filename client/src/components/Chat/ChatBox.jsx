import React, { useContext, useState } from 'react'
import { userContext } from '../../ContextHook/userContext'
import { ChatContext } from '../../ContextHook/chatContext';
import { useFetchRecipient } from '../../hooks/useFetchRecipient';
import { format } from 'date-fns';
import InputEmoji from 'react-input-emoji';
import { BsSend } from 'react-icons/bs';

const ChatBox = () => {
    const { user } = useContext(userContext);
    const {currentChat,messages,isMessagesLoading,sendTextMessage} = useContext(ChatContext);
    const { recipientUser } = useFetchRecipient(currentChat,user);
    const [ textMessage,setTextMessage] = useState("");

    console.log("Text:", textMessage);

    if(!recipientUser) return(
        <p className='flex items-center justify-center pt-[20%]' style={{textAlign:"center",width:"100%"}}>No Conversation Selected Yet...</p>
        )
        
        if(isMessagesLoading) return(
            <p style={{textAlign:"center",width:"100%"}}>Loading Chats...</p>
            )

  return (
        <>
         <div className="h-[400px]  overflow-y-auto rounded-b-md bg-slate-50">
              <div className=" flex items-center justify-center p-0.5 text-white bg-green-500">
                <p className='text-sm'>Chatting With Admin - <strong>{recipientUser?.name.split(' ')[0]}</strong></p> 
                </div>
                <div className=" flex flex-col  p-3 ">
                    {messages && messages.map((message,index)=>(
                        <div key={index} className={`${message?.senderId === user?._id ? " flex flex-col text-white bg-gray-600 p-2 rounded-lg max-w-[50%] mb-1 self-end grow-0" : "flex flex-col bg-primary text-white max-w-[50%] rounded-lg p-2 self-start grow-0"}`}>
                            <span>{message.text}</span>
                          <span className="message-footer text-xs text-gray-300 self-end">{format(new Date(message.createdAt),'dd/MM/yyyy')}</span>
                        </div>
                    ))}
                </div>
         </div>
                <div className=' flex bg-slate-50 w-[100%]' >
                <InputEmoji value={textMessage} onChange={setTextMessage} fontFamily="Mukta" borderColor="#FF5A5F" />
                 <button onClick={()=>sendTextMessage(textMessage,user,currentChat._id,setTextMessage)} className='bg-primary border-0 outline-0 p-4 rounded-full'><BsSend size={20} color='white' /></button>
                </div>
        
        </>
)
}

export default ChatBox