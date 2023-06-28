import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const RegisterPage = () => {
  const [ name,setName ] = useState('');
  const [ email,setEmail ] = useState('');
  const [ password,setPassword ] = useState('');

  const handleForm=(e)=>{
       e.preventDefault()
       axios.get('/test')
  }

  return (
          <>
          <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
             <h1 className='text-4xl text-center mb-4'>Register</h1>
             <form className='max-w-md mx-auto'onSubmit={handleForm} >
                 <input type="text" placeholder='John Doe'
                        name='name'
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                        required
                  />
                <input type="email" placeholder='someone@gmail.com'
                       name='email'
                       value={email}
                       onChange={(e)=> setEmail(e.target.value)}
                       required
                />
                <input type="password" placeholder='password'
                       name='password'
                       value={password}
                       onChange={(e)=> setPassword(e.target.value)}
                       required
                />
                <button className='primary'>Register</button>
                <div className='text-center py-2 text-gray-400'>
                    Already have an account ? <Link className='text-black underline' to={'/login'}>Login here</Link>
                </div>
             </form>
           </div>
            </div>
          </>
  )
}

export default RegisterPage
