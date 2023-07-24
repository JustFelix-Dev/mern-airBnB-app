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
        const getUser = () => {
            fetch("http://localhost:8000/auth/login/success", {
              method: "GET",
              credentials: "include",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
              },
            })
              .then((response) => {
                if (response.status === 200) return response.json();
                throw new Error("authentication has been failed!");
              })
              .then((resObject) => {
                const {user} = resObject;
               const {displayName,emails} = user;
               console.log(displayName,emails)
                setUser({displayName,emails});
                console.log(user)
              })
              .catch((err) => {
                console.log(err);
              });
          };
          getUser();
        fetchProfile()
      },[])
      console.log(user);
   return (
          <userContext.Provider value={{user,setUser,ready}}>
              {children}
          </userContext.Provider>
   );
}