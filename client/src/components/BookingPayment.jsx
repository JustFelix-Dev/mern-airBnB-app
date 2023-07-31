import React from 'react';
import { differenceInCalendarDays, format } from 'date-fns';
import { FcCalendar } from 'react-icons/fc';
import { MdModeNight } from 'react-icons/md';
import { BsFillPatchCheckFill } from 'react-icons/bs';
import axios from 'axios';

const BookingPayment = ({ booking }) => {
  // Custom format string: 'd EEE,MMMM yyyy'
  const formattedCheckInDate = format(new Date(booking.checkIn), 'd EEE,MMMM yyyy');
  const formattedCheckOutDate = format(new Date(booking.checkOut), 'd EEE,MMMM yyyy');

  const handleCheckOut=({booking})=>{
          axios.post('/create-checkout-session',{booking})
          .then((res)=>{
            if(res.data.url){
                window.location.href = res.data.url;
            }
          })
          .catch((err)=>{
            console.log(err.message)
          })
  }

  return (
    <>
      <div className='bg-gray-200 text-black p-3 rounded-xl'>
        <div className=' flex justify-between gap-2 border-t border-white-300 mt-2 py-2'>
            <div className='flex flex-col gap-1'>
          <div >
            <h1 className='underline  px-2 rounded-sm text-black my-1'>Check-In Date:</h1>
            <div className='flex gap-2 items-center'>
            <FcCalendar /> {formattedCheckInDate} 
            </div>
          </div>
          <div >
          <h1 className='underline px-2 rounded-sm text-black my-1'>Check-Out Date:</h1>
          <div className='flex gap-2 items-center'>
            <FcCalendar /> {formattedCheckOutDate}
          </div>
          </div>
           <div >
            <h1 className='underline px-2 rounded-sm text-black my-1'>Number of Nights:</h1>
            <div className='flex items-center gap-2'>
            <MdModeNight/>
          <p>{differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} night(s)</p> 
            </div>
          {/* Price: ${booking.price} */}
        </div>
            </div>
            <div className='flex flex-col items-center justify-between'>
                <h1>Total Price: <span className='text-2xl font-medium'>${booking.price}</span></h1>
                <div>
                  {
                    booking.status && booking.status == "Paid" ? (<span  className='bg-green-800 flex items-center gap-1 px-4 py-1 text-white rounded-md'>View Reservation<BsFillPatchCheckFill/></span>) : (<button onClick={()=>handleCheckOut({booking})} className='bg-primary px-4 py-1 text-white rounded-xs'>Proceed to Payment</button>)
                  }
                </div>
                
            </div>
        </div>
      </div>
    </>
  );
}

export default BookingPayment;

