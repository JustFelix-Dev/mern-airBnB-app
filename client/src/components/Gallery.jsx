import React, { useState } from 'react'
import { CgMenuGridO } from 'react-icons/cg';
import { AiFillCloseCircle } from 'react-icons/ai';

const Gallery = ({place}) => {
    const [ showAllPhotos,setShowAllPhotos ] = useState(false);

    if(showAllPhotos){
        return (
              <div className='absolute text-start inset-0 bg-black text-white h-full'>
                <div className='bg-black p-8 grid justify-center items-center gap-4'>
                    <div>
                        <h1 className='text-lg sm:text-xl md:text-3xl truncate max-w-xs sm:max-w-lg'>Photos of {place.title}</h1>
                        <button onClick={()=> setShowAllPhotos(false)} className='fixed flex items-center right-12 top-8 flex gap-2 py-2 px-4 rounded-2xl bg-white text-black'><AiFillCloseCircle/><span className='hidden md:block'>Close Photo</span></button>
                    </div>
                     {place?.photos?.length > 0 && place.photos.map(photo=>(
                         <div className='text-start'>
                            <img src={photo} alt="locationImage" />
                        </div>
                     ))}
                     </div>
              </div>
        )
    }

  return (
         <>
          <div className="mx-auto max-w-5xl relative">
                  <div className=" grid gap-2 grid-cols-2 md:grid-cols-[2fr_1fr_1fr] rounded-2xl overflow-hidden">
                    <div>
                        {place.photos?.[0] && (
                            <div>
                                <img onClick={()=> setShowAllPhotos(true)} className='cursor-pointer aspect-square object-cover' src={place.photos[0]} />
                            </div>
                        )}
                    </div>
                    <div className='md:hidden'>
                        {place.photos?.[1] && (
                            <div>
                                <img onClick={()=> setShowAllPhotos(true)} className='cursor-pointer aspect-square object-cover' src={place.photos[1]} />
                            </div>
                        )}
                    </div>
                    <div className='md:hidden'>
                        {place.photos?.[2] && (
                            <div>
                                <img onClick={()=> setShowAllPhotos(true)} className='cursor-pointer aspect-square object-cover' src={place.photos[2]} />
                            </div>
                        )}
                    </div>
                    <div className='md:hidden'>
                        {place.photos?.[3] && (
                            <div>
                                <img onClick={()=> setShowAllPhotos(true)} className='cursor-pointer aspect-square object-cover' src={place.photos[3]} />
                            </div>
                        )}
                    </div>
                    <div className='hidden md:grid'>
                       {place.photos?.[1] && (
                            <img onClick={()=> setShowAllPhotos(true)} className='cursor-pointer aspect-square object-cover' src={place.photos[1]}/>
                        )}
                            <div className='hidden md:block overflow-hidden'>
                         {place.photos?.[2] && (
                                <img onClick={()=> setShowAllPhotos(true)} className='cursor-pointer aspect-square object-cover relative top-2' src={place.photos[2]}/>
                                )}
                            </div>
                    </div>
                    <div className=' hidden md:grid'>
                       {place.photos?.[3] && (
                            <img onClick={()=> setShowAllPhotos(true)} className='cursor-pointer aspect-square object-cover' src={place.photos[3]}/>
                        )}
                            <div className='hidden md:block overflow-hidden '>
                         {place.photos?.[4] && (
                                <img onClick={()=> setShowAllPhotos(true)} className='cursor-pointer aspect-square object-cover relative top-2' src={place.photos[4]}/>
                                )}
                            </div>
                    </div>
                  </div>
                  <button onClick={()=>setShowAllPhotos(true)} className='absolute flex items-center bottom-2 right-2 bg-white font-medium text-black rounded-2xl border border-black py-2 px-4 '><CgMenuGridO/><span className='hidden md:block'>Show More Photos</span></button>
                  </div>
         </>
  )
}

export default Gallery;
