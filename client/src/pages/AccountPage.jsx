import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../ContextHook/userContext'
import { Link, redirect, useNavigate, useParams } from 'react-router-dom';
import LocationPages from './LocationPages';
import { FaUserShield } from 'react-icons/fa';
import { GiNotebook } from 'react-icons/gi';
import { BiLocationPlus } from 'react-icons/bi';
import PlacesDetail from './PlacesDetail';
import BookingList from '../components/BookingList';
import ProfilePage from './ProfilePage';


const AccountPage = () => {
    const { user,setUser,ready } = useContext(userContext);
    const [ redirected,setRedirected] = useState(false);
    const navigate = useNavigate()
    let {subPage} = useParams()
    const {id} = useParams()
    
   
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
         let classes = 'inline-flex items-center gap-1 py-2 px-6 rounded-lg';
         if(type === subPage){
            classes+= ' bg-primary text-white '
         }else{
            classes+= ' bg-gray-200'
         }
         return classes;
    }
  return (
         <>
            <nav className='w-full flex justify-center mt-8 mb-2 gap-2'>
                <Link className={linkClasses('profile')} to={'/account'}>
                    <FaUserShield/> My Profile</Link>
                <Link className={linkClasses('bookings')} to={'/account/bookings'}>  <GiNotebook/>My bookings</Link>
               { user?.admin &&  <Link className={linkClasses('places')} to={'/account/places'}><BiLocationPlus/>My accommodations</Link>}
            </nav>  
            {
               subPage === 'profile' && (
               <ProfilePage user={user} setUser={setUser} setRedirected={setRedirected}/>
               )
            }
           
            {
               subPage === 'bookings' && (
                       <BookingList/>
               )  
            }
             {
               subPage === 'places' &&  (
                    <LocationPages/>
                )
            }

         </>
  )
}

export default AccountPage
