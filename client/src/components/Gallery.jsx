import React, { useState } from 'react'
import { CgMenuGridO } from 'react-icons/cg';
import { AiFillCloseCircle } from 'react-icons/ai';

const Gallery = ({place}) => {
    const [ showAllPhotos,setShowAllPhotos ] = useState(false);

    if(showAllPhotos){
        return (
              <div className='absolute inset-0 bg-black text-white min-h-screen'>
                <div className='bg-black p-8 grid gap-4'>
                    <div>
                        <h1 className='text-3xl mr-48'>Photos of {place.title}</h1>
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
         </>
  )
}

export default Gallery
