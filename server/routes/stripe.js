const express = require('express');
const Order = require('../models/order');
const router = express.Router()
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE);
const nodemailer = require('nodemailer');
const {format} = require('date-fns');
const bookingModel = require('../models/Booking');
const userModel = require('../models/user');

router.post('/create-checkout-session', async (req, res) => {
    const {booking,option} = req.body;
    console.log('MyBooking:',booking)
    console.log('MyOption:',option)
    const {place,...usefulInfo} = booking;
    const badgeVerify = await userModel.findOne({_id:booking.user})
    if(!badgeVerify){
      return res.status(401).json("There seems to be an error verifying user's badge!")
    }
    const badgeType = badgeVerify.badge;

    // Calculate the discount percentage based on the user's badge.
    let discountPercentage = 0;
    if (badgeType === 'Silver') {
      discountPercentage = 0.02; // 2% discount for Silver badge.
    } else if (badgeType === 'Gold') {
      discountPercentage = 0.04; // 4% discount for Gold badge.
    } else if (badgeType === 'Platinum') {
      discountPercentage = 0.06; // 6% discount for Platinum badge.
    }

// Calculate the discounted price based on the discount percentage
const discountedPrice = booking.price - (booking.price * discountPercentage);
    const customer = await stripe.customers.create({
        metadata: {
            userId: booking.user,
            bookingId: booking._id,
            badge:badgeType,
            bookingPlace: booking.place.title,
            orderPhoto: booking.place.photos[0],
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
              description:`---------You have a ${discountPercentage *100}% discount on this reservation!.---------${booking.place.extraInfo}`,
              metadata:{
                id:booking._id,
                discountedPrice: discountedPrice
              }
            },
            unit_amount: discountedPrice * 100,
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
    <div style="width: 80%; margin: 0 auto;box-shadow: 0 7px 30px -10px rgba(150, 170, 180, 0.5);text-align:center;">
    <img src="cid:airbnbHeader" alt="headerImg" style="display: block; object-fit: cover" width="100%" height="200px" />
    <div class='myImage' style="margin:0 auto;width="50%;text-align:center;">
      <img src="cid:airbnbImg" alt="headerImg" width="150px" height="150px" />
    </div>
    <h1 style="padding-top: 8px; padding-bottom: 8px; border-bottom-width: 2px; text-align: center; font-size: 1.5rem; border-color: #48bb78;">Reservation Details</h1>
    <div style="background-color: #48bb78; color: #ffffff; font-weight: 600; text-align: center; padding: 1rem;">
      Status: <span>${data.status}</span>
    </div>
    <h1 style="border-radius:15px;background-color:rgba(128,0,0,0.5);font-size: 1.25rem; padding-bottom: 0.5rem; color: #fff;">Customer:</h1>
    <table style="width: 100%; color: #666; border-bottom: 2px solid #ddd; padding-bottom: 0.5rem;">
      <tr>
        <td>Full-Name:</td>
        <td>${details.fullName}</td>
      </tr>
      <tr>
        <td>Country:</td>
        <td>${data.customer_details.address.country}</td>
      </tr>
      <tr>
        <td>Phone-Number:</td>
        <td>${details.mobile}</td>
      </tr>
      <tr>
        <td>Email:</td>
        <td>${data.customer_details.email}</td>
      </tr>
    </table>
  
    <h1 style="border-radius:15px;background-color:rgba(128,0,0,0.5);font-size: 1.25rem; padding-bottom: 0.5rem; padding-top: 0.5rem; color: #fff;">Payments:</h1>
    <table style="width: 100%; color: #666; border-bottom: 2px solid #ddd; padding-bottom: 0.5rem;">
      <tr>
        <td>Payment-Intent:</td>
        <td>${data.payment_intent}</td>
      </tr>
      <tr>
        <td>Payment-Status:</td>
        <td>${data.payment_status}</td>
      </tr>
      <tr>
        <td>Amount Paid:</td>
        <td>$${details.price}</td>
      </tr>
      <tr>
        <td>Payment-Time:</td>
        <td>${format(new Date(data.created * 1000), 'dd MMMM, yyyy HH:mm:ss a')}</td>
      </tr>
    </table>
  
    <h1 style="border-radius:15px;background-color:rgba(128,0,0,0.5);font-size: 1.25rem; padding-bottom: 0.5rem; padding-top: 0.5rem; color: #fff;">Bookings:</h1>
    <table style="width: 100%; color: #666;">
      <tr>
        <td>Booking Number:</td>
        <td>${data.customer}</td>
      </tr>
      <tr>
        <td>Booking Location:</td>
        <td>${customer.metadata.bookingPlace}</td>
      </tr>
      <tr>
        <td>Booking Address:</td>
        <td>${customer.metadata.bookingAddress}</td>
      </tr>
      <tr>
        <td>Guests:</td>
        <td>${details.numOfGuests}</td>
      </tr>
      <tr>
        <td>Check-In Time:</td>
        <td>${format(new Date(details.checkIn), 'dd EEEE MMMM, yyyy')}</td>
      </tr>
      <tr>
        <td>Check-Out Time:</td>
        <td>${format(new Date(details.checkOut), 'dd EEEE MMMM, yyyy')}</td>
      </tr>
    </table>
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
        },{
            filename: 'emailCheck.jpg',
            path: './emailImages/emailCheck.jpg',
            cid: 'airbnbImg'
    }]
})
console.log('Message Sent:' + info.messageId);

}



// Update Payment Status
 const updatePaymentStatus=async(customer)=>{
        try{
          await bookingModel.updateOne({ _id: customer.metadata.bookingId},{$set:{status:'Paid'}}) 
          console.log('Payment Successful!')
        }catch(err){
          console.log(err.message)
        }
  }

//   Create order using the Order Model
     const createOrder =async(customer,data)=>{
        const details = JSON.parse(customer.metadata.booking)

        const newOrder = new Order({
            userId: customer.metadata.userId,
            bookingId: customer.metadata.bookingId,
            orderPhoto: customer.metadata.orderPhoto,
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

        // Reward/Point Logic
        try{
          const rewardPoints = 10;
             const rewardUser = await userModel.findOne({_id: customer.metadata.userId})
              if(!rewardUser){
                return res.status(401).json('User not Found!')
              }
              rewardUser.rewardPoint += rewardPoints;
              const updateUser = await rewardUser.save();
              const savedUser = await newOrder.save();
               const updatedUser = await userModel.findOne({_id: customer.metadata.userId})
               if(updatedUser.rewardPoint >= 500 && updatedUser.rewardPoint <= 999){
                updatedUser.badge = 'Silver';
               }else if(updatedUser.rewardPoint >= 1000 && updatedUser.rewardPoint <= 1499){
                updatedUser.badge = 'Gold';
               }else if(updatedUser.rewardPoint >= 1500 && updatedUser.rewardPoint <= 1999){
                updatedUser.badge = 'Platinum';
               }
               const refreshedUser = await updatedUser.save();
              
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
        updatePaymentStatus(customer)
       }).catch((err)=>{
          console.log(err.message)
       })
   }

  // Return a 200 res to acknowledge receipt of the event
  res.send().end();
});




  module.exports = router;