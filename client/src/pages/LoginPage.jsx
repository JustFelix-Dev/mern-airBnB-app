import axios from 'axios';
import React, { useContext, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../ContextHook/userContext';

const LoginPage = () => {
    const [ email,setEmail ] = useState('');
    const [ password,setPassword ] = useState('');
    const navigate = useNavigate();
    const {setUser} = useContext(userContext);
    const imageRef = useRef();
    const inputRef = useRef();
  
    const changeInputType=()=>{
         if(inputRef.current.type == "password"){
          inputRef.current.type = 'text';
          imageRef.current.src = '/images/eye-open.png';
        }else{
          inputRef.current.type='password';
          imageRef.current.src='/images/eye-close.png';
        }
    }

    const handleGoogle = ()=>{
      window.open('http://localhost:8000/auth/google','_self')
  }
  const handleGithub = ()=>{
      window.open('http://localhost:8000/auth/github','_self')
  }
   
    const handleForm=async(e)=>{
        e.preventDefault()
        const body = { email,password }
        try{
          const response = await axios.post('login',body)
          console.log(response)
            setUser(response.data)
            navigate('/')
        }
        catch(err){
            console.log(err.message)
        }
    }
  return (
         <>
           <div className="mt-4 grow flex items-center justify-around">
            <div className="mt-8">
             <h1 className='text-4xl text-center mb-4'>Login</h1>
             <form className='max-w-md mx-auto' onSubmit={handleForm}>
                <input type="email" placeholder='someone@gmail.com'
                       name='email'
                       value={email}
                       onChange={(e)=>setEmail(e.target.value)}
                       required
                />
                <div className='relative'>
                <input type="password" placeholder='password'
                       name='password'
                       value={password}
                       ref={inputRef}
                       onChange={(e)=> setPassword(e.target.value)}
                       required
                />
                      <div className='absolute top-[35%] right-3 opacity-50'>
                <img ref={imageRef} onClick={changeInputType} src="images/eye-close.png" alt="passwordIcon" height={25} width={25}/>
                      </div>
                 </div>
                <button className='primary'>Login</button>
                <div className='text-center py-2 text-gray-400'>
                    Don't have an account yet ? <Link className='text-black underline' to={'/register'}>Register here</Link>
                </div>
                   <div className='text-center'><Link className='text-black underline' to={'/forgotPassword'}>Forgot Password ?</Link></div>
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

export default LoginPage
