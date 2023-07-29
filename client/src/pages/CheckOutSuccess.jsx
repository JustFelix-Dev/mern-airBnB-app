import { motion } from "framer-motion";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { userContext } from "../ContextHook/userContext";

const CheckOutSuccess = () => {
    const {id} = useParams()
      
    return ( 
            <>
            <div className="w-full h-[70vh] flex items-center">
             <div className=" shadow-2xl text-center border-t-2 border-primary  p-8 max-w-2xl mx-auto ">
                <span className="flex justify-center p-4"><svg width={80} height={80} fill="none" stroke="green" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <motion.path initial={{opacity:0,scale:0.8,pathLength:0}} animate={{opacity:1,scale:1.1,pathLength:1}} transition={{duration:2,delay:0.5}} stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></motion.path>
                </svg></span>
                <h1 className="text-2xl p-1 font-medium">Reservation Completed Successfully!</h1>
                <p className="text-gray-700">Your reservation has been processed successfully and you would be able to print your payment receipt shortly. Please note that it takes a few minutes for this change to occur. </p>
                <p className="text-gray-500">An email confirmation would be sent to you shortly with your order details.</p>
                <Link to={`/order-status/${id}`}>
                <button className="bg-primary p-2 text-white rounded-lg mt-4">Check Order Status</button>
                </Link>
             </div>
            </div>
            </>
     );
}
 
export default CheckOutSuccess;