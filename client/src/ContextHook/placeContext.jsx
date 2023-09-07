import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";

export const PlaceContext = createContext();

export const PlaceContextProvider =({children})=>{
    const [ allPlaces,setAllPlaces ] = useState([]);
    const [ loading,setLoading] = useState(false);
    const [ error,setError ] = useState('');

    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          try {
            const res = await axios.get('/allPlaces');
            setAllPlaces(res.data);
          } catch (err) {
            setError(err);
          }
          setLoading(false);
        };
        fetchData();
      }, []);

      const handleFilter = useCallback(async(location,minValue,maxValue)=>{
              setLoading(true);
              try{
                const res = await axios.get(`/placesfiltered?place=${location}&leastPrice=${minValue}&highPrice=${maxValue}`)
                setAllPlaces(res.data)
              }catch(err){
                console.log(err)
                setError(err.response.data)
              }
              setLoading(false);
      },[])


    return (
        <PlaceContext.Provider value={{ allPlaces,handleFilter ,error,loading }}>
            {children}
        </PlaceContext.Provider>
    )
}
