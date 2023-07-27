import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SlCloudUpload } from 'react-icons/sl';
import {toast} from 'react-toastify';

const RegisterPage = () => {
  const [ name,setName ] = useState('');
  const [ email,setEmail ] = useState('');
  const [ password,setPassword ] = useState('');
  const [ photo,setPhoto] = useState('');
  const [ isLoading,setIsLoading ] = useState(false);
  const navigate = useNavigate();
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
    setIsLoading(true)
    window.open('http://localhost:8000/auth/google','_self')
}
const handleGithub = ()=>{
    window.open('http://localhost:8000/auth/github','_self')
}
const uploadPhoto = (e) => {
  e.preventDefault();
  const file = e.target.files[0];
  const data = new FormData();
  data.append('photo', file);

  axios
    .post('/userPhoto', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((response) => {
      const { data: { photo } } = response;
      // Update the state with the photo path
      setPhoto(photo);
      console.log(photo);
    })
    .catch((error) => {
      console.error('Error uploading photo:', error);
    });
};

  const handleForm=async(e)=>{
         setIsLoading(true)
       e.preventDefault()
       try{
         await axios.post('/register',{
              name,email,password,photo
          }).then((res)=>{
           toast.success('Check your e-mail for login details!')
            navigate('/login')
            setIsLoading(false)
          })
       }
       catch(err){
        console.log(err)
       }
  }

  return (
          <>
          <div className="grow flex mt-8  items-center justify-around">
            <div className="shadow-2xl border-t-2 border-primary  py-1 px-6 rounded-2xl">
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
                 <label className='my-2 bg-transparent cursor-pointer flex justify-center items-center gap-2 border border-gray-200 rounded-lg text-xl p-2'>
                      <input type="file" className='hidden' onChange={uploadPhoto} required/>
                      {
                      photo && photo.length > 0 ? 
                          <img src={"http://localhost:8000/userPhoto/" + photo} alt="userPhoto" width={30} height={30} style={{borderRadius:'10px'}} />
                         : <><SlCloudUpload/>Upload</>
                      }
                        </label>
                <button className='primary'>{ isLoading ?
                 (<div className="newtons-cradle">
                  <div className="newtons-cradle__dot"></div>
                  <div className="newtons-cradle__dot"></div>
                  <div className="newtons-cradle__dot"></div>
                  <div className="newtons-cradle__dot"></div>
                  </div>):(<div className='flex items-center gap-1 justify-center'><span>SignUp</span><span><svg fill="none" width={20} height={20} stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"></path>
                </svg></span></div>)}</button>
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
