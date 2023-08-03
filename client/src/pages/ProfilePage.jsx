import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProfilePage = ({user,setUser,setRedirected}) => {
    const [ isLoading,setIsLoading ] = useState(false);
    const [ fetchOrders,setFetchedOrders ]  = useState(null);
    const date = new Date()
    const day = date.getDay()
    const dayList = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const id = user._id;

    useEffect(()=>{
         axios.get(`/getOrders/${id}`).then(({data})=>{
            console.log(data)
            setFetchedOrders(data)
         }).catch((err)=>{
          console.log(err.message)
         })
    },[])
    const logout =async()=>{
        setIsLoading(true)
        await axios.post('/logout')
        setUser(null)
        setRedirected(true)
        setIsLoading(false)
    }

    return ( 
             <>
             <div className=' w-[75%]  p-4 overflow-hidden
               shadow-2xl rounded-lg mx-auto' >
                <div className=" flex gap-10 p-4 border border-dashed border-primary overflow-hidden rounded-xl ">
              <div className='border-r border-primary pr-20' >
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
                <div className='grow'>
                     <h1 className='text-2xl font-bold'>Welcome back, <span className='text-primary'>{user.name}!</span></h1>
                     <div className='flex mt-4 items-center justify-between'>
                        <div className='flex flex-col gap-6'>
                           <div>
                          <h1 className='flex gap-1 items-center font-medium text-lg'>Badge<span className='text-gray-500'>(Bronze):</span> <Link to={'/'}><img src="/images/information-button.png" alt="infoButton" height={12} width={12}/></Link> </h1>
                          <img src={'/images/bronze-badge.png'} alt="badgeIcon" width={50} height={50} />
                           </div>
                           <div>
                            <h1 className='flex items-center gap-1 text-lg font-medium'>My Points:<Link to={'/'}><img src="/images/information-button.png" alt="infoButton" height={12} width={12}/></Link></h1>
                            <span>{"0/500"}</span> <span className='text-gray-700'>points</span> 
                            <div className='mt-2' >
                            <progress className='custom-progress' value={'20'} max={'100'} ></progress>
                            </div>
                           </div>
                           <div>
                            <h1 className='bg-gray-100 py-1 px-2 text-primary rounded-md border border-primary'>Recent Reservations:</h1>
                           </div>
                        </div>
                        <div className='bg-primary font-medium self-start text-white py-1 px-4 rounded-md'>{dayList[day]}</div>
                     </div>
                </div>

                </div>
             </div>
             </>
     );
}
 
export default ProfilePage;