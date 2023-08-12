import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, baseUrlIndex, getRequest, postRequest } from "../utils/services";
import { toast } from "react-toastify";

export const ChatContext = createContext();


export const ChatContextProvider=({children,user})=>{
    const [ userChats,setUserChats ] = useState(null);
    const [ isUserChatsLoading,setIsUserChatsLoading ] = useState(false);
    const [ userChatsError, setUserChatsError] = useState(null);
    const [ potentialChats,setPotentialChats] = useState([]);
    const [ currentChat,setCurrentChat ] = useState(null);
    const [ messages,setMessages ] = useState(null);
    const [ isMessagesLoading,setIsMessagesLoading] = useState(false);
    const [ messagesError,setMessagesError] = useState(null);
    const [ sendTextMessageError,setSendTextMessageError] = useState(null);
    const [ newMessage, setNewMessage] = useState(null);

    console.log("Message:",messages);

    useEffect(()=>{
        const getUsers = async()=>{
            const response = await getRequest(`${baseUrlIndex}/users`);
            if(response.error){
                return console.log("Error Fetching users:", response)
            }
            const supportChat = response.filter((support)=>{
                 let isChatCreated = false;
                 if(!support.admin) return false;
                 if(user?._id === support._id) return false;
                 if(userChats){
                   isChatCreated = userChats?.some((chat)=>{
                        return chat.members[0] === support._id || chat.members[1] === support._id
                    })
                 }
                 return !isChatCreated 
            });
            setPotentialChats(supportChat)
        }

        getUsers();
    },[userChats])

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

    const createChat = useCallback(async( firstId,secondId )=>{
          const response = await postRequest(`${baseUrl}/chats`,JSON.stringify({firstId,secondId}))

          if(response.error){
            return console.log("Error creating Chat:", response)
          }
          setUserChats((prev)=>[...prev,response])
    },[])

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

    const sendTextMessage = useCallback(async(textMessage,sender,currentChatId,setTextMessage)=>{
        if(!textMessage) return toast.error('Input is empty!')

        const response = await postRequest(`${baseUrl}/messages`, JSON.stringify({
            chatId: currentChatId,
            senderId: sender._id,
            text: textMessage
        }))

        if(response.error){
           return  setSendTextMessageError(response)
        }
        setNewMessage(response)
        setMessages((prev)=>[...prev,response])
        setTextMessage('')
    },[])

    const updateCurrentChat = useCallback((chat)=>{
         setCurrentChat(chat)
    },[])

    return(
          <ChatContext.Provider value={{ 
            userChats,isUserChatsLoading,
            potentialChats,createChat,
            userChatsError,updateCurrentChat,
            currentChat,messages,sendTextMessage,
           isMessagesLoading,messagesError}}>
            {children}
          </ChatContext.Provider>
    )

}