import React, { useContext } from 'react'
import { useFetchRecipient } from '../../hooks/useFetchRecipient';
import { ChatContext } from '../../ContextHook/chatContext';

const UserChat = ({chat,user}) => {
    const { recipientUser } = useFetchRecipient(chat,user);
    const { onlineUsers } = useContext(ChatContext);
    const isOnline = onlineUsers?.some((user)=> user?.userId === recipientUser?._id)

  return (
        <>
      <div className='flex items-center justify-between m-2 p-2 cursor-pointer relative w-[300px] border-b border-gray-300'>
        <div className='flex gap-2'>
                 <div >
             <img src="/images/airbnb.png" alt="" height={20} width={20} />
                </div>
            <div className="text-content">
                <div className="name font-medium">{recipientUser?.name}</div>
                <div className="text text-sm text-gray-600">Text Message</div>
            </div>
        </div>

        <div className='flex flex-col items-end'>
        <div className="date text-sm text-gray-600">
                        12/2/2022
        </div>
        <div className="this-user-notifications flex bg-primary h-[20px] w-[20px] text-xs text-white font-medium rounded-full items-center justify-center">7</div>
         <span className={ isOnline ? "inline-block h-[9px] w-[9px] rounded-full bg-green-400 absolute -top-[3px] -right-[3px] z-2" : ""}></span>
        </div>
      </div>
        </>
  )
}

export default UserChat
