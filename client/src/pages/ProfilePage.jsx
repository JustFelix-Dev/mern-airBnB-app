import axios from 'axios';
import { useState } from 'react';

const ProfilePage = ({user,setUser,setRedirected}) => {
    const [ isLoading,setIsLoading ] = useState(false);

    const logout =async()=>{
        setIsLoading(true)
        await axios.post('/logout')
        setUser(null)
        setRedirected(true)
        setIsLoading(false)
    }

    return ( 
             <>
             <div className='text-center max-w-lg  p-4 overflow-hidden
               shadow-2xl rounded-lg mx-auto' >
              <div className=" border border-dashed border-primary overflow-hidden rounded-xl ">
                  <div className='flex justify-center p-4'>
                  <img 
                        src={
                          user && user.photo
                            ? user.photo.startsWith('https://')
                              ? user.photo
                              : `http://localhost:8000/userPhoto/${user.photo}` 
                               : 'images/svgexport-7.svg'
                        }
                        alt="userIcon"
                        height={150}
                        width={150}
                        style={{ borderRadius: '50%' }}
                      />
                  </div>{
                        user && (
                                <div className='text-left p-4 leading-8 bg-white rounded-t-3xl font-semibold'>
                                    <h2>Basic Information:</h2>
                                    {user.admin &&(<div className='bg-primary rounded-lg text-white text-sm py-1 max-w-[5rem] select-none px-4'>Admin</div>)}
                                     <div><span>Name: </span>{user.name}</div>
                                     <div><span>Email: </span>{user.email}</div>
                                     <div className='flex items-center gap-2 status'><span>Status : Active</span><div className='activeIcon'></div></div>
                                     <button onClick={logout} className='primary flex items-center gap-1 justify-center max-w-sm mt-2'> {isLoading ? (<div className="newtons-cradle">
                                    <div className="newtons-cradle__dot"></div>
                                    <div className="newtons-cradle__dot"></div>
                                    <div className="newtons-cradle__dot"></div>
                                    <div className="newtons-cradle__dot"></div>
                                    </div>):(<div className='flex items-center gap-1'><span>Logout</span><span><svg width='20' height='20' fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"></path>
                                    </svg></span></div>)} </button>
                                </div>
                            
                        )
                    }
                </div>
             </div>
             </>
     );
}
 
export default ProfilePage;