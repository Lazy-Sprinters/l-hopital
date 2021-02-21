const User=require('../models/user');
const Center=require('../models/center');
const Appointment=require('../models/appointment');
const Facility=require('../models/facilities');
const MainHelper=require('../helpers/all-utility');
const express=require('express');
const router=new express.Router();


//Route-1 Registering a appointment
router.post('/appointment/new',async(req,res)=>{
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

//Route-2 Sending all appointments for a user
router.post('/appointment/all',async(req,res)=>{
      try{
            const userinquestion=await User.find({_id:req.body.data._id});
            const allappointments=await Appointment.find({user_id:req.body.data._id});
            //it can be an array of objects
            let ret=[];       
            if (allappointments.length==0){
                  res.status(404).send();
            }
            else{
                  for(let i=0;i<allappointments.length;i++){
                        const concernedcenter=await Center.findOne({_id:allappointments[i].center_id});
                        ret.push(MainHelper.getformatshowappointment(concernedcenter,allappointments[i]));
                  }
                  res.status(200).send(ret);
            }
      }catch(err){
            console.log(err);
            res.status(400).send(err);
      }
});

module.exports=router;