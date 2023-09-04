import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AddressLink from '../components/AddressLink';
import Gallery from '../components/Gallery';
import BookingPayment from '../components/BookingPayment';
import { AnimatePresence, motion } from 'framer-motion';


const BookingPlace = () => {
    const {id} = useParams()
    const [ booking,setBooking] = useState(null);
    const [isLoading,setIsLoading] = useState(true);

    useEffect(()=>{
         if(id){
            axios.get('/bookings').then((response)=>{
              const foundBooking = response.data.find(({_id})=> _id === id)
              if(foundBooking){
                setBooking(foundBooking)
              }
            })
          }
          setIsLoading(false)
        },[id])
        
        // console.log(booking)
    if(!booking){
        return '';
    }
  return (
         <>
          <AnimatePresence>
          { isLoading && (
           <motion.div exit={{opacity:0}}  className='h-[80vh] w-full flex items-center justify-center bg-white'>
                   <div className="newtons-cradle index">
                  <div className="newtons-cradle__dot"></div>
                  <div className="newtons-cradle__dot"></div>
                  <div className="newtons-cradle__dot"></div>
                  <div className="newtons-cradle__dot"></div>
                  </div>
       </motion.div>
         ) }
         </AnimatePresence>
            { !isLoading && booking ?  <div className="my-8 max-w-4xl mx-auto shadow-2xl p-4">
           <h1 className=' mb-4 text-lg sm:text-xl md:text-3xl md:mb-0'>{booking.place.title}</h1>
             <AddressLink>{booking.place.address}</AddressLink>
             <div className="bg-primary text-white p-4 mb-4 rounded-2xl">
                <h2>Your Booking Information:</h2>
                  <BookingPayment booking={booking}/>
             </div>
               <h2 className='text-xl font-medium p-4'>Where you would be staying :</h2>
             <Gallery place={booking.place}/>
             </div> :  <AnimatePresence>
          { !isLoading && (
           <motion.div exit={{opacity:0}}  className='h-[80vh] w-full flex items-center justify-center bg-white'>
                   <div className="newtons-cradle index">
                  <div className="newtons-cradle__dot"></div>
                  <div className="newtons-cradle__dot"></div>
                  <div className="newtons-cradle__dot"></div>
                  <div className="newtons-cradle__dot"></div>
                  </div>
       </motion.div>
         ) }
         </AnimatePresence>
              }
         </>
  )
}

export default BookingPlace
