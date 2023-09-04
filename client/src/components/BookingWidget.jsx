import React, { useContext, useEffect, useState } from 'react'
import {differenceInCalendarDays} from 'date-fns'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../ContextHook/userContext';

const BookingWidget = ({place}) => {
    const [ checkIn,setCheckIn ] = useState('');
    const [ checkOut,setCheckOut ] = useState('');
    const [ guestNum,setGuestNum ] = useState(1);
    const [ fullName,setFullName] = useState('');
    const [ mobile,setMobile ] = useState('');
    const {user} = useContext(userContext);
    const [ isLoading,setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        if(user){
          setFullName(user.name)
        }
    },[user])

    let numOfNight = 0;
    if(checkIn && checkOut){
        numOfNight = differenceInCalendarDays(new Date(checkOut),new Date(checkIn));
    }

    const handleBooking=async()=>{
             setIsLoading(true)
        const formBody = {
              place:place._id,checkIn,checkOut,
              numOfGuests:guestNum,fullName,mobile,
              price:numOfNight * place.price
        }
        const response = await axios.post('/bookings',formBody)
        const bookingId = response.data._id;
        setIsLoading(false)
        navigate(`/account/bookings/${bookingId}`)
    }

  return (
          <>
           <div className="bg-white shadow-2xl border-t-2 border-primary p-4 rounded-2xl w-full">
            <p className='text-2xl text-center'>${place.price}/<span className='text-gray-500'>night</span></p>
            <div className="border rounded-2xl mt-4">
            <div className="flex flex-col gap-2 sm:flex-row">
            <div className=' py-3 px-4'>
                <label htmlFor="checkIn">Check-In:</label>
                <input type="date"
                 value={checkIn}
                  onChange={(e)=>setCheckIn(e.target.value)} required />
            </div>
            <div className=' py-3 px-4 border-l'>
                <label htmlFor="checkOut">Check-Out:</label>
                <input type="date" 
                value={checkOut}
                 onChange={(e)=>setCheckOut(e.target.value)} required />
            </div>
                </div>
            <div className=' py-3 px-4 border-t'>
                <label htmlFor="guests">Number of Guests:</label>
                <input type="number" 
                value={guestNum} min={1} max={place.guests}
                onChange={(e)=>setGuestNum(e.target.value)}
                  required
                />
            </div>
            {numOfNight > 0 &&(
               <div className=' py-3 px-4 border-t'>
               <label htmlFor="guests">Full Name</label>
               <input type="text" 
               value={fullName} 
               onChange={(e)=>setFullName(e.target.value)}
                required
                />
                <label htmlFor="guests">Phone Number</label>
               <input type="tel" 
               value={mobile} 
               onChange={(e)=>setMobile(e.target.value)}
                 required
               />
           </div>
            )}
            </div>
            <button onClick={handleBooking} className="primary"> 
            { !isLoading ?
               <div>
               Reserve
                {numOfNight > 0 &&  (
                    <span> :${numOfNight * place.price }</span>
                )}
                </div> 
                : (<div className="newtons-cradle">
                <div className="newtons-cradle__dot"></div>
                <div className="newtons-cradle__dot"></div>
                <div className="newtons-cradle__dot"></div>
                <div className="newtons-cradle__dot"></div>
                </div>)
            }
            </button>
        </div>
          </>
  )
}

export default BookingWidget
