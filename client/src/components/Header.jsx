import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { userContext } from '../ContextHook/userContext';
import { motion } from 'framer-motion';

const Header = () => {
    const {user} = useContext(userContext)
  return (
    <>
          <header className='px-10 py-3 flex border shadow-sm justify-between'>
             <Link to='/' className='flex items-center gap-1'>
                <img src="/images/svgexport-2.svg" alt="airbnb_logo" />
                 <span className='font-extrabold text-2xl text-primary'>airbnb</span>
             </Link>
             <div className='flex gap-2 items-center border border-gray-300 rounded-full pl-6 pr-2 py-3 shadow-md shadow-gray-200'>
               <div className=" border-r border-gray-300 pr-2">Anywhere</div>
               <div className=" border-r border-gray-300 pr-2">Any week</div>
               <div>Add guests</div>
               <button className=' bg-primary p-2 rounded-full'><img src="/images/svgexport-4.svg" alt="airbnb_search" height={15} width={15} /></button>
             </div>
             <div className='flex items-center gap-5 '>
              <div><h1>Airbnb your home</h1></div>
              <div><img src="/images/svgexport-5.svg" alt="" /></div>
              <Link to={ user ? '/account' : '/login'} className='flex items-center gap-2 border border-gray-300 rounded-full px-2 py-1'>
                <img src="/images/svgexport-6.svg" alt="menu" height={20} width={17} />
                <img
                        src={
                          user && user.photo
                            ? user.photo.startsWith('https://')
                              ? user.photo
                              : `http://localhost:8000/userPhoto/${user.photo}` 
                               : '/images/svgexport-7.svg'
                        }
                        alt="userIcon"
                        height={30}
                        width={30}
                        style={{ borderRadius: '20px' }}
                      />
                <div className='flex items-center gap-1 justify-center'>
                    <div className='pt-1'>{ user && <div>{user.name.split(' ')[0]}</div>}</div>
                 <div >{ user && user.admin && <div><svg width={25} height={25} fill="#FF385C" stroke="white" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg></div>}</div>   
                </div>
              </Link>
             </div>
         </header>
          </>
  )
}

export default Header
