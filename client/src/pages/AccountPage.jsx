import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../ContextHook/userContext'
import { Link, redirect, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import LocationPages from './LocationPages';
import { FaUserShield } from 'react-icons/fa';
import { GiNotebook } from 'react-icons/gi';
import { BiLocationPlus } from 'react-icons/bi';
import PlacesDetail from './PlacesDetail';


const AccountPage = () => {
    const { user,setUser,ready } = useContext(userContext);
    const [ redirected,setRedirected] = useState(false);
    const navigate = useNavigate()
    let {subPage} = useParams()
    const {id} = useParams()
    
   
    const logout =async()=>{
        await axios.post('/logout')
        setUser(null)
        setRedirected(true)
    }

    if(redirected){
        navigate('/login',{replace:true})
    }

    if(!ready){
        return 'Loading...';
    }

    if(ready && !user){
            redirect('/login')
    }

    if(subPage === undefined ){
        subPage = 'profile';
    }
    function linkClasses(type=null){
         let classes = 'inline-flex items-center gap-1 py-2 px-6 rounded-full';
         if(type === subPage){
            classes+= ' bg-primary text-white '
         }else{
            classes+= ' bg-gray-200'
         }
         return classes;
    }
  return (
         <>
            <nav className='w-full flex justify-center mt-8 mb-8 gap-2'>
                <Link className={linkClasses('profile')} to={'/account'}>
                    <FaUserShield/> My Profile</Link>
                <Link className={linkClasses('bookings')} to={'/account/bookings'}>  <GiNotebook/>My bookings</Link>
                <Link className={linkClasses('places')} to={'/account/places'}><BiLocationPlus/>My accommodations</Link>
            </nav>  
            {
               subPage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    Logged In as {user?.name} ({user?.email})<br/>
                    <button onClick={logout} className='primary max-w-sm mt-2'>Logout</button>
                </div>
               )
            }
            {
               !id && subPage === 'places' && (
                    <LocationPages/>
                )
            }{
                id && (
                    <PlacesDetail/>
                )
            }

         </>
  )
}

export default AccountPage
