import React, { useContext, useState } from 'react';
import { BiCurrentLocation } from 'react-icons/bi';
import { FacebookShareButton,FacebookIcon,
        TwitterShareButton,TwitterIcon,
        LinkedinShareButton,LinkedinIcon,
        EmailShareButton,EmailIcon,
        WhatsappShareButton,WhatsappIcon,
        TelegramShareButton,TelegramIcon,
        RedditShareButton,RedditIcon,
        PinterestShareButton,PinterestIcon,
        ViberShareButton,ViberIcon,
      } from 'react-share';
import { userContext } from '../ContextHook/userContext';


const AddressLink = ({children}) => {
      const [ isModal,setIsModal ] = useState(false);
      const {user} = useContext(userContext)

  const openModal=()=>{
       setIsModal(true)
  }

  const closeModal=()=>{
    setIsModal(false)
  }

  return (
         <>
           {  isModal && (
            <div className='bg-[whitesmoke] blur-1 shareBox w-[50%] h-50%]
              fixed top-[20%] left-[25%] bottom-[30%] right-[30%] z-10 border border-primary rounded-xl p-4'>
                <div>
                  <div className='flex justify-between'>
                  <h1 className='text-xl'>Share this Place:</h1>
                  <span onClick={closeModal}><svg width={20} height={20} className='cursor-pointer rounded-md bg-black' fill="none" stroke="white" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                </svg></span>
                  </div>
                  <div className=' flex flex-wrap justify-center items-center gap-4 max-w-md mx-auto p-2 mt-2'>
                    <div className='flex-[30%] flex justify-center'>
                      <FacebookShareButton url='airbnb.com' quote='Go ahead and Share' hashtag='#airbnb'>
                        <FacebookIcon size={60} round={true}/>
                        </FacebookShareButton>  
                    </div>
                    <div className='flex-[30%] flex justify-center'>
                      <TwitterShareButton url='airbnb.com' title='My AirBnb Reservation!'>
                        <TwitterIcon size={60} round={true}/>
                        </TwitterShareButton>  
                    </div>
                    <div className='flex-[30%] flex justify-center'>
                      <LinkedinShareButton url='airbnb.com' title='My Airbnb Reservation!' summary='A look at the luxurious and state-of-the-art apartment provided at Airbnb!' source='AirBnb'>
                        <LinkedinIcon  size={60} round={true}/>
                        </LinkedinShareButton>  
                    </div>
                    <div className='flex-[30%] flex justify-center'>
                      <EmailShareButton url='www.airbnb.com' subject='My AirBnb Reservation!' body={user?.email}>
                        <EmailIcon  size={60} round={true}/>
                        </EmailShareButton>  
                    </div>
                    <div className='flex-[30%] flex justify-center'>
                      <WhatsappShareButton url='airbnb.com' title='My Airbnb Reservation!'>
                        <WhatsappIcon  size={60} round={true}/>
                        </WhatsappShareButton>  
                    </div>
                    <div className='flex-[30%] flex justify-center'>
                      <TelegramShareButton url='airbnb.com' title='My Airbnb Reservation!'>
                        <TelegramIcon  size={60} round={true}/>
                        </TelegramShareButton>  
                    </div>
                    <div className='flex-[30%] flex justify-center'>
                      <RedditShareButton url='airbnb.com' title='My Airbnb Reservation!'>
                        <RedditIcon  size={60} round={true}/>
                        </RedditShareButton>  
                    </div>
                    <div className='flex-[30%] flex justify-center'>
                      <ViberShareButton url='airbnb.com' title='My Airbnb Reservation!'>
                        <ViberIcon  size={60} round={true}/>
                        </ViberShareButton>  
                    </div>
                    <div className='flex-[30%] flex justify-center'>
                      <PinterestShareButton url='airbnb.com'media={''} description='A look at the luxurious and state-of-the-art apartment provided at Airbnb!'>
                        <PinterestIcon  size={60} round={true}/>
                        </PinterestShareButton>  
                    </div>
                  </div>
                </div>
            </div>
           )

           }
         <div className='flex justify-between'>
          <a className='flex items-center gap-1 my-3 block font-semibold underline' target='blank' href={'https://maps.google.com/?q='+ children}><BiCurrentLocation/>{children}
         </a>
          <div>
            <div onClick={openModal} className='flex cursor-pointer hover:underline items-center gap-1'> <span><svg fill="#333" width={20} height={20} stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"></path>
          </svg></span><span>Share</span></div>
          </div>
         </div>
         </>
  )
}

export default AddressLink
