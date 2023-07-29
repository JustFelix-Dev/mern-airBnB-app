import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderStatus = () => {
    const {id} = useParams();
    const [ order,setOrder] = useState(null);
  
    useEffect(()=>{
        axios.get(`/getOrder/${id}`).then((response)=>{
             console.log(response.data)
             setOrder(response.data)
        }).catch((err)=>{
            console.log(err.message)
        })
    })

    return ( 
           <>
             <div>
                <div>
                <span>

                </span>
                <h1>Reservation Details</h1>
                </div>
                <div>

                </div>
             </div>
           
           </>
     );
}
 
export default OrderStatus;