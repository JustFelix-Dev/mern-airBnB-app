import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const PlacesDetail = () => {
    const {id} = useParams()

useEffect(()=>{
    if(!id)  return
      axios.get('/places/' + id).then(response=>{
           const {data} = response;
           console.log(data)
      }) 
},[id])
  return (
         <>
         <h2>Welcome to my Page! - {id}</h2>
         </>
  )
}

export default PlacesDetail
