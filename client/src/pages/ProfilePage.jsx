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
                  <img
                        src={
                          user && user.photo
                            ? user.photo.startsWith('https://')
                              ? user.photo
                              : `http://localhost:8000/userPhoto/${user.photo}` 
                               : 'images/svgexport-7.svg'
                        }
                        alt="userIcon"
                        height={300}
                        width={300}
                        style={{ borderRadius: '20px' }}
                      />
                  </div>
                    Logged In as {user?.name} ({user?.email})<br/>
                    <button onClick={logout} className='primary max-w-sm mt-2'>Logout</button>
                </div>
             </>
     );
}
 
export default ProfilePage;