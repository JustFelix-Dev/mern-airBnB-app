import React, { useState } from 'react';
import { BiCurrentLocation } from 'react-icons/bi';


const AddressLink = ({children}) => {
      const [ isModal,setIsModal ] = useState(false);

  const openModal=()=>{
       setIsModal(true)
  }

  return (
         <>
           {  isModal && (
                      <div>
                          <div>
                            <h1>Share this Place:</h1>
                          </div>
                      </div>
           )

           }
         <div className='flex justify-between'>
          <a className='flex items-center gap-1 my-3 block font-semibold underline' target='blank' href={'https://maps.google.com/?q='+ children}><BiCurrentLocation/>{children}
         </a>
          <div>
            <div onClick={openModal} className='flex cursor-pointer hover:underline items-center gap-1'> <span><svg fill="#333" width={20} height={20} stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"></path>
          </svg></span><span>Share</span></div>
          </div>
         </div>
         </>
  )
}

export default AddressLink
