import React from 'react';
import { differenceInCalendarDays, format } from 'date-fns';
import {FcCalendar} from 'react-icons/fc';

const BookingDate = ({booking}) => {
  return (
           <>
             <div>
                <div  className=' flex gap-2 border-t border-gray-300 mt-2 py-2'>
                    <div className='flex items-center'>
                    <FcCalendar/> {format(new Date(booking.checkIn),'yyyy-MM-dd')} &rarr;
                    </div>
                    <div className='flex items-center'>
                <FcCalendar/> {format(new Date(booking.checkOut),'yyyy-MM-dd')}
                    </div>
                </div>
                    <div className='text-xl'>
                        <em>{differenceInCalendarDays(new Date(booking.checkOut),new Date(booking.checkIn))} night(s)</em> |
                    Price : ${booking.price}
                    </div>
                </div>
           </>
  )
}

export default BookingDate
