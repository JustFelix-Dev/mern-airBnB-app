import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ImEyePlus } from 'react-icons/im';
import { SlCloudUpload } from 'react-icons/sl';

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
                        <label htmlFor="perks">Perks:</label>
                        
                    </form>
                )
             }
           </>
  )
}

export default LocationPages
