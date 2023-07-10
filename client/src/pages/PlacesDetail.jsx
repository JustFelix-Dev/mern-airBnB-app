import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AiFillCloseCircle } from 'react-icons/ai';
import { BiCurrentLocation } from 'react-icons/bi';
import { CgMenuGridO } from 'react-icons/cg';
import BookingWidget from '../components/BookingWidget';

const PlacesDetail = () => {
    const {id} = useParams()
    const [ place,setPlace ] = useState(null)
    const [ showAllPhotos,setShowAllPhotos ] = useState(false);

useEffect(()=>{
    if(!id)  return
      axios.get('/places/' + id).then(response=>{
           const {data} = response;
           console.log(data)
           setPlace(data)

      }) 
},[id])

if(showAllPhotos){
    return (
          <div className='absolute inset-0 bg-black text-white min-h-screen'>
            <div className='bg-black p-8 grid gap-4'>
                <div>
                    <h1 className='text-3xl mr-36'>Photos of {place.title}</h1>
                    <button onClick={()=> setShowAllPhotos(false)} className='fixed flex items-center right-12 top-8 flex gap-2 py-2 px-4 rounded-2xl bg-white text-black'><AiFillCloseCircle/>Close Photo</button>
                </div>
                 {place?.photos?.length > 0 && place.photos.map(photo=>(
                     <div>
                        <img src={'http://localhost:8000/uploads/' + photo} alt="locationImage" />
                    </div>
                 ))}
                 </div>
          </div>
    )
}

  return (
         <>
         {place && 
            (<div className='mt-4 bg-gray-100 px-8 pt-8'>
                <h1 className='text-3xl'>{place.title}</h1>
                  <a className='flex items-center gap-1 my-3 block font-semibold underline' target='blank' href={'https://maps.google.com/?q='+ place.address}><BiCurrentLocation/>{place.address}
                  </a>
                  <div className="relative">
                  <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden">
                    <div>
                        {place.photos?.[0] && (
                            <div>
                                <img onClick={()=> setShowAllPhotos(true)} className='cursor-pointer aspect-square object-cover' src={'http://localhost:8000/uploads/'+place.photos[0]} />
                            </div>
                        )}
                    </div>
                    <div className='grid '>
                       {place.photos?.[1] && (
                            <img onClick={()=> setShowAllPhotos(true)} className='cursor-pointer aspect-square object-cover' src={'http://localhost:8000/uploads/'+place.photos[1]}/>
                        )}
                            <div className='overflow-hidden'>
                         {place.photos?.[2] && (
                                <img onClick={()=> setShowAllPhotos(true)} className='cursor-pointer aspect-square object-cover relative top-2' src={'http://localhost:8000/uploads/'+place.photos[2]}/>
                                )}
                            </div>
                    </div>
                  </div>
                  <button onClick={()=>setShowAllPhotos(true)} className='absolute flex items-center bottom-2 right-2 bg-white font-medium text-black rounded-2xl border border-black py-2 px-4 '><CgMenuGridO/>Show more Photos</button>
                  </div>
                 
                  <div className='mt-8 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]'>
                    <div>
                    <div className="my-4">
                    <h2 className="font-semibold text-2xl"> Description </h2>
                    <p>{place.description || 'No description available' }</p>
                     </div>
                        <p>Check-In: {place.checkIn}</p>
                        <p>Check-Out: {place.checkOut}</p>
                        <p>Number of Guests: {place.guests}</p>
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
