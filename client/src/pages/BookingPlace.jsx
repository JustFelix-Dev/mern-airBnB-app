import React from 'react'
import { useParams } from 'react-router-dom'

const BookingPlace = () => {
    const {id} = useParams()
  return (
         <>
        Welcome to Booking Details - {id}
         </>
  )
}

export default BookingPlace
