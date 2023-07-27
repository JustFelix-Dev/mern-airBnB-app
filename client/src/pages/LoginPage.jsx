import axios from 'axios';
import React, { useContext, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../ContextHook/userContext';

const LoginPage = () => {
    const [ email,setEmail ] = useState('');
    const [ password,setPassword ] = useState('');
    const navigate = useNavigate();
    const [ isLoading,setIsLoading ] = useState(false);
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
      setIsLoading(true)
        e.preventDefault()
        const body = { email,password }
        try{
          const response = await axios.post('login',body)
          console.log(response)
            setUser(response.data)
            navigate('/')
            setIsLoading(false)
        }
        catch(err){
            console.log(err.message)
        }
    }
  return (
         <>
           <div className="mt-4 grow flex items-center justify-around">
            <div className="mt-8 shadow-2xl border-t-2 border-primary  py-1 px-6 rounded-2xl">
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
                <button className='primary'>{ isLoading ? 
                        (<div className="newtons-cradle">
                        <div className="newtons-cradle__dot"></div>
                        <div className="newtons-cradle__dot"></div>
                        <div className="newtons-cradle__dot"></div>
                        <div className="newtons-cradle__dot"></div>
                        </div>) : (<div className='flex items-center justify-center gap-1'><span>Login</span><span><svg fill="none" width={20} height={20} stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"></path>
                      </svg></span></div>)
                }</button>
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
