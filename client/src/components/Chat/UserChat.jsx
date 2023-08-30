import React, { useContext } from 'react'
import { useFetchRecipient } from '../../hooks/useFetchRecipient';
import { ChatContext } from '../../ContextHook/chatContext';
import { unreadNotificationsFunc } from '../../utils/unreadNotifications';
import { useFetchLatestMessage } from '../../hooks/useFetchLatestMessage';
import { formatDistanceToNow } from 'date-fns';

const UserChat = ({chat,user}) => {
    const { recipientUser } = useFetchRecipient(chat,user);
    const { onlineUsers,notifications,markThisUserNotification } = useContext(ChatContext);
    const isOnline = onlineUsers?.some((user)=> user?.userId === recipientUser?._id);
    const unreadNotifications = unreadNotificationsFunc(notifications);
    const thisUserNotifications = unreadNotifications?.filter(n => n.senderId == recipientUser?._id );
    const { latestMessage } = useFetchLatestMessage(chat);

  return (
        <>
      <div className='flex items-center justify-between m-2 p-2 cursor-pointer relative w-[300px] border-b border-gray-300' onClick={()=>{ 
        if(thisUserNotifications.length !== 0){
          markThisUserNotification(thisUserNotifications,notifications)
        }}}>
        <div className='flex gap-2'>
                 <div >
             <img 
              src={
                recipientUser && recipientUser?.photo
                    ? recipientUser?.photo
                     : '/images/svgexport-7.svg'
             } 
             alt="" height={20} width={20} style={{borderRadius: "50px"}} />
                </div>
            <div className="text-content">
                <div className="name font-medium">{recipientUser?.name}</div>
                <div className="text text-sm text-gray-600 truncate w-32">
                   { latestMessage?.text && latestMessage?.text}
                </div>
            </div>
        </div>
        <div className='flex flex-col items-end'>
        <div className="date text-sm text-gray-600 truncate">
          { latestMessage && formatDistanceToNow(new Date(latestMessage?.createdAt),{addSuffix:true})}
        </div>
        <div className= { thisUserNotifications?.length > 0 ? `flex bg-primary h-[20px] w-[20px] text-xs text-white font-medium rounded-full items-center justify-center` : ""}>{thisUserNotifications?.length > 0 ? thisUserNotifications.length : ""}</div>
         <span className={ isOnline ? "inline-block h-[9px] w-[9px] rounded-full bg-green-400 absolute -top-[3px] -right-[3px] z-2" : ""}></span>
        </div>
      </div>
        </>
  )
}

export default UserChat;
