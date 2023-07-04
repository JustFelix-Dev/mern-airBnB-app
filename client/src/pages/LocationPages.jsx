import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ImEyePlus } from 'react-icons/im';
import { SlCloudUpload } from 'react-icons/sl';
import { SiPrivateinternetaccess } from 'react-icons/si';
import { AiOutlineWifi,AiFillCar } from 'react-icons/ai';
import { FaUmbrellaBeach } from 'react-icons/fa';
import { BsPersonWorkspace } from 'react-icons/bs';
import { LuDog } from 'react-icons/lu';
import { PiTelevisionSimple } from 'react-icons/pi';
import { CgGym } from 'react-icons/cg';
import { MdOutlineLocalLaundryService } from 'react-icons/md';

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

  return (
           <>
             { id !== 'new' && (
                <div className="text-center">
                <Link to={'/account/places/new'} className='inline-flex items-center gap-1 bg-primary text-black py-2 px-4 rounded-lg'><ImEyePlus/>Add a New Place</Link>
             </div>
             )
             }
             { id == 'new' && (
                    <form>
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
                            <button className='bg-primary'>Add&nbsp;Photo</button>
                        </div>

                        <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            <button className='bg-transparent flex items-center gap-2 border border-gray-200 rounded-lg text-xl p-2'><SlCloudUpload/>Upload</button>
                        </div>
                        <label htmlFor="description">Description:</label>
                        <textarea name="" id="" cols="30" rows="10" 
                        placeholder='Enter your description...'
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                        ></textarea>
                        <label htmlFor="perks">What your place has to Offer:</label>
                        <div className='grid grid-cols-3 gap-3 mx-auto max-w-6xl'>
                            <label className='flex gap-2 items-center p-3 border border-gray-400 cursor-pointer'  htmlFor="">
                                <input type='checkbox' />
                                <AiOutlineWifi/>
                                <span>Wifi - 50Mbps</span>
                            </label>
                            <label className='flex gap-2 items-center p-3 border border-gray-400 cursor-pointer' htmlFor="">
                                <input type='checkbox' />
                                <FaUmbrellaBeach/>
                                <span>Beach Access</span>
                            </label>
                            <label className='flex gap-2 items-center p-3 border border-gray-400 cursor-pointer' htmlFor="">
                                <input type='checkbox' />
                                <BsPersonWorkspace/>
                                <span>Dedicated Workspace</span>
                            </label>
                            <label className='flex gap-2 items-center p-3 border border-gray-400 cursor-pointer' htmlFor="">
                                <input type='checkbox' />
                                <AiFillCar/>
                                <span>Free Parking</span>
                            </label>
                            <label className='flex gap-2 items-center p-3 border border-gray-400 cursor-pointer' htmlFor="">
                                <input type='checkbox' />
                                <LuDog/>
                                <span>Pets</span>
                            </label>
                            <label className='flex gap-2 items-center p-3 border border-gray-400 cursor-pointer' htmlFor="">
                                <input type='checkbox' />
                                <PiTelevisionSimple/>
                                <span>TV with standard cables</span>
                            </label>
                            <label className='flex gap-2 items-center p-3 border border-gray-400 cursor-pointer' htmlFor="">
                                <input type='checkbox' />
                                <SiPrivateinternetaccess/>
                                <span>Private Entrance</span>
                            </label>
                            <label className='flex gap-2 items-center p-3 border border-gray-400 cursor-pointer' htmlFor="">
                                <input type='checkbox' />
                                <CgGym/>
                                <span>Gym</span>
                            </label>
                            <label className='flex gap-2 items-center p-3 border border-gray-400 cursor-pointer' htmlFor="">
                                <input type='checkbox' />
                                <MdOutlineLocalLaundryService/>
                                <span>Paid laundry</span>
                            </label>
                        </div>
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
