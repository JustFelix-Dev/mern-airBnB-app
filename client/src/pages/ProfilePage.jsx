import axios from 'axios';

const ProfilePage = ({user,setUser,setRedirected}) => {

    const logout =async()=>{
        await axios.post('/logout')
        setUser(null)
        setRedirected(true)
    }

    return ( 
             <>
              <div className="text-center max-w-lg mx-auto">
                  <div>
                    <img src={user?.photo} alt="" width={300} height={300} style={{borderRadius:'30%',boxShadow:' 0px 4px 5px #ccc'}} />
                  </div>
                    Logged In as {user?.name} ({user?.email})<br/>
                    <button onClick={logout} className='primary max-w-sm mt-2'>Logout</button>
                </div>
             </>
     );
}
 
export default ProfilePage;