import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const userContext = createContext({});

export function UserContextProvider({children}){
      const [ user,setUser ] = useState(null)
      const [ ready,setReady ] = useState(false)

      useEffect(()=>{
        async function fetchProfile(){
            try{
                if(!user){
               const res = await axios.get('/profile')
                    setUser(res.data)
                    setReady(true)
            }
            }
            catch(err){
                console.log(err)
            }
        }
        fetchProfile()
      },[user])

     
   return (
          <userContext.Provider value={{user,setUser,ready}}>
              {children}
          </userContext.Provider>
   );
}