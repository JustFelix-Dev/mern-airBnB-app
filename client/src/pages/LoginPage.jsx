import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const LoginPage = () => {
    const [ email,setEmail ] = useState('');
    const [ password,setPassword ] = useState('');
    const navigate = useNavigate()
   
    const handleForm=async(e)=>{
        e.preventDefault()
        const body = { email,password }
        try{
         await axios.post('login',body).then((res)=>{
            navigate('/')
        })
        }
        catch(err){
            console.log(err.message)
        }
    }
  return (
         <>
           <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
             <h1 className='text-4xl text-center mb-4'>Login</h1>
             <form className='max-w-md mx-auto' onSubmit={handleForm}>
                <input type="email" placeholder='someone@gmail.com'
                       name='email'
                       value={email}
                       onChange={(e)=>setEmail(e.target.value)}
                       required
                />
                <input type="password" placeholder='password'
                       name='password'
                       value={password}
                       onChange={(e)=> setPassword(e.target.value)}
                       required
                  />
                <button className='primary'>Login</button>
                <div className='text-center py-2 text-gray-400'>
                    Don't have an account yet ? <Link className='text-black underline' to={'/register'}>Register here</Link>
                </div>
             </form>
           </div>
            </div>
         </>
  )
}

export default LoginPage
