import React, { useState } from 'react';
import { differenceInCalendarDays, format } from 'date-fns';
import { FcCalendar } from 'react-icons/fc';
import { FaTrash } from 'react-icons/fa';
import { MdModeNight } from 'react-icons/md';
import { FcCancel } from 'react-icons/fc';
import { BsFillPatchCheckFill,BsPeopleFill } from 'react-icons/bs';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const BookingPayment = ({ booking }) => {
  // Custom format string: 'd EEE,MMMM yyyy'
  const formattedCheckInDate = format(new Date(booking.checkIn), 'd EEE,MMMM yyyy');
  const formattedCheckOutDate = format(new Date(booking.checkOut), 'd EEE,MMMM yyyy');
  const [ isModal,setIsModal ] = useState(false);
  const [ order,setOrder ] = useState(false);
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('');


  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    handleCheckOut(event.target.value,{booking});
  };

  const handleCheckOut=(option,{booking})=>{
          axios.post('/create-checkout-session',{booking,option})
          .then((res)=>{
            if(res.data.url){
                window.location.href = res.data.url;
                console.log(option)
                console.log(booking)
            }
          })
          .catch((err)=>{
            console.log(err.message)
          })
  }

    const handleDelete=(id)=>{
          axios.delete(`/deleteBooking/${id}`).then((res)=>{
            console.log("Successfully deleted the reservation");
            navigate('/account/bookings')
          }).catch((err)=>{
            console.log('Something went wrong!')
          })
    }
    const handleOrder=(id)=>{
        axios.delete(`/deleteOrder/${id}`).then((res)=>{
          console.log('Reservation Cancelled Successfully!')
          navigate('/account/bookings')
        }).catch((err)=>{
          console.log('Something went wrong!')
        })
    }

    const openModal = ()=>{
         setIsModal(true)
      bodyPage.style.pointerEvents = 'none';
    }
    const closeModal = ()=>{
      setIsModal(false)
      bodyPage.style.pointerEvents = 'auto';
      // document.documentElement.style.pointerEvents = 'auto';


    }
  return (
    <>
         { booking && isModal && <div id='myModal'  className='modal-confirm w-[31%] bg-white text-black fixed flex items-center py-8 px-4 rounded-2xl text-center z-10 top-[15%] left-[35%] right-[35%] border border-primary'>
            <div  >
            <p className='text-xl'> {order ?'Are you sure you want to cancel this reservation ?':'Are you sure you want to delete this booking ?'}</p>
               <div className='flex justify-between mt-4'>
                <button onClick={closeModal} className='bg-white flex items-center gap-1 text-primary border border-primary py-1 px-4'> <span>Cancel</span></button>
                <button onClick={ order ? ()=>handleOrder(booking._id) : ()=>handleDelete(booking._id)} className='bg-green-800 text-white border border-white py-1 px-4'>Proceed</button>
               </div>
            </div>
          </div>}
      <div id='bodyPage' className='bg-gray-200 text-black p-3 rounded-xl'>
        <div className=' flex justify-between gap-2 border-t border-white-300 mt-2 py-2'>
            <div className='flex flex-col gap-1'>
          <div >
            <h1 className='underline  px-2 rounded-sm text-black my-1'>Check-In Date:</h1>
            <div className='flex gap-2 items-center'>
            <FcCalendar /> {formattedCheckInDate} 
            </div>
          </div>
          <div >
          <h1 className='underline px-2 rounded-sm text-black my-1'>Check-Out Date:</h1>
          <div className='flex gap-2 items-center'>
            <FcCalendar /> {formattedCheckOutDate}
          </div>
          </div>
          <div >
            <h1 className='underline px-2 rounded-sm text-black my-1'>Number of Guests:</h1>
            <div className='flex items-center gap-2'>
            <BsPeopleFill/>{booking.numOfGuests}
            </div>
        </div>
           <div >
            <h1 className='underline px-2 rounded-sm text-black my-1'>Number of Nights:</h1>
            <div className='flex items-center gap-2'>
            <MdModeNight/>
          <p>{differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} night(s)</p> 
            </div>
          {/* Price: ${booking.price} */}
        </div>
            </div>
            <div className='flex flex-col items-center justify-between'>
                <h1>Total Price: <span className='text-2xl font-medium'>${booking.price}</span></h1>
                <div>
                  {
                    booking.status && booking.status == "Paid" ?
                     (<div className='flex flex-col gap-2'><Link to={`/order-status/${booking._id}`}  className='bg-green-800 flex items-center gap-1 px-4 py-1 text-white rounded-md'>
                      View Reservation<BsFillPatchCheckFill/></Link><button onClick={()=>{openModal();setOrder(true)}} className='flex items-center gap-1 bg-gray-100 text-primary py-1 px-4 border border-primary rounded-lg justify-center items-center'>Cancel Reservation<FcCancel/></button></div>) 
                      :
                       (<div className='flex flex-col gap-2'>
                        <select onChange={handleSelectChange} value={selectedOption} className='bg-primary  px-4 py-1 text-white rounded-xs'>
                        <option disabled selected className='bg-white text-primary' value={''} >Proceed to Payment</option>
                          <option  className='bg-white text-primary' value="direct">Proceed Directly</option>
                          <option  className='bg-white text-primary'  value="point">Proceed With Points</option>
                          </select>
                          <button onClick={openModal} className='flex bg-white  items-center gap-2 justify-center p-2'>Delete Booking <FaTrash/></button></div>)
                  }
                </div>
                
            </div>
        </div>
      </div>
    </>
  );
}

export default BookingPayment;

