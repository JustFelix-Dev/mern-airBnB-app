import React from 'react';
import { differenceInCalendarDays, format } from 'date-fns';
import { FcCalendar } from 'react-icons/fc';

const BookingDate = ({ booking }) => {
  // Custom format string: 'd EEE,MMMM yyyy'
  const formattedCheckInDate = format(new Date(booking.checkIn), 'd EEE,MMMM yyyy');
  const formattedCheckOutDate = format(new Date(booking.checkOut), 'd EEE,MMMM yyyy');

  return (
    <>
      <div>
        <div className='flex gap-2 border-t border-gray-300 mt-2 py-2'>
          <div className='flex items-center'>
            <FcCalendar /> {formattedCheckInDate} &rarr;
          </div>
          <div className='flex items-center'>
            <FcCalendar /> {formattedCheckOutDate}
          </div>
        </div>
        <div className='text-xl'>
          <em>{differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} night(s)</em> |
          Price: ${booking.price}
        </div>
      </div>
    </>
  );
}

export default BookingDate;

