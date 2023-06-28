import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router-dom'
import IndexPage from './pages/IndexPage'

function App() {

  return (
        <>
        <Routes>
          <Route index element={<IndexPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
        </Routes>
         
        </>
  )
}

export default App
