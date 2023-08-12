import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import LayoutPage from './pages/Layout/LayoutPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './ContextHook/userContext'
import AccountPage from './pages/AccountPage'
import PlacesDetail from './pages/PlacesDetail'
import BookingPlace from './pages/BookingPlace'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResetPassword from './pages/ResetPassword'
import CheckOutSuccess from './pages/CheckOutSuccess'
import OrderStatus from './components/OrderStatus'
import EditPlace from './pages/EditPlace'
import PoliciesPage from './pages/PoliciesPage'
import Chat from './components/Chat/Chat'

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

function App() {

  return (
        <>
        <UserContextProvider>
          <Chat/>
        <Routes>
          <Route path='/' element={<LayoutPage/>}>
          <Route index element={<IndexPage/>}/>
          <Route path='login' element={<LoginPage/>}/>
          <Route path='register' element={<RegisterPage/>}/>
          <Route path='account/bookings/:id' element={<BookingPlace/>}/>
          <Route path='account/:subPage?' element={<AccountPage/>}/> 
          <Route path='account/places/edit/:id' element={<EditPlace/>}/> 
          <Route path='account/:subPage/:id' element={<AccountPage/>}/>
          <Route path='place/:id' element={<PlacesDetail/>}/>
          <Route path='checkout-success/:id' element={<CheckOutSuccess/>}/>
          <Route path='order-status/:id' element={<OrderStatus/>}/>
          <Route path='/forgotPassword' element={<ResetPassword/>}/>
          <Route path='/airbnbPolicies' element={<PoliciesPage/>}/>
          </Route>
        </Routes>
        </UserContextProvider>
        <ToastContainer/>
        </>
  )
}

export default App
