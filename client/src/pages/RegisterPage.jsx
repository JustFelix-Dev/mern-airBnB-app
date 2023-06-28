import React from 'react'
import { Link } from 'react-router-dom'

const RegisterPage = () => {
  return (
          <>
          <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
             <h1 className='text-4xl text-center mb-4'>Register</h1>
             <form className='max-w-md mx-auto' >
                 <input type="text" placeholder='John Doe' />
                <input type="email" placeholder='someone@gmail.com' />
                <input type="password" placeholder='password' />
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
