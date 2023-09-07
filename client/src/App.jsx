import { useContext, useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import IndexPage from './pages/IndexPage'
import LayoutPage from './pages/Layout/LayoutPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AccountPage from './pages/AccountPage'
import PlacesDetail from './pages/PlacesDetail'
import BookingPlace from './pages/BookingPlace'
import ResetPassword from './pages/ResetPassword'
import CheckOutSuccess from './pages/CheckOutSuccess'
import OrderStatus from './components/OrderStatus'
import EditPlace from './pages/EditPlace'
import PoliciesPage from './pages/PoliciesPage'
import Chat from './components/Chat/Chat'
import { UserContextProvider, userContext } from './ContextHook/userContext';
import { ChatContextProvider } from './ContextHook/chatContext'
import FAQAccordion from './pages/FAQAccordion';
import { PlaceContextProvider } from './ContextHook/placeContext';


axios.defaults.baseURL = 'https://www.airbnb-server.felixdev.com.ng';
axios.defaults.withCredentials = true;

function App() {
  const [ user,setUser ] = useState(null)

  useEffect(()=>{
    if('serviceWorker' in navigator){
      window.addEventListener('load',()=>{
        navigator.serviceWorker.register('/sw.js')
        .then((registration)=>{
           console.log('SW registered: ' , registration);
        })
        .catch(registrationError =>{
          console.log('SW registration failed: ' , registrationError);
        })
      })

    }
  },[])

  useEffect(()=>{
    async function fetchProfile(){
        try{
            if(!user){
           const res = await axios.get('/profile')
                setUser(res.data)
        }
        }
        catch(err){
            console.log(err)
        }
    }
    fetchProfile();
  },[user])

  
  return (
        <>
        <UserContextProvider>
          <ChatContextProvider user={user}>
            <PlaceContextProvider>
          <Chat/>
        <Routes>
          <Route path='/' element={<LayoutPage/>}>
          <Route index element={<IndexPage/>}/>
          <Route path='login' element={ !user ? <LoginPage/> : <Navigate to={'/'}/>}/>
          <Route path='register' element={!user ?  <RegisterPage/> :<Navigate to={'/'}/>}/>
          <Route path='account/bookings/:id' element={user ? <BookingPlace/> :<Navigate to={'/login'}/> }/>
          <Route path='account/:subPage?' element={ user ? <AccountPage/> : <Navigate to={'/login'}/>}/> 
          <Route path='account/places/edit/:id' element={ user ? <EditPlace/> : <Navigate to={'/login'}/>}/> 
          <Route path='account/:subPage/:id' element={user ? <AccountPage/> : <Navigate to={'/login'}/>}/>
          <Route path='place/:id' element={<PlacesDetail/>}/>
          <Route path='checkout-success/:id' element={ user ? <CheckOutSuccess/> : <Navigate to={'/login'}/>}/>
          <Route path='order-status/:id' element={ user ? <OrderStatus/> : <Navigate to={'/login'}/>}/>
          <Route path='/forgotPassword' element={<ResetPassword/>}/>
          <Route path='/airbnbPolicies' element={<PoliciesPage/>}/>
          <Route path='/airbnb-faq' element={<FAQAccordion/>}/>
          <Route path='*' element={<Navigate to={'/'}/>}/>
          </Route>
        </Routes>
        </PlaceContextProvider>
        </ChatContextProvider>
        </UserContextProvider>
        <ToastContainer/>
        </>
  )
}

export default App
