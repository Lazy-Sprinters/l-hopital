const express=require('express');
const User=require('../models/user');
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

//Route-1:Temporary creation of a user in the database(T completed)
router.post('/user/signup1',async (req,res)=>{
      const user=new User(req.body);
      try{
            await user.save();
            user.Status=false;
            const otp1=RegistrationUtil.GetOtp();
            const otp2=RegistrationUtil.GetOtp();
            const emailbody=RegistrationUtil.EmailBody(user.Email,otp1);
            const messagebody=RegistrationUtil.MessageBody(otp2);
            let emailinfo=await transporter.sendMail(emailbody);
            let messageinfo=await vonage.message.sendSms('Team',"91"+user.PhoneNumber,messagebody);
            user.RecentEmailOtps.push(otp1);
            user.RecentMobileOtps.push(otp2);
            const ProvidedAddress=user.NearestLandmark+user.Pincode+user.City+user.State+user.Country;
            const response=await axios.get('https://geocode.search.hereapi.com/v1/geocode?q='+ProvidedAddress+'&apiKey=tbeKC9DJdnRIZ1p5x496OgpIUj2vbL5CWADs8czW5Rk');
            if (response.data.items.length===0)
            {
                  res.status(400).send("Invalid Address");
            }
            const coordinates=Object.values(response.data.items[0].position);
            user.PositionCoordinates.push(coordinates[0]);
            user.PositionCoordinates.push(coordinates[1]);
            await user.save();
            res.status(201).send(user);
      }catch(err){
            res.status(400).send(err);
      }
});

//Route-2:Permanent creation of a user in the database if OTP verification succeeds.(T completed)
router.post('/user/signup2',async (req,res)=>{
      try{
            const user=await User.find({Email:req.body.Email})    
            if (user.length===0)
            {
                  res.status(404).send();
            }
            else
            {
                  if (RegistrationUtil.Verificationutil(user,req)==true)
                  {
                        user[0].Status=true;
                        await user[0].RecentEmailOtps.pop();
                        await user[0].RecentMobileOtps.pop();
                        await user[0].save();
                        res.status(200).send(user[0]);
                  }
                  else
                  {
                        res.status(404).send(user[0]);
                  }
            }
      }catch{
            res.status(400).send('Some error occured');
      }
});

//Route-3:Login setup for a user(T completed)
router.post('/user/login',async (req,res)=>{
      try{
            const user=await User.findbycredentials(req.body.email,req.body.password);
            if (user.Status==false)
            {
                  res.status(400).send("Not Verified,redirect to verification page");
            }else
            {
                  res.status(200).send(user);      
            }
      }catch(err){
            res.status(404).send("User not registered");
      }
});

//Route-4:Resending an OTP,requires useremailid (T completed)
router.post('/user/newotps',async (req,res)=>{
      try{
            const UserEmail=req.body.email;
            const user=await User.findOne({Email:UserEmail});
            if (user!==undefined && user.Status==false)
            {
                  const otp1=RegistrationUtil.GetOtp();
                  const otp2=RegistrationUtil.GetOtp();
                  const emailbody=RegistrationUtil.EmailBody(user.Email,otp1);
                  const messagebody=RegistrationUtil.MessageBody(otp2);
                  let emailinfo=await transporter.sendMail(emailbody);
                  let messageinfo=await vonage.message.sendSms('Team',"91"+user.PhoneNumber,messagebody);
                  user.RecentEmailOtps.push(otp1);
                  user.RecentMobileOtps.push(otp2);
                  await user.save();
                  res.status(200).send();
            }
            else if (user===undefined)
            {
                  res.status(404).send("You are not registered!");
            }
            else
            {
                  res.status(400).send("User is already verified");
            }
      }catch{
            res.status(404).send();
      }
});

module.exports =router;