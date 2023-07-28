import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AddressLink from '../components/AddressLink';
import Gallery from '../components/Gallery';
import BookingPayment from '../components/BookingPayment';

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
        
        console.log(booking)
    if(!booking){
        return '';
    }
  return (
         <>
             <div className="my-8 max-w-4xl mx-auto shadow-2xl p-4">
           <h1 className='text-3xl'>{booking.place.title}</h1>
             <AddressLink>{booking.place.address}</AddressLink>
             <div className="bg-primary text-white p-4 mb-4 rounded-2xl">
                <h2>Your Booking Information:</h2>
                  <BookingPayment booking={booking}/>
             </div>
               <h2 className='text-xl font-medium p-4'>Where you would be staying :</h2>
             <Gallery place={booking.place}/>
             </div>
         </>
  )
}

export default BookingPlace
