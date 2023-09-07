import { useContext, useState } from "react";
import { MdNotifications } from "react-icons/md";
import { userContext } from "../../ContextHook/userContext";
import { ChatContext } from "../../ContextHook/chatContext";
import { unreadNotificationsFunc } from "../../utils/unreadNotifications";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";

const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(userContext);
  const {
    notifications,
    userChats,
    allUsers,
    markAllNotification,
    markNotificationAsRead,
  } = useContext(ChatContext);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const unreadNotifications = unreadNotificationsFunc(notifications);
  const modifiedNotifications = notifications.map((n) => {
    const sender = allUsers.find((user) => user._id === n.senderId);

    return { ...n, senderName: sender?.name };
  });

  return (
    <>
      <div className="relative ">
        <div className="relative cursor-pointer" onClick={handleClick}>
          <MdNotifications size={30} />
          {unreadNotifications.length === 0 ? null : (
            <span className=" absolute -top-1 right-0 flex items-center justify-center text-white bg-green-800 h-[18px] w-[18px] text-xs font-semibold rounded-full">
              <span>{unreadNotifications.length}</span>
            </span>
          )}
        </div>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 120,
              delay: 0.2,
              duration: 0.1,
            }}
            className="absolute max-h-[50vh] w-[250px] top-12 right-0 shadow-lg border-t border-primary p-1 bg-white z-10 text-black"
          >
            <div className="p-2 pb-0 flex items-center justify-between">
              <h3 className="font-semibold text-md">Notifications</h3>
              <div
                onClick={() => markAllNotification(notifications)}
                className="cursor-pointer font-semibold opacity-80"
              >
                Mark All as Read
              </div>
            </div>
            {modifiedNotifications?.length === 0 ? (
              <span className="text-sm text-center my-4 p-1 pb-1 border-b border-gray-200 flex flex-col cursor-pointer">
                No notification Yet..
              </span>
            ) : null}
            {modifiedNotifications &&
              modifiedNotifications.map((n, index) => {
                return (
                  <div
                    onClick={() => {
                      markNotificationAsRead(n, userChats, user, notifications);
                      setIsOpen(false);
                    }}
                    key={index}
                    className={
                      n.isRead
                        ? `text-sm my-4 p-1 pb-1 border-b border-gray-200 flex flex-col cursor-pointer`
                        : `my-4 p-2 text-sm pb-1 text-white border-b border-gray-200 flex flex-col cursor-pointer bg-primary`
                    }
                  >
                    <span>{`${n.senderName} sent you a new message`}</span>
                    <span className="mt-1 text-xs text-gray-200">
                      {formatDistanceToNow(new Date(n.date), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                );
              })}
          </motion.div>
        )}
      </div>
    </>
  );
};

export default Notifications;
