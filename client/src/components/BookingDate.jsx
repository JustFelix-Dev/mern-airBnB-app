import React from 'react';
import { differenceInCalendarDays, format } from 'date-fns';
import { FcCalendar } from 'react-icons/fc';
import { ImPriceTags } from 'react-icons/im';
import { MdModeNight,MdOutlineCancel} from 'react-icons/md';
import { BsFillPatchCheckFill } from 'react-icons/bs';


const BookingDate = ({ booking }) => {
  // Custom format string: 'd EEE,MMMM yyyy'
  const formattedCheckInDate = format(new Date(booking.checkIn), 'd EEE,MMMM yyyy');
  const formattedCheckOutDate = format(new Date(booking.checkOut), 'd EEE,MMMM yyyy');

  return (
    <>
      <div className='relative'>
        <div className='flex gap-2 border-t border-gray-300 mt-2 py-2'>
          <div className='flex items-center'>
            <FcCalendar /> {formattedCheckInDate} &rarr;
          </div>
          <div className='flex items-center'>
            <FcCalendar /> {formattedCheckOutDate}
          </div>
        </div>
        <div className=' flex justify-center gap-2 text-lg bg-white text-primary font-medium max-w-xs text-center py-1 rounded-lg'>
         <p className=' flex items-center justify-center gap-2'><MdModeNight/><p>{differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} night(s)</p></p>  |
        <p className='flex items-center justify-center gap-2 text-white bg-primary  px-4 rounded-lg'><ImPriceTags/> <span>${booking.price}</span></p>  
        </div>
         <div className='absolute  bottom-[0.7px] right-2'>
            { booking.status && booking.status =="Paid" ?(<div className='bg-green-800  text-white py-1 px-4 flex items-center gap-1 rounded-lg'><span>Paid</span><span><BsFillPatchCheckFill/></span></div> ):(<div className='bg-primary  text-white py-1 px-4 flex items-center gap-1 rounded-lg'><span>Not Paid</span><span><MdOutlineCancel/></span></div>)}
            
         </div>
      </div>
    </>
  );
}

export default BookingDate;

