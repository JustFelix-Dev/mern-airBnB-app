const express = require('express');
const Order = require('../models/order');
const router = express.Router()
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE);

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
            details: details,
            email: data.email,
            country: data.customer_details.address.country,
            status: data.status,
            payment_status: data.payment_status
        })
        try{
              const savedUser = await newOrder.save();
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
       }).catch((err)=>{
          console.log(err.message)
       })
   }

  // Return a 200 res to acknowledge receipt of the event
  res.send().end();
});


  module.exports = router;