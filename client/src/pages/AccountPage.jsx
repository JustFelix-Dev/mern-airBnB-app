import React, { useContext } from 'react'
import { userContext } from '../ContextHook/userContext'
import { NavLink, useNavigate } from 'react-router-dom';

const AccountPage = () => {
    const { user, ready } = useContext(userContext);
    const navigate = useNavigate()

    if(!ready){
        return 'Loading...';
    }

    if(ready && !user){
            navigate('/login')
    }
  return (
         <>
            <nav className='w-full flex justify-center mt-8 gap-2'>
                <NavLink className='py-2 px-6 bg-primary text-white rounded-full' to={'/account'}>My Profile</NavLink>
                <NavLink className='py-2 px-6' to={'/account/bookings'}>My bookings</NavLink>
                <NavLink className='py-2 px-6' to={'/account/accommodations'}>My accommodations</NavLink>

            </nav>           
         </>
  )
}

export default AccountPage
