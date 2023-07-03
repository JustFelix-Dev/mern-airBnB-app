import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { ImEyePlus } from 'react-icons/im'

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
                        <input type="text"  />
                    </form>
                )
             }
           </>
  )
}

export default LocationPages
