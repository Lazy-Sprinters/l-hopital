const express=require('express');
const router=new express.Router();
const Facility=require('../models/facilities');
const Center=require('../models/center');
const Mainhelper=require('../helpers/all-utility');
const FacilityRegHelper=require('../helpers/center-registration-helper');


//Route-1: Adding facilities for a testing center
router.post('/facility/new',async (req,res)=>{
      try{
            let s=new Set();
            req.body.forEach(element => {
                  s.add(element);
            });
            let allprovidedfacilities=Array.from(s);
            console.log(allprovidedfacilities.length);
            for(let i=0;i<allprovidedfacilities.length;i++)
            {
                  const element=allprovidedfacilities[i];
                  const newFac=new Facility(element);
                  const AssociatedCenter=await Center.findOne({_id:element.owner});
                  AssociatedCenter.Alloptions.push(element.FacilityName);
                  await AssociatedCenter.save();
                  const currdate=FacilityRegHelper.formatdate(new Date());
                  newFac.SlotAvailability=FacilityRegHelper.listofnextsevendays(element.Offdays,currdate,element.CapacityperSlot,AssociatedCenter.OpeningTime,AssociatedCenter.ClosingTime);
                  await newFac.save();
            }
            res.status(201).send("Shayad ho gaya");
      }catch(err){
            res.status(400).send(err);
      }
})

router.post('/facility/all',async(req,res)=>{
      try{
            let s=new Set();
            const alldata=await Facility.find({});
            alldata.forEach(element => {
                  s.add(element.FacilityName);
            });
            const ret=Array.from(s);
            res.status(200).send(ret);
      }catch(err){
            res.status(404).send();
      }
})

router.post('/facility/slots',async (req,res)=>{
      console.log(req.body);
      try{
            const own=req.body.cen._id;
            const fac=req.body.service;
            const date=req.body.askeddate;
            const CurrentUser=req.body.Client;
            const facility=await Facility.findOne({owner:own,FacilityName:fac});
            let ret=Mainhelper.getallopenslots(facility,date);
            if (ret.length!=0){
                  const finalretvalue={
                        allslots:ret,
                        center:req.body.cen,
                        service:fac,
                        dis:req.body.dis,
                        costing:req.body.costing,
                        concerneddate:req.body.askeddate,
                        user:CurrentUser
                  }
                  // console.log(finalretvalue);
                  res.status(200).send(finalretvalue);
            }
            else{
                  res.status(404).send("No empty slot found for the date");
            }
      }catch(err){
            console.log(err);
            res.status(404).send("No Open Slots found!");
      }
})

module.exports=router;