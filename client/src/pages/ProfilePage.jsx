import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { userContext } from "../ContextHook/userContext";
import { AnimatePresence, motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const ProfilePage = ({ user, setUser, setRedirected }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [fetchOrders, setFetchedOrders] = useState(null);
  const [points, setPoints] = useState("");
  const [badgeName, setBadgeName] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [badgeUrl, setBadgeUrl] = useState("");
  const date = new Date();
  const day = date.getDay();
  const dayList = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const id = user._id;

  useEffect(() => {
    axios
      .get(`/getUserOrder/${id}`)
      .then(({ data }) => {
        console.log(data);
        setFetchedOrders(data);
      })
      .catch((err) => {
        console.log(err.message);
      });

    if (user.rewardPoint <= 499) {
      setBadgeName("Bronze");
      setBadgeUrl("/images/bronze-badge.png");
      setMaxValue(500);
    } else if (user.rewardPoint >= 499 && user.rewardPoint <= 999) {
      setBadgeName("Silver");
      setBadgeUrl("/images/silver-badge.png");
      setMaxValue(1000);
    } else if (user.rewardPoint >= 1000 && user.rewardPoint <= 1499) {
      setBadgeName("Gold");
      setBadgeUrl("/images/gold-badge.png");
      setMaxValue(1500);
    } else if (user.rewardPoint >= 1500 && user.rewardPoint <= 2000) {
      setBadgeName("Platinum");
      setBadgeUrl("/images/platinum-badge.png");
      setMaxValue(2000);
    }
    setIsLoading(false);
  }, []);

  const logout = async () => {
    setIsLoading(true);
    try {
      await axios.post("/logout");
    } catch (err) {
      console.log(err);
    }
    setUser(null);
    setRedirected(true);
    setIsLoading(false);
  };

  return (
    <>
      {user && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full sm:w-[80%] p-4 shadow-2xl rounded-lg mx-auto"
        >
          <div className="flex profilepage gap-10 p-4 border border-dashed border-primary rounded-xl">
            <div className=" basicInfo  border-primary ">
              <div className="flex justify-center p-4">
                <img
                  src={
                    user && user.photo ? user.photo : "images/svgexport-7.svg"
                  }
                  alt="userIcon"
                  height={150}
                  width={150}
                  style={{ borderRadius: "50%" }}
                />
              </div>
              {user && (
                <div className="text-left p-4 leading-8 bg-white rounded-t-3xl font-semibold">
                  <h2>Basic Information:</h2>
                  {user.admin && (
                    <div className="bg-primary rounded-lg text-white text-sm py-1 max-w-[5rem] select-none px-4">
                      Admin
                    </div>
                  )}
                  <div>
                    <span>Name: </span>
                    {user?.name}
                  </div>
                  <div>
                    <span>Email: </span>
                    {user?.email}
                  </div>
                  <div className="flex items-center gap-2 status">
                    <span>Status : Active</span>
                    <div className="activeIcon"></div>
                  </div>
                  <button
                    onClick={logout}
                    className="primary flex items-center gap-1 justify-center max-w-sm mt-2"
                  >
                    {isLoading ? (
                      <div className="newtons-cradle">
                        <div className="newtons-cradle__dot"></div>
                        <div className="newtons-cradle__dot"></div>
                        <div className="newtons-cradle__dot"></div>
                        <div className="newtons-cradle__dot"></div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <span>Logout</span>
                        <span>
                          <svg
                            width="20"
                            height="20"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.5"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                            ></path>
                          </svg>
                        </span>
                      </div>
                    )}
                  </button>
                </div>
              )}
            </div>
            <div className="border-primary  displayInfo grow sm:pl-4">
              <h1 className="text-xl sm:text-2xl font-bold">
                Welcome back,
                <span className="text-primary">
                  <TypeAnimation
                    sequence={[`${user.name}`, 1000]}
                    wrapper="span"
                    speed={50}
                    cursor={false}
                  />
                  !
                </span>
              </h1>
              <div className="flex mt-4 items-center justify-between">
                <div className="flex flex-col gap-6">
                  <div>
                    <h1 className="flex gap-1 items-center font-medium text-lg">
                      Badge<span className="text-gray-500">({badgeName}):</span>{" "}
                      <Link to={"/airbnbPolicies"} className="rounded-full hover:bg-gray-300 p-2  transition-all duration-300">
                        <img
                          src="/images/information-button.png"
                          alt="infoButton"
                          height={12}
                          width={12}
                        />
                      </Link>{" "}
                    </h1>
                    <img
                      src={badgeUrl}
                      alt="badgeIcon"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div>
                    <h1 className="flex items-center gap-1 text-lg font-medium">
                      My Points:
                      <Link to={"/airbnbPolicies"} className="rounded-full hover:bg-gray-300 p-2 transition-all duration-300">
                        <img
                          src="/images/information-button.png"
                          alt="infoButton"
                          height={12}
                          width={12}
                        />
                      </Link>
                    </h1>
                    <span>
                      {user.rewardPoint}/{maxValue}
                    </span>{" "}
                    <span className="text-gray-700">points</span>
                    <div className="mt-2">
                      <progress
                        className="custom-progress"
                        value={user.rewardPoint}
                        max={maxValue}
                      ></progress>
                    </div>
                  </div>
                </div>
                <div className="bg-primary font-medium self-start text-white py-1 px-4 rounded-md">
                  {dayList[day]}
                </div>
              </div>
              <div className="mt-2 grow">
                <h1 className="bg-gray-100 max-w-xs my-2 text-center py-1 px-2 text-primary rounded-md border">
                  Recent Reservations:
                </h1>
                <div className="h-[110px] overflow-auto">
                  {isLoading && (
                    <AnimatePresence>
                      <motion.div
                        exit={{ opacity: 0 }}
                        transition={{ duration: 3 }}
                        className="flex justify-start text-start"
                      >
                        <div className="newtons-cradle small">
                          <div className="newtons-cradle__dot"></div>
                          <div className="newtons-cradle__dot"></div>
                          <div className="newtons-cradle__dot"></div>
                          <div className="newtons-cradle__dot"></div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  )}
                  {!isLoading &&
                    fetchOrders &&
                    fetchOrders.length > 0 &&
                    fetchOrders
                      .sort(
                        (a, b) =>
                          new Date(b.createdAt).getTime() -
                          new Date(a.createdAt).getTime()
                      )
                      .map((order, idx) => (
                        <div
                          key={idx}
                          className="flex my-2 fetchedorders gap-2 p-2 border border-primary rounded-lg"
                        >
                          <div className="flex ">
                            <img
                              className="object-cover"
                              src={order.orderPhoto}
                              alt="orderImage"
                              width={70}
                              height={30}
                            />
                          </div>
                          <div className="grow">
                            <p className="w-[200px] truncate">
                              {order.bookingPlace}
                            </p>
                            <div className="flex justify-between">
                              <span>
                                Status:{" "}
                                <span className="bg-green-800 px-2 sm:px-4 text-xs sm:text-sm text-white rounded-md">
                                  {order.payment_status}
                                </span>
                              </span>
                              <span>
                                Date:{" "}
                                {format(
                                  new Date(order.paymentTime * 1000),
                                  "dd MMM. ''yy"
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                  {!isLoading && fetchOrders && fetchOrders.length < 1 && (
                    <div className="pt-4 text-primary font-bold w-[80%] mx-auto">
                      No reservations have been made yet!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default ProfilePage;
