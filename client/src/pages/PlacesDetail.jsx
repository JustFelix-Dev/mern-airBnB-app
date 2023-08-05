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
            (<div className='mt-4 max-w-5xl shadow-lg  mx-auto px-8 pt-8'>
                <h1 className='text-3xl'>{place.title}</h1>
                   <AddressLink>{place.address}</AddressLink>
                   <Gallery place={place}/>
                  <div className='mt-8 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]'>
                    <div>
                    <div className="my-4">
                    <h2 className="font-semibold text-2xl"> Description </h2>
                    <p>{place.description || 'No description available' }</p>
                     </div>
                        <div className='bg-primary rounded-xl flex flex-col gap-2 max-w-xs  py-4 px-4 text-white font-medium'>
                        <p className='bg-white text-black w-auto px-2 py-1 rounded-md'>Check-In: {place.checkIn}</p>
                        <p className='bg-white text-black w-auto px-2 py-1 rounded-md'>Check-Out: {place.checkOut}</p>
                        <p className='bg-white text-black w-auto px-2 py-1 rounded-md'>Max No. of Guests: {place.guests}</p>
                        </div>
                    </div>
                      <div className='flex items-center'>
                        <BookingWidget place={place}/>
                      </div>
                  </div>
                  <div className="bg-white -mx-8 px-8 py-8 border-t">
                    <div>
                      <h2 className='text-xl font-bold'>What this Place has to Offer You:</h2>
                        {
                          place.perks && (
                                place.perks.map((perk,idx)=>(
                                  <div className='flex gap-1 items-center'>
                                    <img src={`/images/${perk}.png`} alt="wifiIcon"height={20} width={20} />
                                    <span className='text-lg'>{perk}</span>
                                  </div>
                                ))
                          )
                        }
                    </div>
                  <div className='mt-4  py-4 border-t'>
                  <h2 className="text-xl font-bold"> Extra info:</h2>
                  </div>
                  <div className='mb-4 mt-2 text-sm text-gray-900 leading-5'>
                    <p className='text-lg'>{place.extraInfo}</p>
                  </div>
                  </div>
            </div>)}
     
         </>
  )
}

export default PlacesDetail
