import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const userContext = createContext({});

export function UserContextProvider({children}){
      const [ user,setUser ] = useState(null)

      useEffect(()=>{
        async function fetchProfile(){
            try{
                if(!user){
               const res = await axios.get('/profile')
                    setUser(res.data)
            }
            }
            catch(err){
                console.log(err)
            }
        }
        fetchProfile()
      },[])
   return (
          <userContext.Provider value={{user,setUser}}>
              {children}
          </userContext.Provider>
   );
}