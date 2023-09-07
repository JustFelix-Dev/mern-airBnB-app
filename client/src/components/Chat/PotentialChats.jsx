import React, { useContext, useState } from "react";
import { ChatContext } from "../../ContextHook/chatContext";
import { userContext } from "../../ContextHook/userContext";
import { AnimatePresence, motion } from "framer-motion";

const PotentialChats = () => {
  const { user } = useContext(userContext);
  const [showPChats, setShowPChats] = useState(true);
  const { potentialChats, createChat, onlineUsers } = useContext(ChatContext);

  const showPotentialChats = () => {
    setShowPChats(!showPChats);
  };
  return (
    <>
      <div
        onClick={showPotentialChats}
        className="cursor-pointer support-services"
      >
        <img
          src="/images/support-services.png"
          alt="icon"
          height={30}
          width={30}
        />
      </div>
      <AnimatePresence>
        {showPChats && (
          <motion.div
            exit={{ opacity: 0, scale: 0.9 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className=" potential-support flex gap-1 mb-2 ml-2"
          >
            {potentialChats.map((support, index) => {
              return (
                <div
                  className=" cursor-pointer bg-primary text-white py-1 px-4 rounded-lg relative"
                  key={index}
                  onClick={() => createChat(user._id, support._id)}
                >
                  {support.name}
                  <span
                    className={
                      onlineUsers?.some((user) => user?.userId === support._id)
                        ? `inline-block h-[8px] w-[8px] rounded-full bg-green-400 absolute -top-[3px] 
                    -right-[3px] z-2`
                        : ""
                    }
                  ></span>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PotentialChats;
