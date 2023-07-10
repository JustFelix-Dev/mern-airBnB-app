import axios from 'axios'
import React, { useEffect, useState } from 'react'

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
                        <div key={booking._id}>{booking.checkIn}</div>
                    ))
                 }
               </div>
            )
            
            }
         </>
  )
}

export default BookingList
