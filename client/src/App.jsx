import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import LayoutPage from './pages/Layout/LayoutPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000'

function App() {

  return (
        <>
        <Routes>
          <Route path='/' element={<LayoutPage/>}>
          <Route index element={<IndexPage/>}/>
          <Route path='login' element={<LoginPage/>}/>
          <Route path='register' element={<RegisterPage/>}/>
          </Route>
        </Routes>
         
        </>
  )
}

export default App
