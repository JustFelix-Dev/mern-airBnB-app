import axios from "axios";
import React, { useEffect, useState } from "react";
import PlacesImage from "./PlacesImage";
import { Link } from "react-router-dom";
import BookingDate from "./BookingDate";
import { AnimatePresence, motion } from "framer-motion";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/bookings")
      .then((response) => {
        setBookings(response.data);
        console.log(response);
      })
      .catch((err) => {
        console.log(err.message);
      });
    setLoading(false);
  }, []);

  return (
    <>
      <h1 className="bg-gray-200 text-primary font-medium py-1 px-4 text-xl my-3 text-center rounded-lg max-w-xs mx-auto">
        Booking List:
      </h1>
      <div className="h-[350px] overflow-auto px-12">
        <AnimatePresence>
          {loading && (
            <motion.div
              exit={{ opacity: 0 }}
              className=" flex items-center justify-center bg-white"
            >
              <div className="newtons-cradle small">
                <div className="newtons-cradle__dot"></div>
                <div className="newtons-cradle__dot"></div>
                <div className="newtons-cradle__dot"></div>
                <div className="newtons-cradle__dot"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {!loading && bookings && bookings.length > 0 && (
          <div>
            {bookings?.map((booking) => (
              <Link
                to={`/account/bookings/${booking._id}`}
                className="flex relative bookingList  m-4 gap-4 bg-gray-200 rounded-lg overflow-hidden"
              >
                <div className="w-48 p-4 placeImage">
                  <PlacesImage place={booking.place} />
                </div>
                <div className="py-3 pr-3 placeDetails grow">
                  <h2 className=" truncate placetitle text-xl">
                    {booking?.place?.title}
                  </h2>
                  <BookingDate booking={booking} />
                </div>
              </Link>
            ))}
          </div>
        )}
        {!loading && bookings && bookings.length < 1 && (
          <div className="text-center mt-2 py-4 px-6 mx-auto max-w-xs rounded-lg font-semibold text-xl text-primary">
            No Bookings yet!.
            <br />
            <Link className="underline" to={"/"}>
              Make a booking here
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default BookingList;
