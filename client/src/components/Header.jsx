import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { userContext } from '../ContextHook/userContext';
import { AnimatePresence, motion } from 'framer-motion';
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
    };

   const handleSearch = ()=>{
      setShowSearch(!showSearch)
   };

   const handleShow =()=>{
    setShowSearch(true)
   }
 
  return (
    <>
          <header className=' px-4 md:px-10 py-3 flex border shadow-sm justify-between '>
             <Link to='/' className='flex items-center gap-1'>
                <img src="/images/svgexport-2.svg" alt="airbnb_logo" />
                 <span className='font-extrabold text-2xl text-primary hidden lg:block'>airbnb</span>
             </Link>
            { path?.pathname === "/" ? <div className='flex gap-2 items-center md:border border-gray-300 rounded-full pl-6 pr-2 py-3 sm:shadow-md shadow-gray-200 text-sm'>
               <div className=" border-r border-gray-300 pr-2 hidden sm:block">Anywhere</div>
               <div className=" border-r border-gray-300 pr-2 hidden sm:block">Any week</div>
               <div className='hidden sm:block'>Add guests</div>
               <button onClick={handleSearch} className=' bg-primary p-2 rounded-full'><img src="/images/svgexport-4.svg" alt="airbnb_search" height={15} width={15} /></button>
             </div> : (<div>
                   <Link to={'/'} onClick={handleShow}><div className=' cursor-pointer flex gap-3 items-center border border-gray-400 shadow-lg py-3 px-12 rounded-full'><h1>Search</h1> <button className='bg-primary p-2 rounded-full'><img src="/images/svgexport-4.svg" alt="airbnb_search" height={15} width={15} /></button></div></Link>
             </div>) }
             <div className='flex items-center gap-5 '>
              <div className='hidden md:block'><h1>Airbnb your home</h1></div>
              <div className='hidden sm:block'><img src="/images/svgexport-5.svg" alt="" /></div>
              <Link to={ user ? '/account' : '/login'} className='flex items-center gap-2 border border-gray-300 rounded-full px-2 py-1'>
                <img src="/images/svgexport-6.svg" alt="menu" height={20} width={17} />
                <img
                        src={
                          user && user.photo
                              ? user.photo
                               : '/images/svgexport-7.svg'
                        }
                        alt="userIcon"
                        height={30}
                        width={30}
                        style={{ borderRadius: '20px' }}
                      />
                <div className='flex items-center gap-1 justify-center'>
                    <div className='pt-1 hidden md:block'>{ user && <div>{user.name.split(' ')[0]}</div>}</div>
                 <div className='hidden md:block pt-0.5 self-center'>{ user && user.admin && <div><svg width={13} height={13} fill="#FF385C" stroke="" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"></path>
                </svg></div>}</div>   
                </div>
              </Link>
             </div>
         </header>
              <AnimatePresence mode='popLayout'> 
                { path?.pathname === '/' && showSearch && (
                  <motion.div exit={{translateY:-10,opacity:0}} className='absolute top-[79px] w-full border-t px-2 bg-white z-2 md:static'>
              <motion.div exit={{translateY:-10,opacity:0}} initial={{translateY:-100,opacity:0}} animate={{translateY:0,opacity:1}} transition={{type:'spring',stiffness:120,duration:0}} className='flex flex-col justify-center items-center  border-b border-gray-300 py-2'>
                <div className='relative bg-white flex flex-col gap-4 items-center justify-center sm:flex-col md:flex-row'>
                       <div className="flex items-center gap-2">
                          <MdPlace/>
                          <input type="text" value={location} onChange={(e)=>setLocation(e.target.value)} placeholder='Search a Location' />
                       </div>
                       <div className=" flex items-center gap-2">
                          <MdCalendarMonth/>
                          <span onClick={handleDate} className= ' cursor-pointer text-gray-400 border py-2 px-4 rounded-lg hover:border-primary'>{`${format(date[0].startDate,'MM/dd/yyyy')} to ${format(date[0].endDate,'MM/dd/yyyy')}`}</span>
                          { openDate && <DateRange rangeColors={['#FF385C']}
                          editableDateInputs={true} onChange={item => setDate([item.selection])}
                           moveRangeOnFirstSelection={false} ranges={date} className='transition absolute -left-6 top-[315px]  md:top-[110px] md:left-64'/>}
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
                          <button onClick={()=>{ handleFilter(location,minValue,maxValue);setShowSearch(false)}} className='bg-primary text-white py-2 px-6 rounded-lg'>Search</button>
                       </div> <br />
                  </div>
                   <div className=" flex items-center gap-2 max-w-md">
                    <input type="text" inputMode="numeric" value={"$"+ " "+ minValue} />
                    <input type="text" inputMode="numeric" value={"$"+ " " + maxValue} />
                </div>
                </motion.div>
                </motion.div>)
                  }
              </AnimatePresence>

          </>
  )
}
export default Header
