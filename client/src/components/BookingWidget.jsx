import React, { useState } from 'react'
import {differenceInCalendarDays} from 'date-fns'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BookingWidget = ({place}) => {
    const [ checkIn,setCheckIn ] = useState('');
    const [ checkOut,setCheckOut ] = useState('');
    const [ guestNum,setGuestNum ] = useState(1);
    const [ fullName,setFullName] = useState('');
    const [ mobile,setMobile ] = useState('');
    const navigate = useNavigate();

    let numOfNight = 0;
    if(checkIn && checkOut){
        numOfNight = differenceInCalendarDays(new Date(checkOut),new Date(checkIn));
    }

    const handleBooking=async()=>{
        const formBody = { place:place._id,checkIn,checkOut,numOfGuests:guestNum,fullName,mobile,price:numOfNight * place.price}
        const response = await axios.post('/bookings',formBody)
        const bookingId = response.data._id;
        navigate(`/account/bookings/${bookingId}`)
    }

  return (
          <>
           <div className="bg-white shadow p-4 rounded-2xl">
            <p className='text-2xl text-center'>${place.price}/per night</p>
            <div className="border rounded-2xl mt-4">
            <div className="flex">
            <div className=' py-3 px-4'>
                <label htmlFor="checkIn">Check-In:</label>
                <input type="date"
                 value={checkIn}
                  onChange={(e)=>setCheckIn(e.target.value)} />
            </div>
            <div className=' py-3 px-4 border-l'>
                <label htmlFor="checkOut">Check-Out:</label>
                <input type="date" 
                value={checkOut}
                 onChange={(e)=>setCheckOut(e.target.value)} />
            </div>
                </div>
            <div className=' py-3 px-4 border-t'>
                <label htmlFor="guests">Number of Guests:</label>
                <input type="number" 
                value={guestNum} min={1} max={place.guests}
                onChange={(e)=>setGuestNum(e.target.value)} />
            </div>
            {numOfNight > 0 &&(
               <div className=' py-3 px-4 border-t'>
               <label htmlFor="guests">Full Name</label>
               <input type="text" 
               value={fullName} 
               onChange={(e)=>setFullName(e.target.value)} />
                <label htmlFor="guests">Phone Number</label>
               <input type="tel" 
               value={mobile} 
               onChange={(e)=>setMobile(e.target.value)} />
           </div>
            )}
            </div>
            <button onClick={handleBooking} className="primary">
                Book this place

                {numOfNight > 0 &&  (
                    <span> :${numOfNight * place.price }</span>
                )}
            </button>
        </div>
          </>
  )
}

export default BookingWidget
