import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AiFillCloseCircle } from 'react-icons/ai';

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
                    <h1 className='text-3xl'>Photos of {place.title}</h1>
                    <button onClick={()=> setShowAllPhotos(false)} className='fixed right-12 top-8 flex gap-2 py-2 px-4 rounded-2xl bg-white text-black'><AiFillCloseCircle/>Close Photo</button>
                </div>
                 {place?.photos?.length > 0 && place.photos.map(photo=>(
                     <div>
                        <img src={'http://localhost:8000/uploads' + photo} alt="locationImage" />
                    </div>
                 ))}
                 </div>
          </div>
    )
}

  return (
         <>
            <div className='mt-4 bg-gray-100 -mx-8 px-8 py-8'>
                <h1 className='text-3xl'>{place.title}</h1>
                  <a className='my-2 block font-semibold underline' target='blank' href=""></a>

            </div>
     
         </>
  )
}

export default PlacesDetail
