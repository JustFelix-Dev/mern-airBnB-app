import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const RegisterPage = () => {
  const [ name,setName ] = useState('');
  const [ email,setEmail ] = useState('');
  const [ password,setPassword ] = useState('');
  const navigate = useNavigate();

  const handleGoogle = ()=>{
    window.open('http://localhost:8000/auth/google','_self')
}
const handleGithub = ()=>{
    window.open('http://localhost:8000/auth/github','_self')
}
// const handlefacebook= ()=>{
//     window.open('http://localhost:8000/auth/facebook','_self')
// }

  const handleForm=async(e)=>{
       e.preventDefault()
       try{
         await axios.post('/register',{
              name,email,password
          }).then((res)=>{
            console.log(res.data)
            navigate('/login')
          })

       }
       catch(err){
        console.log(err)
       }
  }

  return (
          <>
          <div className="grow flex mt-10 items-center justify-around">
            <div className="">
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
              <div >
                <div className='flex items-center gap-2 justify-center'>
                <hr className='w-40' /> <span>OR </span> <hr className='w-40' />
                </div>
                <div>
                <div onClick={handleGoogle} className="google my-4 border border-primary rounded-xl text-lg cursor-pointer p-2 flex justify-center items-center gap-2">
                      <img src="/images/google.png" alt="googleIcon" width={30} height={30} />
                  <span>Continue With Google</span>
                </div>
                <div onClick={handleGithub} className="github my-4 border border-primary rounded-xl text-lg cursor-pointer p-2 flex justify-center items-center gap-2 ">
                     <img src="/images/github.png" alt="githubIcon" width={30} height={30} />
                     <span>Continue With GitHub</span>
                </div>
                </div>
              </div>
           </div>
            </div>
          </>
  )
}

export default RegisterPage
