import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ImEyePlus } from 'react-icons/im';
import { SlCloudUpload } from 'react-icons/sl';
import axios from 'axios';
import Perks from '../components/Perks';

const LocationPages = () => {
    const { id } = useParams();
    const [ title,setTitle ] = useState('');
    const [ address,setAddress ] = useState('');
    const [ photos,setPhotos ] = useState([]);
    const [ photoLink,setPhotoLink ] = useState('');
    const [ description,setDescription ] = useState('');
    const [ perks,setPerks ] = useState([]);
    const [ extraInfo,setExtraInfo ] = useState('');
    const [ checkIn,setCheckIn ] = useState('');
    const [ checkOut,setCheckOut ] = useState('');
    const [ maxGuests,setMaxGuests] = useState(1);
    const [ fetchedPlaces,setFetchedPlaces ] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get('/places').then(({data})=>{
            setFetchedPlaces(data)
        })
    },[])


  const addPhotoByLink=async(e)=>{
           e.preventDefault()
        const {data:filename} = await axios.post('/uploadByLink',{link : photoLink})
         setPhotos(prev=>{
            return [...prev,filename]
         })
           setPhotoLink('')
    }

    const uploadFile=(e)=>{
        e.preventDefault()
        const files = e.target.files;
        const data = new FormData();
        for(let i=0;i < files.length; i++){
             data.append('photos',files[i])
        }
        axios.post('/upload',data,{
            headers: {'Content-Type':'multipart/form-data'}
        }).then(response=>{
               const {data:filename} = response;
               setPhotos(prev=>{
                return [...prev,...filename]
             })
        })
    }

    const handleFormPlaces=async(e)=>{
          e.preventDefault()
          const formBody={
                       title,address,photos,
                       photoLink,description,perks,
                       extraInfo,checkIn,checkOut,maxGuests
                         }

      const {data} = await axios.post('/places',formBody)
                 navigate('/account/places')
    }

  return (
           <>
             { id !== 'new' && (
                <div className="text-center">
                <Link to={'/account/places/new'} className='inline-flex items-center gap-1 bg-primary text-black py-2 px-4 rounded-lg'><ImEyePlus/>Add a New Place</Link>
                 <div>
                    {fetchedPlaces.length > 0 &&  fetchedPlaces.map(place=>(
                        <div className="flex gap-3 bg-gray-100 p-3">
                            <div className='w-32 h-32 bg-gray-300 grow shrink-0'>
                             { place.photos.length > 0 && (
                                  <img src={place.photos[0]} alt='displayIcon'/>
                             ) }
                            </div>
                            <div className='grow-0 shrink'>
                                <h2 className='text-xl'>{place.title}</h2>
                                <p className='text-sm mt-2'>{place.description}</p>
                            </div>
                        </div>
                    ))}
                 </div>
             </div>
             )
             }
             { id == 'new' && (
                    <form onSubmit={handleFormPlaces}>
                        <label htmlFor="title">Title:</label>
                        <input type="text" value={title}
                         onChange={(e)=>setTitle(e.target.value)} 
                         placeholder='Enter a New Place'/>

                        <label htmlFor="address">Address:</label>
                        <input type="text" value={address} 
                        onChange={(e)=>setAddress(e.target.value)} 
                        placeholder='New address'/>

                        <label htmlFor="photo">Photos:</label>
                        <div className='flex'>
                            <input type="text" value={photoLink}
                             onChange={(e)=>setPhotoLink(e.target.value)} 
                             placeholder='Add using a link'/>
                            <button onClick={addPhotoByLink} className='bg-primary'>Add&nbsp;Photo</button>
                        </div>

                        <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            {
                              photos.length > 0 && photos.map(link=>(
                                <div className='h-32 flex' key={link}>
                                    <img className=' w-full object-center rounded-2xl' src={'http://localhost:8000/uploads/'+ link} alt="icon" />
                                </div>
                              ))
                            }
                            <label className='h-32 bg-transparent cursor-pointer flex justify-center items-center gap-2 border border-gray-200 rounded-lg text-xl p-2'>
                                <input type="file" multiple className='hidden' onChange={uploadFile}/>
                                <SlCloudUpload/>Upload</label>
                        </div>
                        <label htmlFor="description">Description:</label>
                        <textarea name="" id="" cols="30" rows="10" 
                        placeholder='Enter your description...'
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                        ></textarea>
                           <Perks selected={perks} onChange={setPerks}/>
                           <label htmlFor="extraInfo">Other Informations:</label>
                             <textarea name="extraInfo" id="extraInfo" 
                             cols="30" rows="10"
                             value={extraInfo}
                             onChange={(e)=>setExtraInfo(e.target.value)}
                             ></textarea>
                             <label htmlFor="check">Check In & Check Out:</label>
                                <div className='grid sm:grid-cols-3'>
                                    <div>
                                    <label htmlFor="checkIn">Check In:</label>
                                     <input type="text" name='checkIn'
                                      id='checkIn' placeholder='e.g,04:00'
                                       value={checkIn}
                                       onChange={(e)=>setCheckIn(e.target.value)}
                                      />
                                    </div>
                                    <div>
                                     <label htmlFor="checkOut">Check Out:</label>
                                     <input type="text" name='checkOut' 
                                     id='checkOut' placeholder='e.g,11:00'
                                     value={checkOut}
                                     onChange={(e)=>setCheckOut(e.target.value)}
                                     />
                                    </div>
                                    <div>
                                     <label htmlFor="guest">Max Guests:</label>
                                     <input type="number" min='1' 
                                     inputMode='numeric' step='1'
                                      name='guest'
                                      value={maxGuests}
                                      onChange={(e)=>setMaxGuests(e.target.value)}
                                       />
                                    </div>
                                </div>
                                <button className='bg-primary text-white rounded-lg p-2 my-3 w-full' >Save</button>
                             </form>
                )
             }
           </>
  )
}

export default LocationPages
