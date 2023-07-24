import React from 'react';
import { BiCurrentLocation } from 'react-icons/bi';


const AddressLink = ({children}) => {
  return (
         <>
          <a className='flex items-center gap-1 my-3 block font-semibold underline' target='blank' href={'https://maps.google.com/?q='+ children}><BiCurrentLocation/>{children}
         </a>
         </>
  )
}

export default AddressLink
