const express = require('express');
const Order = require('../models/order');
const router = express.Router()
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE);
const nodemailer = require('nodemailer');
const {format} = require('date-fns');

router.post('/create-checkout-session', async (req, res) => {
    const {booking} = req.body;
    const {place,...usefulInfo} = booking;
    const customer = await stripe.customers.create({
        metadata: {
            userId: booking.user,
            bookingId: booking._id,
            bookingPlace: booking.place.title,
            bookingAddress: booking.place.address,
            booking: JSON.stringify(usefulInfo)
        }
    })
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: booking.place.title,
              images:[`http://localhost:8000/uploads/${booking.place.photos[0]}`],
              description: booking.place.extraInfo,
              metadata:{
                id:booking._id
              }
            },
            unit_amount: booking.price * 100,
          },
          quantity: 1,
        },
      ],
      customer: customer.id,
      mode: 'payment',
      success_url: `http://localhost:5173/checkout-success/${booking._id}`,
      cancel_url: 'http://localhost:5173/account/bookings',
    });
  
    res.send({url: session.url})
  });

//   Send Order Email to the user/customer
const OrderEmail=async(customer,data)=>{
    const details = JSON.parse(customer.metadata.booking)
    const html = `
    <div style="width:80%;margin:0 auto;;box-shadow: 0 7px 30px -10px rgba(150,170,180,0.5);">
    <img src='cid:airbnbHeader' alt='headerImg' style='display:block;object-fit:cover' width='100%' height='200px'/>
    <div style="display: flex; justify-content: center; padding: 16px;">
        <svg width="80" height="80" fill="none" stroke="#FF385C" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path style="stroke-linecap: round; stroke-linejoin: round;" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
    </div>
    <h1 style="padding-top: 8px; padding-bottom: 8px; border-bottom-width: 2px; text-align: center; font-size: 1.5rem; border-color: #48bb78;">Reservation Details</h1>
</div>
<span
    style="display: flex; margin: 1rem 0; padding: 1rem; width: 100%; max-width: 100%; border-radius: 0.5rem; background-color: #48bb78; color: #ffffff; font-weight: 600;text-align:center;align-items: center; justify-content: center;"
>
    Status: <span>${data.status}</span>
</span>
<h1 style="font-size: 1.25rem; padding-bottom: 0.5rem; color: #333;">Customer:</h1>
<div style="display:flex;flex-direction:column;color: #666; border-bottom: 2px solid #ddd; padding-bottom: 0.5rem;">
    <div style="display:flex;border:2px solid red;justify-content:space-between;">
       <div>Full-Name:</div><div>${details.fullName}</div>
    </div>
    <div style="display: flex; justify-content: space-between;">
        <div>Country:</div><div>${data.customer_details.address.country}</div>
    </div>
    <div style="display: flex; justify-content: space-between;">
       <div> Phone-Number: </div><div>${details.mobile}</div>
    </div>
    <div style="display: flex; justify-content: space-between;">
       <div>Email:</div><div>${data.customer_details.email}</div>
    </div>
</div>

<h1 style="font-size: 1.25rem; padding-bottom: 0.5rem; padding-top: 0.5rem; color: #333;">Payments:</h1>
<div style="display: block; color: #666; border-bottom: 2px solid #ddd; padding-bottom: 0.5rem;">
    <div style="display: flex; justify-content: space-between;">
        Payment-Intent: <div>${data.payment_intent}</div>
    </div>
    <div style="display: flex; justify-content: space-between;">
        Payment-Status: <div>${data.payment_status}</div>
    </div>
    <div style="display: flex; justify-content: space-between;">
        Amount Paid: <div>${details.price}</div>
    </div>
    <div style="display: flex; justify-content: space-between;">
        Payment-Time: <div>${format(new Date(data.created * 1000), 'dd MMMM, yyyy HH:mm:ss a')}</div>
    </div>
</div>

<h1 style="font-size: 1.25rem; padding-bottom: 0.5rem; padding-top: 0.5rem; color: #333;">Bookings:</h1>
<div style="display: block; color: #666;">
    <div style="display: flex; justify-content: space-between;">
        Booking Number:<div>${data.customer}</div>
    </div>
    <div style="display: flex; justify-content: space-between;">
        Booking Location:<div>${customer.metadata.bookingPlace}</div>
    </div>
    <div style="display: flex; justify-content: space-between;">
        Booking Address:<div>${customer.metadata.bookingAddress}</div>
    </div>
    <div style="display: flex; justify-content: space-between;">
        Guests: <div>${details.numOfGuests}</div>
    </div>
    <div style="display: flex; justify-content: space-between;">
        Check-In Time:<div>${format(new Date(details.checkIn), 'dd EEEE MMMM, yyyy')}</div>
    </div>
    <div style="display: flex; justify-content: space-between;">
        Check-Out Time:<div>${format(new Date(details.checkOut), 'dd EEEE MMMM, yyyy')}</div>
    </div>
</div>
  `;
const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth:{
            user: 'owolabifelix78@gmail.com',
            pass: process.env.GOOGLE_PASS
        }
    })
const info = await transporter.sendMail({
        from: 'AirBnb <owolabifelix78@gmail.com>',
        to: data.customer_details.email,
        subject:'Reservation Successfully Confirmed!',
        html: html,
        attachments:[{
                filename: 'emailHeader.jpg',
                path: './emailImages/emailHeader.jpg',
                cid: 'airbnbHeader'
        }]
})
console.log('Message Sent:' + info.messageId);

}

//   Create order using the Order Model
     const createOrder =async(customer,data)=>{
        const details = JSON.parse(customer.metadata.booking)

        const newOrder = new Order({
            userId: customer.metadata.userId,
            bookingId: customer.metadata.bookingId,
            bookingPlace: customer.metadata.bookingPlace,
            bookingAddress: customer.metadata.bookingAddress,
            customerId: data.customer,
            paymentIntentId: data.payment_intent,
            paymentTime: data.created,
            details: details,
            email: data.customer_details.email,
            country: data.customer_details.address.country,
            status: data.status,
            payment_status: data.payment_status
        })
        try{
              const savedUser = await newOrder.save();
              console.log('Data:', data)
              console.log('Customer:', customer)
              console.log('Processed Order:',savedUser)
            //   email - nodemailer
        }catch(err){
            console.log(err)
        }
     }

// server.js
//
// Use this sample code to handle webhook events in your integration.
let endpointSecret;
// endpointSecret = ;

router.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature'];

  let data;
  let eventType;

  if(endpointSecret){
      let event;
      try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        console.log('Webhook Verified!');
      } catch (err) {
        console.log(`Webhook Error: ${err.message}`);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }
      data = event.data.object;
      eventType = event.type;
  }else{
      data = req.body.data.object;
      eventType = req.body.type;
  }

  // Handle the event
   if(eventType === 'checkout.session.completed'){
       stripe.customers.retrieve(data.customer).then((customer)=>{
        createOrder(customer,data)
        OrderEmail(customer,data)
       }).catch((err)=>{
          console.log(err.message)
       })
   }

  // Return a 200 res to acknowledge receipt of the event
  res.send().end();
});




  module.exports = router;