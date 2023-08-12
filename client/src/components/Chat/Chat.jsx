import { useContext, useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import { userContext } from "../../ContextHook/userContext";
import { ChatContext } from "../../ContextHook/chatContext";
import ChatBox from "./ChatBox";
import UserChat from "./UserChat";
import PotentialChats from "./PotentialChats";


const Chat = () => {
    const {user} = useContext(userContext);
    const { userChats,isUserChatsLoading,updateCurrentChat,userChatsError } = useContext(ChatContext);
    const [ showChat,setShowChat] = useState(false);
    const handleChatClick=()=>{
        if(!showChat){
            setShowChat(true)
        }else{
            setShowChat(false)
        }
    }

    return ( 
          <>
             <AnimatePresence > 
                { showChat &&
              <motion.div exit={{y:50,opacity:0,scale:0}} initial={{y:50}} 
              animate={{y:0}} transition={{type:'spring',stiffness:170}} 
              className=" fixed z-10 shadow-2xl bottom-16 rounded-t-2xl overflow-hidden right-6 w-[90%] h-[33rem] bg-white">
                <div className="flex gap-2 items-center justify-center bg-primary text-white py-2">
                    <motion.div className="overflow-hidden" initial={{scale:0.9}} animate={{scale:1}} transition={{type:'spring',stiffness:130}}><img className="rounded-full bg-white p-1" src="/images/agentIcon.png" alt="agentIcon" width={35} height={35} /></motion.div>
                    <span className="text-lg font-bold">AirBnb Chat</span>
                </div>
                    <div className="flex pt-4 gap-4 ">
                        <div>
                            <PotentialChats/>
                            {userChats.length < 1 ? null : (
                                <div className="flex flex-col">
                                    {isUserChatsLoading && <p>Loading Chats...</p>}
                                    {userChats?.map((chat,index)=>{
                                        return(
                                            <div key={index} onClick={()=> updateCurrentChat(chat)}>
                                                    <UserChat chat={chat} user={user}/>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                        <div className="grow pr-4">
                            <ChatBox/>
                            
                        </div>
                    </div>
                   
                 
             </motion.div>
             }</AnimatePresence>
            <img onClick={handleChatClick} className="rounded-2xl fixed z-10 shadow-2xl bottom-3 right-6 cursor-pointer transition-all hover:scale-90" src="/images/chatIcon.jpg" alt="chatIcon" width={70} height={70} />
          </>
     );
}
 
export default Chat;