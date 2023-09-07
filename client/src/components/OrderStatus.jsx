import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";

const OrderStatus = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/getOrder/${id}`)
      .then((response) => {
        console.log(response.data);
        setOrder(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    setIsLoading(false);
  }, [id, order]);

  const handlePrint = () => {
    window.print();
    navigate("/account/bookings");
  };
  return (
    <>
      <div className=" orderReceipt w-[80%] relative shadow-2xl mx-auto px-8">
        <div>
          <span className="flex justify-center p-4">
            <svg
              className="w-[80px] h-[80px]"
              fill="none"
              stroke="#FF385C"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </span>
          <h1 className="py-2 border-b-2 text-center text-xl border-primary">
            Reservation Details
          </h1>
        </div>
        <AnimatePresence>
          {isLoading && (
            <motion.div
              exit={{ opacity: 0 }}
              className="h-[10vh] w-full flex flex-col items-center justify-center bg-white"
            >
              <div className="newtons-cradle index">
                <div className="newtons-cradle__dot"></div>
                <div className="newtons-cradle__dot"></div>
                <div className="newtons-cradle__dot"></div>
                <div className="newtons-cradle__dot"></div>
              </div>
              <div className="text-primary font-medium text-xs">
                Kindly refresh page if order info is not retrieved.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {!isLoading && order && (
          <>
            <div className="">
              <img
                className="absolute opacity-10 max-w-[100%] -z-10 top-[42%] left-[35%] sm:top-[37%] sm:left-[37%] h-[130px] w-[130px] sm:h-[300px] sm:w-[300px]"
                src="/images/airbnb.png"
                alt="airbnb-logo"
              />

              <span className="flex my-1 py-1 w-44 mx-auto rounded-xl bg-green-500 text-white font-semibold items-center justify-center">
                Status:<span>{order.status}</span>
              </span>
              <h1 className=" text-center sm:text-start text-xl pb-2 text-gray-900">
                Customer :
              </h1>
              <div className="text-base flex flex-col text-gray-700 border-b-2 pb-2 ">
                <span className="flex flex-col sm:flex-row justify-between ">
                  Full-Name: <span>{order.details[0].fullName}</span>{" "}
                </span>
                <span className="flex flex-col sm:flex-row justify-between">
                  Country: <span>{order.country}</span>
                </span>
                <span className="flex flex-col sm:flex-row justify-between">
                  Phone-Number: <span>{order.details[0].mobile}</span>
                </span>
                <span className="flex flex-col sm:flex-row justify-between">
                  Email: <span>{order.email}</span>
                </span>
              </div>
              <h1 className="text-center sm:text-start text-xl pb-2 pt-2 text-gray-900">
                Payments:
              </h1>
              <div className=" text-base flex flex-col text-gray-700 border-b-2 pb-2 ">
                <span className="flex flex-col sm:flex-row justify-between">
                  Payment-Intent: <span>{order.paymentIntentId}</span>
                </span>
                <span className="flex flex-col sm:flex-row justify-between">
                  Payment-Status: <span>{order.payment_status}</span>
                </span>
                <span className="flex flex-col sm:flex-row justify-between">
                  Amount Paid: <span>${order.details[0].price}</span>
                </span>
                <span className="flex flex-col sm:flex-row justify-between">
                  Payment-Time:{" "}
                  <span>
                    {format(
                      new Date(order.paymentTime * 1000),
                      "dd MMMM, yyyy HH:mm:ss a"
                    )}
                  </span>
                </span>
              </div>
              <h1 className=" text-center sm:text-start text-xl pb-2 pt-2 text-gray-900">
                Bookings:
              </h1>
              <div className=" flex flex-col text-gray-700 ">
                <span className="flex flex-col sm:flex-row justify-between">
                  Booking Number:<span>{order.customerId}</span>
                </span>
                <span className="flex flex-col sm:flex-row justify-between">
                  Booking Location: <span>{order.bookingPlace}</span>{" "}
                </span>
                <span className="flex flex-col sm:flex-row justify-between">
                  Booking Address:<span>{order.bookingAddress}</span>
                </span>
                <span className="flex flex-col sm:flex-row justify-between">
                  Guests: <span>{order.details[0].numOfGuests}</span>
                </span>
                <span className="flex flex-col sm:flex-row justify-between">
                  Check-In Time:{" "}
                  <span>
                    {format(
                      new Date(order.details[0].checkIn),
                      "dd EEEE MMMM, yyyy"
                    )}
                  </span>
                </span>
                <span className="flex flex-col sm:flex-row justify-between">
                  Check-Out Time:{" "}
                  <span>
                    {format(
                      new Date(order.details[0].checkOut),
                      "dd EEEE MMMM, yyyy"
                    )}
                  </span>
                </span>
              </div>

              <div className="flex my-2 justify-center">
                <button
                  onClick={handlePrint}
                  className="bg-primary px-8 py-1 text-white font-medium my-2 rounded-md"
                >
                  Print
                </button>
              </div>
            </div>
          </>
        )}
        <div></div>
      </div>
      {order && (
        <div className="text-sm sm:text-base mx-auto max-w-2xl bg-gray-200 p-8 rounded-lg m-6">
          <h1>
            Hii,
            <span className="text-green-500 font-bold">
              {order.details[0].fullName}
            </span>
            . Here's a confirmation detail of your successful transaction.Kindly
            ensure to keep this information safe as it is very important.
            Details about your host and explicit information about the
            instructions you need to adhere to as regards your reservation would
            be forwarded to you shortly.Enjoy!
          </h1>
        </div>
      )}
    </>
  );
};

export default OrderStatus;
