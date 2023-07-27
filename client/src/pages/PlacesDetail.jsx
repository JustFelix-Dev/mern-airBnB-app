import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookingWidget from '../components/BookingWidget';
import Gallery from '../components/Gallery';
import AddressLink from '../components/AddressLink';

const PlacesDetail = () => {
    const {id} = useParams()
    const [ place,setPlace ] = useState(null)

useEffect(()=>{
    if(!id)  return
      axios.get('/places/' + id).then(response=>{
           const {data} = response;
           console.log(data)
           setPlace(data)

      }) 
},[id])

  return (
         <>
         {place && 
            (<div className='mt-4 max-w-6xl shadow-lg  mx-auto px-8 pt-8'>
                <h1 className='text-3xl'>{place.title}</h1>
                   <AddressLink>{place.address}</AddressLink>
                   <Gallery place={place}/>
                  <div className='mt-8 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]'>
                    <div>
                    <div className="my-4">
                    <h2 className="font-semibold text-2xl"> Description </h2>
                    <p>{place.description || 'No description available' }</p>
                     </div>
                        <div className='bg-primary text-white font-medium'>
                        <p>Check-In: {place.checkIn}</p>
                        <p>Check-Out: {place.checkOut}</p>
                        <p>Number of Guests: {place.guests}</p>
                        </div>
                    </div>
                      <div className='flex items-center'>
                        <BookingWidget place={place}/>
                      </div>
                  </div>
                  <div className="bg-white -mx-8 px-8 py-8 border-t">
                  <div>
                  <h2 className="font-semibold text-2xl "> Extra info </h2>
                  </div>
                  <div className='mb-4 mt-2 text-sm text-gray-900 leading-5'>
                    {place.extraInfo}
                  </div>
                  </div>
            </div>)}
     
         </>
  )
}

export default PlacesDetail
