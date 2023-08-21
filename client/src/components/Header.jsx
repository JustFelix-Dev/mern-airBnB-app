import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { userContext } from '../ContextHook/userContext';
import { motion } from 'framer-motion';
import { MdCalendarMonth,MdPlace } from 'react-icons/md';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import MultiRangeSlider from "multi-range-slider-react";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import axios from 'axios';
import { PlaceContext } from '../ContextHook/placeContext';


const Header = () => {
  const {user} = useContext(userContext);
  const { handleFilter } = useContext(PlaceContext);
  const path = useLocation();
  const [ location,setLocation ] = useState('');
  const [ openDate,setOpenDate ] = useState(false);
  const [ date, setDate ] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
      }
                          ]);
   const [ showSearch,setShowSearch ] = useState(false);
   const [minValue, set_minValue] = useState(100);
   const [maxValue, set_maxValue] = useState(1000);

   const handleInput = (e) => {
       set_minValue(e.minValue);
       set_maxValue(e.maxValue);
   };

    const handleDate = () =>{
      setOpenDate(!openDate)
    }
   const handleSearch = ()=>{
      setShowSearch(!showSearch)
   }
   const handleShow =()=>{
    setShowSearch(true)
   }
 
  return (
    <>
          <header className='px-10 py-3 flex border shadow-sm justify-between'>
             <Link to='/' className='flex items-center gap-1'>
                <img src="/images/svgexport-2.svg" alt="airbnb_logo" />
                 <span className='font-extrabold text-2xl text-primary'>airbnb</span>
             </Link>
            { path?.pathname === "/" ? <div className='flex gap-2 items-center border border-gray-300 rounded-full pl-6 pr-2 py-3 shadow-md shadow-gray-200'>
               <div className=" border-r border-gray-300 pr-2">Anywhere</div>
               <div className=" border-r border-gray-300 pr-2">Any week</div>
               <div>Add guests</div>
               <button onClick={handleSearch} className=' bg-primary p-2 rounded-full'><img src="/images/svgexport-4.svg" alt="airbnb_search" height={15} width={15} /></button>
             </div> : (<div>
                   <Link to={'/'} onClick={handleShow}><div className=' cursor-pointer flex gap-3 items-center border border-gray-400 shadow-lg py-3 px-12 rounded-full'><h1>Search</h1> <button className='bg-primary p-2 rounded-full'><img src="/images/svgexport-4.svg" alt="airbnb_search" height={15} width={15} /></button></div></Link>
             </div>) }
             <div className='flex items-center gap-5 '>
              <div><h1>Airbnb your home</h1></div>
              <div><img src="/images/svgexport-5.svg" alt="" /></div>
              <Link to={ user ? '/account' : '/login'} className='flex items-center gap-2 border border-gray-300 rounded-full px-2 py-1'>
                <img src="/images/svgexport-6.svg" alt="menu" height={20} width={17} />
                <img
                        src={
                          user && user.photo
                            ? user.photo.startsWith('https://')
                              ? user.photo
                              : `http://localhost:8000/userPhoto/${user.photo}` 
                               : '/images/svgexport-7.svg'
                        }
                        alt="userIcon"
                        height={30}
                        width={30}
                        style={{ borderRadius: '20px' }}
                      />
                <div className='flex items-center gap-1 justify-center'>
                    <div className='pt-1'>{ user && <div>{user.name.split(' ')[0]}</div>}</div>
                 <div >{ user && user.admin && <div><svg width={25} height={25} fill="#FF385C" stroke="white" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg></div>}</div>   
                </div>
              </Link>
             </div>
         </header>
                { path?.pathname === '/' && showSearch && (
          <div className='flex flex-col justify-center items-center  border-b border-gray-300 py-2'><div className='headerSearch h-[60px] relative bg-white flex gap-4 items-center justify-center'>
                       <div className="flex items-center gap-2">
                          <MdPlace/>
                          <input type="text" value={location} onChange={(e)=>setLocation(e.target.value)} placeholder='Search a Location' />
                       </div>
                       <div className=" flex items-center gap-2">
                          <MdCalendarMonth/>
                          <span onClick={handleDate} className= ' cursor-pointer text-gray-400 border py-2 px-4 rounded-lg hover:border-primary'>{`${format(date[0].startDate,'MM/dd/yyyy')} to ${format(date[0].endDate,'MM/dd/yyyy')}`}</span>
                          { openDate && <DateRange rangeColors={['#FF385C']}
                          editableDateInputs={true} onChange={item => setDate([item.selection])}
                           moveRangeOnFirstSelection={false} ranges={date} className='transition absolute top-[60px]' />}
                       </div>
                       <div>
                       <div className>
                        <MultiRangeSlider
                            min={20}
                            max={1000}
                            step={10}
                            minValue={minValue}
                            maxValue={maxValue}
                            barInnerColor= "#FF385C"
                            label='false'
                            ruler='false'
                            onInput={(e) => {
                                handleInput(e);
                            }}
                        />
                        </div>
                       </div>
                      
                       <div className="flex items-center gap-2">
                          <button onClick={()=> handleFilter(location,minValue,maxValue)} className='bg-primary text-white py-2 px-6 rounded-lg'>Search</button>
                       </div> <br />
                  </div>
                   <div className=" flex items-center gap-2 max-w-md">
                    <input type="text" inputMode="numeric" value={"$"+ " "+ minValue} />
                    <input type="text" inputMode="numeric" value={"$"+ " " + maxValue} />
                </div>
                </div>)
                  }

          </>
  )
}
export default Header
