import { motion } from "framer-motion";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { userContext } from "../ContextHook/userContext";

const CheckOutSuccess = () => {
    const {id} = useParams()
      
    return ( 
            <>
            <div className="w-full h-[70vh] flex items-center">
             <motion.div initial={{y:50,opacity:0}} animate={{y:0,opacity:1}} className=" mx-6 shadow-2xl text-center border-t-2 border-primary  p-8 max-w-2xl sm:mx-auto ">
                <span className="flex justify-center p-4"><svg className=" w-[50px] h-[50px] sm:w-[80px] h-[80px]" fill="none" stroke="green" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <motion.path initial={{opacity:0,scale:0.8,pathLength:0}} animate={{opacity:1,scale:1.1,pathLength:1}} transition={{duration:2,delay:0.5}} stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></motion.path>
                </svg></span>
                <h1 className="text-lg sm:text-2xl p-1 font-medium">Reservation Completed Successfully!</h1>
                <p className="text-sm sm:text-base text-gray-700">Your reservation has been processed successfully and you would be able to print your payment receipt shortly. Please note that it takes a few minutes for this change to occur. </p>
                <p className="text-sm sm:text-base text-gray-500">An email confirmation would be sent to you shortly with your order details.</p>
                <Link to={`/order-status/${id}`}>
                <button className="bg-primary p-1 px-2 sm:p-2 sm:px-2 text-white rounded-lg mt-4">View Reservation</button>
                </Link>
             </motion.div>
            </div>
            </>
     );
}
 
export default CheckOutSuccess;