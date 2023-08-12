import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/services";

export const ChatContext = createContext();


export const ChatContextProvider=({children,user})=>{
    const [ userChats,setUserChats ] = useState(null);
    const [ isUserChatsLoading,setIsUserChatsLoading ] = useState(false);
    const [ userChatsError, setUserChatsError] = useState(null);
    const [ currentChat,setCurrentChat ] = useState(null);
    const [ messages,setMessages ] = useState(null);
    const [ isMessagesLoading,setIsMessagesLoading] = useState(false);
    const [ messagesError,setMessagesError] = useState(null);

    console.log("Message:",messages);

    useEffect(()=>{
        const getUserChats = async()=>{
            if(user?._id){
                setIsUserChatsLoading(true)
                setUserChatsError(null)
                const response = await getRequest(`${baseUrl}/chats/${user?._id}`)
                setIsUserChatsLoading(false)
                if(response.error){
                    return setUserChatsError(response)
                }
                setUserChats(response)
            }
        }

        getUserChats()
    },[user])

    useEffect(()=>{
        const getMessages = async()=>{
                setIsMessagesLoading(true)
                setMessagesError(null)
                const response = await getRequest(`${baseUrl}/messages/${currentChat?._id}`);
                console.log("ChatMessage:", response)
                setIsMessagesLoading(false)
                if(response.error){
                    return setMessagesError(response)
                }
                setMessages(response)
        }

        getMessages()
    },[currentChat])

    const updateCurrentChat = useCallback((chat)=>{
         setCurrentChat(chat)
    },[])

    return(
          <ChatContext.Provider value={{ userChats,isUserChatsLoading,userChatsError,updateCurrentChat,currentChat,messages,isMessagesLoading,messagesError}}>
            {children}
          </ChatContext.Provider>
    )

}