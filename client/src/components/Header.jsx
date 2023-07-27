import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { userContext } from '../ContextHook/userContext'

const Header = () => {
    const {user} = useContext(userContext)
  return (
          <>
          <header className='px-10 py-3 flex border shadow-sm justify-between'>
             <Link to='/' className='flex items-center gap-1'>
                 <img src="images/svgexport-2.svg" alt="airbnb_logo" />
                 <span className='font-bold text-2xl text-primary'>airbnb</span>
             </Link>
             <div className='flex gap-2 items-center border border-gray-300 rounded-full pl-6 pr-2 py-3 shadow-md shadow-gray-200'>
               <div className=" border-r border-gray-300 pr-2">Anywhere</div>
               <div className=" border-r border-gray-300 pr-2">Any week</div>
               <div>Add guests</div>
               <button className=' bg-primary p-2 rounded-full'><img src="images/svgexport-4.svg" alt="airbnb_search" height={15} width={15} /></button>
             </div>
             <div className='flex items-center gap-5 '>
              <div><h1>Airbnb your home</h1></div>
              <div><img src="images/svgexport-5.svg" alt="" /></div>
              <Link to={ user ? '/account' : '/login'} className='flex items-center gap-2 border border-gray-300 rounded-full px-2 py-1'>
                <img src="images/svgexport-6.svg" alt="menu" height={20} width={17} />
                <img
                        src={
                          user && user.photo
                            ? user.photo.startsWith('https://')
                              ? user.photo
                              : `http://localhost:8000/userPhoto/${user.photo}` 
                               : 'images/svgexport-7.svg'
                        }
                        alt="userIcon"
                        height={30}
                        width={30}
                        style={{ borderRadius: '20px' }}
                      />
                <div>
                    { user && user.name.split(' ')[0]}
                </div>
              </Link>
             </div>
         </header>
          </>
  )
}

export default Header
