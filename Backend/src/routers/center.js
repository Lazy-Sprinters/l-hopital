const express=require('express');
const User=require('../models/user');
const Appointment=require('../models/appointment');
const Center=require('../models/center');
const Facility=require('../models/facilities');
const router=new express.Router();
const RegistrationUtil=require('../helpers/Registration-helper');
const Vonage = require('@vonage/server-sdk');
const nodemailer=require('nodemailer');
const axios = require('axios').default;

//Setting up functionality for message-based authentication
const vonage = new Vonage({
      apiKey: 'b054c65b',
      apiSecret: 'gur6FHnIalka5e7d'
});

//Setting up functionality for email-based authentication
const transporter=nodemailer.createTransport({
      service: 'gmail',
      auth:{
            user:'r20324pavitra@dpsrkp.net',
            pass:'PASSWORD'
      }
});

//Route-1: Saving a center :Part-1
router.post('/center/signup1',async (req,res)=>{
      const center=new Center(req.body);
      try{
            await center.save();
            center.Status=false;
            const ProvidedAddress=center.NearestLandmark+' '+center.City+' '+center.Pincode+' '+center.State+' '+center.Country;
            const response=await axios.get('https://geocode.search.hereapi.com/v1/geocode?q='+ProvidedAddress+'&apiKey=tbeKC9DJdnRIZ1p5x496OgpIUj2vbL5CWADs8czW5Rk');
            const coordinates=Object.values(response.data.items[0].position);
            await center.PositionCoordinates.push(coordinates[0]);
            await center.PositionCoordinates.push(coordinates[1]);
            await center.save();
            res.status(201).send(center);
      }catch(err){
            const CenterinQuestion=await Center.findOne({Email:req.body.Email});
            console.log(CenterinQuestion);
            if (CenterinQuestion==undefined){
                  res.status(400).send("Email is invalid");
            }
            else if (CenterinQuestion.PositionCoordinates.length==0){
                  await Center.deleteOne({Email:req.body.Email});
                  res.status(400).send("Invalid Address");
            }
            else{
                  res.status(400).send("User is already registered");
            }
      }
})


router.post('/review/new',async (req,res)=>{
      try{
            console.log(req.body);
            const center=await Center.findOne({_id:req.body._id});
            center.Reviews.push({
                  text:req.body.review,
                  stars:req.body.rating
            });
            await center.save();
            res.status(200).send();
      }catch(err){
            console.log(err);
            res.status(400).send();
      }
})

module.exports=router;