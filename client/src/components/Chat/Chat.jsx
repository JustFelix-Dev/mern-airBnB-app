import { useContext, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { userContext } from "../../ContextHook/userContext";
import { ChatContext } from "../../ContextHook/chatContext";
import ChatBox from "./ChatBox";
import UserChat from "./UserChat";
import PotentialChats from "./PotentialChats";
import Notifications from "./Notifications";
import { Link, useNavigate } from "react-router-dom";

const Chat = () => {
  const { user } = useContext(userContext);
  const { userChats, isUserChatsLoading, updateCurrentChat, userChatsError } =
    useContext(ChatContext);
  const [showChat, setShowChat] = useState(false);
  const navigate = useNavigate();
  const [showChatUsers, setShowChatUsers] = useState(true);
  const chatRef = useRef();
  const navOpen = useRef();

  const handleChatClick = () => {
    if (!showChat) {
      setShowChat(true);
    } else {
      setShowChat(false);
    }
  };

  const handleShow = () => {
    setShowChat(false);
  };

  const handleRoute = () => {
    navigate("/airbnb-faq");
  };

  const closeChats = () => {
    setShowChatUsers(false);
    navOpen.current.style.display = "block";
  };

  const openChats = () => {
    setShowChatUsers(true);
    navOpen.current.style.display = "none";
  };

  return (
    <>
      <AnimatePresence>
        {showChat && (
            <div className="relative">
          <motion.div
            exit={{ y: 50, opacity: 0, scale: 0 }}
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 170 }}
            className=" fixed z-10 shadow-2xl bottom-16 rounded-t-2xl overflow-hidden right-6 w-[90%] min-h-[35rem] bg-white"
          >
            <div className="flex gap-2 items-center justify-between px-6 bg-primary text-white py-2">
              <div
                className=" text-white cursor-pointer"
                style={{ color: "white" }}
              >
                <img
                  ref={navOpen}
                  onClick={openChats}
                  src="/images/menu-open.png"
                  alt="icon"
                  className="hidden"
                  height={20}
                  width={20}
                />
              </div>
              <div className="flex items-center gap-3">
                <img
                  className="rounded-full bg-white p-1"
                  src="/images/agentIcon.png"
                  alt="agentIcon"
                  width={35}
                  height={35}
                />
                <span className="text-lg font-bold">AirBnb Chat</span>
              </div>
              <div className="">
                <Notifications />
              </div>
            </div>
            <div className="flex pt-4 gap-4 relative ">
              <AnimatePresence>
                {showChatUsers && (
                  <motion.div
                    exit={{ opacity: 0, scale: 0.9 }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative leftChat h-[400px]  overflow-auto"
                  >
                    <div
                      onClick={closeChats}
                      className="absolute closeIcon hidden cursor-pointer -top-2 right-4"
                    >
                      <img
                        src="/images/menu-close.png"
                        alt="icon"
                        height={17}
                        width={17}
                      />
                    </div>
                    <div className="relative">
                    <PotentialChats />
                    </div>
                    {userChats?.length < 1 ? null : (
                      <div className="flex flex-col">
                        {isUserChatsLoading && (
                          <p className="text-center">
                            <div className="newtons-cradle small">
                              <div className="newtons-cradle__dot"></div>
                              <div className="newtons-cradle__dot"></div>
                              <div className="newtons-cradle__dot"></div>
                              <div className="newtons-cradle__dot"></div>
                            </div>
                          </p>
                        )}
                        {userChats?.map((chat, index) => {
                          return (
                            <div
                              key={index}
                              onClick={() => updateCurrentChat(chat)}
                            >
                              <UserChat chat={chat} user={user} />
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="grow pr-4">
                <ChatBox />
              </div>
            </div>
            <div className="text-primary  text-center p-2">
              <Link
                to={"/airbnb-faq"}
                onClick={handleShow}
                className="underline"
              >
                {" "}
                or continue to FAQ
              </Link>
            </div>
          </motion.div>
          </div>
        )}
      </AnimatePresence>
      <img
        onClick={user ? handleChatClick : handleRoute}
        className="rounded-2xl fixed z-10 shadow-2xl bottom-3 right-6 cursor-pointer transition-all hover:scale-90"
        src="/images/chatIcon.jpg"
        alt="chatIcon"
        width={70}
        height={70}
      />
    </>
  );
};

export default Chat;
