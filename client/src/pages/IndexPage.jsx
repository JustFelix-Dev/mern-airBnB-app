import axios from 'axios'
import React, { useEffect, useState } from 'react'

const IndexPage = () => {
     const [ allPlaces,setAllPlaces ] = useState([])
  useEffect(()=>{
      axios.get('/allPlaces')
      .then(response=>{
        setAllPlaces(response.data)
      })
  })
  return (
         <>
            <h1>
              AirBnb!!!
            </h1>
         </>
  )
}

export default IndexPage
