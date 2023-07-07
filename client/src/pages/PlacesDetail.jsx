import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const PlacesDetail = () => {
    const {id} = useParams()
    const [ place,setPlace ] = useState(null)

useEffect(()=>{
    if(!id)  return
      axios.get('/places/' + id).then(response=>{
           const {data} = response;
           console.log(data)
           setPlace(data)

      }) 
},[id])
  return (
         <>

         </>
  )
}

export default PlacesDetail
