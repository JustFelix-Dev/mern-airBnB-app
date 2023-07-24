import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PlacesImage from './PlacesImage';
import { Link } from 'react-router-dom';
import BookingDate from './BookingDate';

const BookingList = () => {
    const [ bookings,setBookings ] = useState([]);

    useEffect(()=>{
        axios.get('/bookings')
        .then((response)=>{
         setBookings(response.data)
            console.log(response)
        })
    },[])
  return (
         <>
         <h1>Booking List</h1>
            { bookings && bookings.length > 0 && (
               <div>
                 {
                    bookings.map(booking=>(
                        <Link to={`/account/bookings/${booking._id}`} className='flex gap-4 bg-gray-200 rounded-2xl overflow-hidden'>
                            <div className='w-48'>
                                <PlacesImage place={booking.place}/>
                            </div>
                            <div className='py-3 pr-3 grow'>
                                <h2 className='text-xl'>{booking.place.title}</h2>
                                 <BookingDate booking={booking}/>
                                </div>
                        </Link>
                    ))
                 }
               </div>
            )
            
            }
         </>
  )
}

export default BookingList
