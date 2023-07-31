import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const OrderStatus = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [ order,setOrder] = useState(null);
  
    useEffect(()=>{
        axios.get(`/getOrder/${id}`).then((response)=>{
             console.log(response.data)
             setOrder(response.data)
        }).catch((err)=>{
            console.log(err.message)
        })
    },[id])

     const handlePrint=()=>{
        window.print()
        navigate('/account/bookings')
     }
    return ( 
           <>
             <div className=" w-[50%] relative shadow-2xl mx-auto px-8">
                <div>
                <span className="flex justify-center p-4"><svg width={80} height={80} fill="none" stroke="#FF385C" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path  stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg></span>
                <h1 className="py-2 border-b-2 text-center text-xl border-primary">Reservation Details</h1>
                </div>
                    {
                        order && (
                              <>
                              <div className="">
                              <img className="absolute opacity-10 max-w-[100%] -z-10 top-[30%] left-[30%]" height={200} width={200} src="/images/airbnb.png" alt="airbnb-logo" />

                          <span className="flex my-1 py-1 w-44 mx-auto rounded-xl bg-green-500 text-white font-semibold items-center justify-center">Status:<span>{order.status}</span></span>
                              <h1 className="text-xl pb-2 text-gray-900">Customer :</h1>
                              <div className="flex flex-col text-gray-700 border-b-2 pb-2 ">
                              <span className="flex justify-between">Full-Name: <span>{order.details[0].fullName}</span> </span>
                              <span className="flex justify-between">Country: <span>{order.country}</span></span>
                              <span className="flex justify-between">Phone-Number: <span>{order.details[0].mobile}</span></span>
                              <span className="flex justify-between">Email: <span>{order.email}</span></span>
                              </div>
                              <h1 className="text-xl pb-2 pt-2 text-gray-900">Payments:</h1>
                          <div className="flex flex-col text-gray-700 border-b-2 pb-2 ">
                          <span className="flex justify-between">Payment-Intent: <span>{order.paymentIntentId}</span></span>
                          <span className="flex justify-between">Payment-Status: <span>{order.payment_status}</span></span>
                          <span className="flex justify-between">Amount Paid: <span>${order.details[0].price}</span></span>
                          <span className="flex justify-between">Payment-Time: <span>{order.paymentTime}</span></span>
                          </div>
                            <h1 className="text-xl pb-2 pt-2 text-gray-900">Bookings:</h1>
                            <div className="flex flex-col text-gray-700 ">
                          <span className="flex justify-between">Booking Number:<span>{order.customerId}</span></span> 
                          <span className="flex justify-between">Booking Location: <span>{order.bookingPlace}</span> </span>
                          <span className="flex justify-between">Booking Address:<span>{order.bookingAddress}</span></span> 
                          <span className="flex justify-between">Guests: <span>{order.details[0].numOfGuests}</span></span>
                          <span className="flex justify-between">Check-In Time: <span>{order.details[0].checkIn}</span></span>
                          <span className="flex justify-between">Check-Out Time: <span>{order.details[0].checkOut}</span></span>
                            </div>
                         
                          <div className="flex my-2 justify-center">
                          <button onClick={handlePrint} className="bg-primary px-8 py-1 text-white font-medium my-2 rounded-md">Print</button>
                          </div>
                              </div>
                              </>
                        )
                    }
                <div>
                </div>
             </div>
           
           </>
     );
}
 
export default OrderStatus;