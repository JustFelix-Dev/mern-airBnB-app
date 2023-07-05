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

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

function App() {

  return (
        <>
        <UserContextProvider>
        <Routes>
          <Route path='/' element={<LayoutPage/>}>
          <Route index element={<IndexPage/>}/>
          <Route path='login' element={<LoginPage/>}/>
          <Route path='register' element={<RegisterPage/>}/>
          <Route path='account/:subPage?' element={<AccountPage/>}/> 
          <Route path='account/:subPage/:id' element={<AccountPage/>}/>
          </Route>
        </Routes>
        </UserContextProvider>
        </>
  )
}

export default App
