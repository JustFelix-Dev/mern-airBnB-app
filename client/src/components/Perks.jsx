import React from 'react';
import { SiPrivateinternetaccess } from 'react-icons/si';
import { AiOutlineWifi,AiFillCar } from 'react-icons/ai';
import { FaUmbrellaBeach } from 'react-icons/fa';
import { BsPersonWorkspace } from 'react-icons/bs';
import { LuDog } from 'react-icons/lu';
import { PiTelevisionSimple } from 'react-icons/pi';
import { CgGym } from 'react-icons/cg';
import { MdOutlineLocalLaundryService } from 'react-icons/md';

const Perks = ({ selected,onChange }) => {

    const handleClick=(e)=>{
        const {checked,name} = e.target;
        if (checked) {
          onChange([...selected,name]);
        } else {
          onChange([...selected.filter(selectedName => selectedName !== name)]);
        }
      }

  return (
        <>
         <label htmlFor="perks">What your place has to Offer:</label>
                        <div className='grid grid-cols-3 gap-3 mx-auto max-w-6xl'>
                            <label className='flex gap-2 items-center p-3 border border-gray-400 cursor-pointer'  htmlFor="">
                                <input type='checkbox' checked={selected.includes('wifi')} name='wifi' onChange={handleClick} />
                                <AiOutlineWifi/>
                                <span>Wifi - 50Mbps</span>
                            </label>
                            <label className='flex gap-2 items-center p-3 border border-gray-400 cursor-pointer' htmlFor="">
                                <input type='checkbox' checked={selected.includes('beach')} name='beach' onChange={handleClick} />
                                <FaUmbrellaBeach/>
                                <span>Beach Access</span>
                            </label>
                            <label className='flex gap-2 items-center p-3 border border-gray-400 cursor-pointer' htmlFor="">
                                <input type='checkbox'checked={selected.includes('workspace')} name='workspace' onChange={handleClick} />
                                <BsPersonWorkspace/>
                                <span>Dedicated Workspace</span>
                            </label>
                            <label className='flex gap-2 items-center p-3 border border-gray-400 cursor-pointer' htmlFor="">
                                <input type='checkbox' checked={selected.includes('parking')} name='parking' onChange={handleClick}/>
                                <AiFillCar/>
                                <span>Free Parking</span>
                            </label>
                            <label className='flex gap-2 items-center p-3 border border-gray-400 cursor-pointer' htmlFor="">
                                <input type='checkbox'checked={selected.includes('pet')} name='pet' onChange={handleClick}/>
                                <LuDog/>
                                <span>Pets</span>
                            </label>
                            <label className='flex gap-2 items-center p-3 border border-gray-400 cursor-pointer' htmlFor="">
                                <input type='checkbox'checked={selected.includes('tv')} name='tv' onChange={handleClick} />
                                <PiTelevisionSimple/>
                                <span>TV with standard cables</span>
                            </label>
                            <label className='flex gap-2 items-center p-3 border border-gray-400 cursor-pointer' htmlFor="">
                                <input type='checkbox'checked={selected.includes('entrance')} name='entrance' onChange={handleClick}/>
                                <SiPrivateinternetaccess/>
                                <span>Private Entrance</span>
                            </label>
                            <label className='flex gap-2 items-center p-3 border border-gray-400 cursor-pointer' htmlFor="">
                                <input type='checkbox'checked={selected.includes('gym')} name='gym' onChange={handleClick}/>
                                <CgGym/>
                                <span>Gym</span>
                            </label>
                            <label className='flex gap-2 items-center p-3 border border-gray-400 cursor-pointer' htmlFor="">
                                <input type='checkbox' checked={selected.includes('laundry')} name='laundry' onChange={handleClick} />
                                <MdOutlineLocalLaundryService/>
                                <span>Paid laundry</span>
                            </label>
                        </div>
        </>
  )
}

export default Perks
