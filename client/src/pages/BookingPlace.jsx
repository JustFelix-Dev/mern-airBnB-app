import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AddressLink from '../components/AddressLink';
import Gallery from '../components/Gallery';
import BookingDate from '../components/BookingDate';

const BookingPlace = () => {
    const {id} = useParams()
    const [ booking,setBooking] = useState(null);

    useEffect(()=>{
         if(id){
            axios.get('/bookings').then((response)=>{
              const foundBooking = response.data.find(({_id})=> _id === id)
              if(foundBooking){
                setBooking(foundBooking)
              }
            })
         }
    },[id])

    if(!booking){
        return '';
    }
  return (
         <>
             <div className="my-8">
           <h1 className='text-3xl'>{booking.place.title}</h1>
             <AddressLink>{booking.place.address}</AddressLink>
             <div className="bg-gray-200 p-4 mb-4 rounded-2xl">
                <h2>Your Booking Information:</h2>
                  <BookingDate booking={booking}/>
             </div>
             <Gallery place={booking.place}/>
             </div>
         </>
  )
}

export default BookingPlace
