const express = require('express');
const router = express.Router()
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE);

router.post('/create-checkout-session', async (req, res) => {
    const {booking} = req.body;
    const {place,...usefulInfo} = booking;
    const customer = await stripe.customers.create({
        metadata: {
            userId: booking.user,
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
      success_url: 'http://localhost:5173/checkout-success',
      cancel_url: 'http://localhost:5173/account/bookings',
    });
  
    res.send({url: session.url})
  });

//   Create order using the Order Model
     const createOrder =async(customer,data)=>{
        const items = JSON.parse(customer.metadata.booking)
     }

// server.js
//
// Use this sample code to handle webhook events in your integration.
let endpointSecret;
// endpointSecret = "whsec_5169f87898658ac54a7bf5bb19547e0ceb4ca59cf454763537d3ca16b645825f";
// whsec_5169f87898658ac54a7bf5bb19547e0ceb4ca59cf454763537d3ca16b645825f

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