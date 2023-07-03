import React from 'react';
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
                        <input type="text" placeholder='Enter a New Place'/>
                        <label htmlFor="address">Address:</label>
                        <input type="text" placeholder='New address'/>
                        <label htmlFor="photo">Photos:</label>
                        <div className='flex'>
                            <input type="text" placeholder='Add using a link'/>
                            <button className='bg-primary'>Add&nbsp;Photo</button>
                        </div>
                        <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            <button className='bg-transparent flex items-center gap-2 border border-gray-200 rounded-lg text-xl p-2'><SlCloudUpload/>Upload</button>
                        </div>
                        <label htmlFor="description">Description:</label>
                        <textarea name="" id="" cols="30" rows="10" placeholder='Enter your description...'></textarea>
                        <label htmlFor="perks">What your place has to Offer:</label>
                        <div>
                            <label htmlFor="">
                                <input type='checkbox' />
                                <AiOutlineWifi/>
                                <span>Wifi - 50Mbps</span>
                            </label>
                            <label htmlFor="">
                                <input type='checkbox' />
                                <FaUmbrellaBeach/>
                                <span>Beach Access</span>
                            </label>
                            <label htmlFor="">
                                <input type='checkbox' />
                                <BsPersonWorkspace/>
                                <span>Dedicated Workspace</span>
                            </label>
                            <label htmlFor="">
                                <input type='checkbox' />
                                <AiFillCar/>
                                <span>Free Parking</span>
                            </label>
                            <label htmlFor="">
                                <input type='checkbox' />
                                <LuDog/>
                                <span>Pets</span>
                            </label>
                            <label htmlFor="">
                                <input type='checkbox' />
                                <PiTelevisionSimple/>
                                <span>TV with standard cables</span>
                            </label>
                            <label htmlFor="">
                                <input type='checkbox' />
                                <SiPrivateinternetaccess/>
                                <span>Private Entrance</span>
                            </label>
                            <label htmlFor="">
                                <input type='checkbox' />
                                <CgGym/>
                                <span>Gym</span>
                            </label>
                            <label htmlFor="">
                                <input type='checkbox' />
                                <MdOutlineLocalLaundryService/>
                                <span>Paid laundry</span>
                            </label>
                        </div>
                    </form>
                )
             }
           </>
  )
}

export default LocationPages
