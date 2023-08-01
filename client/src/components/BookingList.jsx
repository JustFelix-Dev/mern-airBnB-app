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
        .catch((err)=>{
            console.log(err.message)
        })
    },[])

    const handleDelete=(id)=>{
        alert(id)
    }
  return (
         <>
         <h1 className="bg-gray-200 text-primary font-medium py-1 px-4 text-xl my-3 text-center rounded-lg max-w-xs mx-auto">Booking List:</h1>
           <div className='h-[350px] overflow-auto px-12'>
            { bookings && bookings.length > 0 && (
               <div>
                 {
                    bookings.map(booking=>(
                        <Link to={`/account/bookings/${booking._id}`} className='flex relative  m-4 gap-4 bg-gray-200 rounded-lg overflow-hidden'>
                            <div className='w-48 p-4'>
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
            </div>
         </>
  )
}

export default BookingList
