import React from 'react'

const IndexPage = () => {
  return (
         <>
           <header className='px-10 py-3 flex justify-between'>
             <a href="#" className='flex items-center gap-1'>
                 <img src="images/svgexport-2.svg" alt="airbnb_logo" />
                 <span className='font-bold text-xl'>airbnb</span>
             </a>
             <div className='flex gap-2 items-center border border-gray-300 rounded-full px-5 py-2 shadow-md shadow-gray-200'>
               <div className=" border-r border-gray-300 pr-2">Anywhere</div>
               <div className=" border-r border-gray-300 pr-2">Any week</div>
               <div>Add guests</div>
               <button className='bg-primary p-1 rounded-full'><img src="images/svgexport-4.svg" alt="airbnb_search" height={15} width={15} /></button>
             </div>
             <div className='flex items-center gap-5 '>
              <div><h1>Airbnb your home</h1></div>
              <div><img src="images/svgexport-5.svg" alt="" /></div>
              <div className='flex items-center gap-2 border border-gray-300 rounded-full px-2 py-1'>
                <img src="images/svgexport-6.svg" alt="menu" height={20} width={17} />
                <img src="images/svgexport-7.svg" alt="userIcon" height={30} width={30} />
              </div>
             </div>
         </header>
         </>
  )
}

export default IndexPage
