import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const IndexPage = () => {
     const [ allPlaces,setAllPlaces ] = useState([])
  useEffect(()=>{
      axios.get('/allPlaces')
      .then(response=>{
        setAllPlaces([...response.data,...response.data,...response.data,...response.data,...response.data,...response.data,...response.data,...response.data,...response.data,...response.data,...response.data,...response.data,...response.data,...response.data,...response.data,...response.data,...response.data,...response.data,...response.data,...response.data,...response.data,...response.data,...response.data,...response.data])
      })
  },[])
  return (
         <>
           <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {allPlaces.length > 0 && allPlaces.map((place,idx) => (
         <Link key={idx} to={'/place/'+place._id}>
          <div className="bg-gray-500 mb-2 rounded-2xl flex">
            {place.photos?.[0] && (
              <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:8000/uploads/'+place.photos?.[0]} alt=""/>
            )}
          </div>
          <h2 className="font-bold truncate">{place.address}</h2>
          <h3 className="text-sm text-gray-500">{place.title}</h3>
          <div className="mt-1">
            <span className="font-bold">${place.price}</span> per night
          </div>
        </Link>
      ))}
    </div>
         </>
  )
}

export default IndexPage
