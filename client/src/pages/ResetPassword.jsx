import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const ResetPassword = () => {
    const [ email,setEmail ] = useState('')
    //  console.log(email)
    const handleSubmit=(e)=>{
        e.preventDefault();
       axios.post('/forgotPassword',{email})
       .then((data)=>{
          console.log(data, 'userRegister')
       })
    
    }
    return (  
            <>
              <div className="flex justify-center items-center min-h-[80vh] ">
              <div  className="border border-primary rounded-2xl shadow-xl p-8  w-[70%]">
                <h1 className=" flex text-lg justify-center gap-2 items-center mb-6 font-semibold"> <span>Forgot Password</span><svg fill="none" width={20} height={20} stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"></path>
                </svg></h1>
                <div className="flex gap-10 justify-center p-2">
                    <div >
                        <img src="images/forgotPassword.svg" alt="forgotPasswordImg" height={300} width={300}/>
                    </div>
                    <div >
                        <form onSubmit={handleSubmit}>
                            <h2>Enter your email and we'll send you a link to reset your password:</h2>
                            <input type="email" name="email"onChange={(e)=>setEmail(e.target.value)} placeholder="e.g,someone@example.com" />
                            <button className="primary">Submit</button>
                             <div className="text-center mt-4">
                            <Link to='/login' className="underline font-medium">Back to Login</Link>
                             </div>
                        </form>
                    </div>
                </div>
              </div>
              </div>
            </>
    );
}
 
export default ResetPassword;