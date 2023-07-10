import axios from 'axios'
import React, { useEffect } from 'react'

const BookingList = () => {

    useEffect(()=>{
        axios.get('/bookings')
    })
  return (
         <>
         <h1>Booking List</h1>
         </>
  )
}

export default BookingList
