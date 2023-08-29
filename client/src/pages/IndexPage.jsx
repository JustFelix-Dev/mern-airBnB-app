import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PlaceContext } from '../ContextHook/placeContext';
import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton from 'react-loading-skeleton';
import Loader from '../components/Loader';
import { AnimatePresence, motion } from 'framer-motion';


const IndexPage = () => {
      const { allPlaces,error,loading } = useContext(PlaceContext);
      const [ renderOnce,setRenderOnce] = useState(false);

      useEffect(()=>{
        if(!renderOnce){
          setRenderOnce(true)
          if(renderOnce){
            setRenderOnce(false)
          }
        }
      },[])

      const placesVariants = {
          hidden: {opacity:0},
          visible: {opacity:1, 
            transition:{
              delay:3,
            }}
      }
      
  return (
         <>
         <AnimatePresence>
          { loading && (
           <motion.div exit={{opacity:0}} transition={{duration:3}} className='h-[80vh] w-full flex items-center justify-center bg-white'>
           <motion.div initial={{rotate:0,scale:0.3}} animate={{rotate:'360deg',scale:1}} transition={{duration:2, repeat:'infinity',repeatType:'reverse'}}>
            <img src="/images/airbnb.png" alt="loader" height={100} width={100} />
           </motion.div>
       </motion.div>
         ) }
         </AnimatePresence>  

         { !loading &&
          ( <motion.div variants={renderOnce ? placesVariants : {}} initial='hidden' animate='visible' className="indexLocations mt-8 grid max-w-8xl pt-4 px-4 sm:px-6 md:px-10 lg:px-12 gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {
          allPlaces?.length > 0 && allPlaces.map((place,idx) => (
  
            <Link key={idx} to={'/place/'+place._id}>
          <div className="bg-gray-500 mb-2 rounded-2xl flex">
            {place.photos?.[0] && (
              <img className="rounded-xl object-cover aspect-square " src={'https://www.airbnb-server.felixdev.com.ng/uploads/'+place.photos?.[0]} alt=""/> 
            )}
          </div>
          <h2 className="font-bold truncate">{place.address}</h2>
          <h3 className="text-sm text-gray-500">{place.title}</h3>
          <div className="mt-1">
            <span className="font-bold">${place.price}</span> per night
          </div>
        </Link>
      ))
      }
            </motion.div>)
            }
         </>
  )
}

export default IndexPage
