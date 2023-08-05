const PoliciesPage = () => {
    return ( 
           <>
              <div className=" flex justify-center mt-4 border border-primary rounded-xl p-8 w-[80%]  mx-auto shadow-2xl">
                  <div className="flex-[40%] ">
                     <div>
                        <h1 className="text-2xl font-bold">Badges:</h1>
                        <div>
                            <div className="flex items-center gap-2">
                            <h1 className="underline text-lg">Bronze Badge:</h1> <span><img src="/images/bronze-badge.png" alt="" height={30} width={30} /></span>
                            </div>
                             <ul className="list-disc list-inside ">
                                 <li>User must have between 0 - 500 points. <span className="text-gray-500">(default)</span></li>
                                 <li>Users with the bronze badge do not get discounts on reservations.</li>
                             </ul>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                            <h1 className="underline text-lg">Silver Badge:</h1> <span><img src="/images/silver-badge.png" alt="" height={30} width={30} /></span>
                            </div>
                             <ul className="list-disc list-inside">
                                 <li>User must have between 500 - 1000 points.</li>
                                 <li>Users with the silver badge get up to 2% discount on all reservations made.</li>
                             </ul>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                            <h1 className="underline text-lg">Gold Badge:</h1> <span><img src="/images/gold-badge.png" alt="" height={30} width={30} /></span>
                            </div>
                             <ul className="list-disc list-inside">
                                 <li>User must have between 1000 - 1500 points.</li>
                                 <li>Users with the Gold badge get up to 4% discount on all reservations made.</li>
                             </ul>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                            <h1 className="underline text-lg">Platinum Badge:</h1> <span><img src="/images/platinum-badge.png" alt="" height={30} width={30} /></span>
                            </div>
                             <ul className="list-disc list-inside">
                                 <li>User must have between 1500 - 2000 points.</li>
                                 <li>Users with the Platinum badge get up to 6% discount on all reservations made.</li>
                             </ul>
                        </div>
                     </div>
                  </div>
                  <div className="flex-[40%] flex flex-col gap-6">
                     <div>
                        <h1 className="text-2xl font-bold">Points:</h1>
                        <ul className="list-disc list-inside">
                            <li>Points can be redeemed and used to make reservations for a duration of only one night per time.</li>
                            <li>For every successful reservation made with direct payment,<span className="text-gray-900 font-bold">10 points </span> is awarded to the user.</li>
                            <li>A total of <span className="text-gray-900 font-bold">50 points </span>would be deducted for every reservation made using point for a <span className="text-gray-900 font-bold">10% discount</span>.</li>
                            <li>Users with all badge type can use points if sufficient to make their reservations. </li>
                        </ul>
                     </div>
                    <div className="flex items-center  justify-center">
                    <img src="/images/airbnb.png" alt="airbnbLogo" height={200} width={200} />
                    </div>
                  </div>
              </div>
           </>
     );
}
 
export default PoliciesPage;