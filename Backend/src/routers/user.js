const express=require('express');
const User=require('../models/user');
const router=new express.Router();
const Center=require('../models/center');
const Facility=require('../models/facilities');
const Authmiddleware=require('../middleware/auth');
const RegistrationUtil=require('../helpers/Registration-helper');
const Vonage = require('@vonage/server-sdk');
const nodemailer=require('nodemailer');
const MainHelper=require('../helpers/all-utility');
const axios = require('axios').default;
const bcrypt=require('bcryptjs');

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
      // console.log(req.body);
      const user=new User(req.body);
      try{
            await user.save();
            user.Status=false;
            const ProvidedAddress=user.NearestLandmark+' '+user.City+' '+user.Pincode+' '+user.State+' '+user.Country;
            const response=await axios.get('https://geocode.search.hereapi.com/v1/geocode?q='+ProvidedAddress+'&apiKey=tbeKC9DJdnRIZ1p5x496OgpIUj2vbL5CWADs8czW5Rk');
            const token=await user.generateauthtoken();
            const coordinates=Object.values(response.data.items[0].position);
            await user.PositionCoordinates.push(coordinates[0]);
            await user.PositionCoordinates.push(coordinates[1]);
            await user.save();
            res.status(201).send({user,token});
      }catch(err){
            //fix delete functionality for re-registration thing
            //if all fields are fine because registration can only fail for false address
            //Case 1:Ill-formatted data from the user as for email
            //Case 2:Wrong address
            //Case 3:Re-registration
            const UserinQuestion=await User.findOne({Email:req.body.Email});
            if (UserinQuestion==undefined){
                  res.status(400).send("Email is invalid");
            }
            else if (UserinQuestion.PositionCoordinates.length==0){
                  await User.deleteOne({Email:req.body.Email});
                  res.status(400).send("Invalid Address");
            }
            else{
                  res.status(400).send("User is already registered");
            }
      }
});

//Route-2:Permanent creation of a user in the database if OTP verification succeeds.(T completed)
router.post('/user/signup2',async (req,res)=>{
      // console.log(req.body);
      try{
            const user=await User.findOne({Email:req.body.email}) 
            if (user==undefined){
                  res.status(404).send();
            }
            else{
                  if (RegistrationUtil.Verificationutil(user,req)==true){
                        const token=await user.generateauthtoken();
                        user.Status=true;
                        await user.RecentEmailOtps.pop();
                        await user.RecentMobileOtps.pop();
                        await user.save();
                        res.status(200).send({user,token});
                  }
                  else{
                        res.status(404).send(user);
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
            const token=await user.generateauthtoken();
            res.status(200).send({user,token});
      }catch(err){
            console.log(err);
            res.status(404).send("User not registered");
      }
});

//Route-4:Sending OTP
router.post('/user/newotps',async (req,res)=>{
      try{
            // console.log(req.body);
            const UserEmail=req.body.email;
            const user=await User.findOne({Email:UserEmail});
            if (user!==undefined && user.Status==false){
                  const otp1=RegistrationUtil.GetOtp();
                  const otp2=RegistrationUtil.GetOtp();
                  const emailbody=RegistrationUtil.EmailBody(user.Email,otp1);
                  const messagebody=RegistrationUtil.MessageBody(otp2);
                  // let emailinfo=await transporter.sendMail(emailbody);
                  // let messageinfo=await vonage.message.sendSms('Team',"91"+user.PhoneNumber,messagebody);
                  user.RecentEmailOtps.push(otp1);
                  user.RecentMobileOtps.push(otp2);
                  await user.save();
                  res.status(200).send();
            }
            else if (user===undefined){
                  res.status(404).send("You are not registered!");
            }
            else{
                  res.status(400).send("User is already verified");
            }
      }catch{
            res.status(404).send();
      }
});

router.post('/user/match',async (req,res)=>{
      console.log(req.body);
      try{
            const requiredFacility=req.body.test;
            const requiredDate=req.body.date;
            const user=req.body.userInfo.data.user;
            if (user.Status==false){
                  res.status(403).send("User Not Verified");
            }
            else{
                  const step1=await Facility.find({FacilityName:requiredFacility});
                  let ids=[];
                  for(let i=0;i<step1.length;i++){
                        const element=step1[i];
                        // console.log(element);
                        const v1=element.SlotAvailability.find(e=> e.date==requiredDate);
                        // console.log(v1);
                        if (v1!=undefined){
                              let check=false;
                              for(let j=0;j<v1.slotinfo.length;j++){
                                    let k=v1.slotinfo[j];
                                    check=check | (k.det2>0);     
                              }
                              if (check!=false){
                                    const ob={
                                          own:element.owner,
                                          costing1:element.Price
                                    }
                                    ids.push(ob);
                              }
                        }
                  };
                  let ret=[];
                  for(let j=0;j<ids.length;j++)
                  {
                        let i=ids[j];
                        //handle unverified centres
                        const center=await Center.findOne({_id:i.own});
                        const clientcoor=user.PositionCoordinates[0].toString()+','+user.PositionCoordinates[1].toString();
                        const centercoor=center.PositionCoordinates[0].toString()+','+center.PositionCoordinates[1].toString();
                        // const url='https://router.hereapi.com/v8/routes?transportMode=car&origin='+clientcoor+'&destination='+centercoor+'&return=Summary&apiKey=tbeKC9DJdnRIZ1p5x496OgpIUj2vbL5CWADs8czW5Rk';
                        // const response=await axios.get(url);
                        const retobj={
                              cen:center,
                              // dis:response.data.routes[0].sections[0].summary.length/1000,
                              dis:100,
                              costing:i.costing1,
                              service:requiredFacility,
                              askeddate:requiredDate,
                              tags:center.Alloptions,
                        };
                        ret.push(retobj);
                  }
                  res.status(200).send(ret);
            }
      }catch(err){
            console.log(err);
            res.status(404).send("No centers found");
      }
}) 

router.post('/user/newappointment',async(req,res)=>{
      try{
            const queryobj=req.body.CentreValue;
            const existing=await Appointment.findOne({user_id:queryobj.Client._id,dateofappointment:queryobj.askeddate,Slotdetails:req.body.selectedTime});
            if (existing==null){
                  const newappointment=new Appointment(MainHelper.getformatappointment(req));
                  let facility=await Facility.findOne({Price:queryobj.costing,FacilityName:queryobj.service,owner:queryobj.cen._id});
                  facility=MainHelper.modifyslotdata(facility,queryobj,req);
                  await facility.save();
                  newappointment.save();
                  res.status(200).send(newappointment);
            }
            else{
                  res.status(400).send("Same Booking already exists!");
            }
      }catch(err){
            console.log(err);
            res.status(400).send(err);
      }
});

router.post('/user/sendotp',async(req,res)=>{
      try{
            const user=await User.findOne({_id:req.body.id});
            const otp=RegistrationUtil.GetOtp();
            if (parseInt(req.body.flag)==0){     
                  const emailbody=RegistrationUtil.EmailBody(req.body.value,otp);
                  // let emailinfo=await transporter.sendMail(emailbody);
                  user.RecentEmailOtps.push(otp);
                  await user.save();
                  res.status(200).send("Otp sent successfully");
            }
            else{
                  const messagebody=RegistrationUtil.MessageBody(otp);
                  // let messageinfo=await vonage.message.sendSms('Team',"91"+user.PhoneNumber,messagebody);
                  user.RecentMobileOtps.push(otp);
                  await user.save();
                  res.status(200).send("Otp sent successfully");
            }
      }catch(err){
            console.log(err);
            res.send(400).send(err);
      }
})

router.post('/user/verifyotponupd',async (req,res)=>{
      try{
            const user=await User.findOne({_id:req.body.id});
            if (parseInt(req.body.flag)==0){
                  if (user.RecentEmailOtps[user.RecentEmailOtps.length-1]==req.body.otp){
                        res.status(200).send('Verified');
                  }
                  else{
                        res.status(400).send('Invalid Otp');
                  }
            }
            else{
                  if (user.RecentMobileOtps[user.RecentMobileOtps.length-1]==req.body.otp){
                        res.status(200).send('Verified');
                  }
                  else{
                        res.status(400).send('Invalid Otp');
                  }
            }
      }catch(err){
            console.log(err);
            res.status(400).send(err);
      }
})

router.post('/user/update',async (req,res)=>{
      try{
            const reqobj=req.body;
            let curruser=await User.findOne({_id:reqobj.id});
            const ismatch=await bcrypt.compare(reqobj.Validitypassword,curruser.Password);
            if (ismatch){
                  curruser=await MainHelper.assignuserchanges(curruser,reqobj);
                  // console.log(curruser);
                  const ProvidedAddress=curruser.NearestLandmark+' '+curruser.City+' '+curruser.Pincode+' '+curruser.State+' '+curruser.Country;
                  // console.log(ProvidedAddress);
                  const response=await axios.get('https://geocode.search.hereapi.com/v1/geocode?q='+ProvidedAddress+'&apiKey=tbeKC9DJdnRIZ1p5x496OgpIUj2vbL5CWADs8czW5Rk');
                  // console.log(response.data);
                  const coordinates=Object.values(response.data.items[0].position);
                  curruser.PositionCoordinates.length=0;
                  await curruser.PositionCoordinates.push(coordinates[0]);
                  await curruser.PositionCoordinates.push(coordinates[1]);
                  await curruser.save();
                  console.log(curruser);
                  res.status(200).send(curruser);
            }
            else{
                  res.status(400).send("Password Mismatch")
            }
      }catch(err){
            //Mostly due to invalid address
            console.log(err);
            res.status(400).send(err);
      }
})

module.exports =router;