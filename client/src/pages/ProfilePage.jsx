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
                    <img src={`http://localhost:8000/userPhoto${user?.photo}`|| user?.photo} alt="" width={300} height={300} style={{borderRadius:'30px'}} />
                  </div>
                    Logged In as {user?.name} ({user?.email})<br/>
                    <button onClick={logout} className='primary max-w-sm mt-2'>Logout</button>
                </div>
             </>
     );
}
 
export default ProfilePage;