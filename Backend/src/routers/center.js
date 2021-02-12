const express=require('express');
const User=require('../models/user');
const Appointment=require('../models/appointment');
const Center=require('../models/center');
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

router.post('/center.signup1',async (req,res)=>{
      console.log(req.body);
      const ncenter=new Center(req.body);
      try{
            await ncenter.save();
            ncenter.Status=false;
            const otp1=RegistrationUtil.GetOtp();
            const otp2=RegistrationUtil.GetOtp();
      }catch(err){
            res.status(400).send(err);
      }
})