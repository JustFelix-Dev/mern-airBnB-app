import React from 'react'

const BookingWidget = ({place}) => {
  return (
          <>
           <div className="bg-white shadow p-4 rounded-2xl">
                        <p className='text-2xl text-center'>Price : ${place.price}/per night</p>
                        <div className="border rounded-2xl mt-4">
                        <div className="flex">
                        <div className=' py-3 px-4'>
                            <label htmlFor="checkIn">Check-In:</label>
                            <input type="date" />
                        </div>
                        <div className=' py-3 px-4 border-l'>
                            <label htmlFor="checkOut">Check-Out:</label>
                            <input type="date" />
                        </div>
                            </div>
                        <div className=' py-3 px-4 border-t'>
                            <label htmlFor="guests">Number of Guests:</label>
                            <input type="number" />
                        </div>
                        </div>
                        <button className="primary">Book this place</button>
                    </div>
          </>
  )
}

export default BookingWidget
