const express=require('express');
const router=new express.Router();
const Facility=require('../models/facilities');
const Center=require('../models/center');
const FacilityRegHelper=require('../helpers/center-registration-helper');


//Route-1: Adding facilities for a testing center
router.post('/facility/new',async (req,res)=>{
      try{
            let s=new Set();
            req.body.forEach(element => {
                  s.add(element);
            });
            let allprovidedfacilities=Array.from(s);
            console.log(allprovidedfacilities);
            allprovidedfacilities.forEach(async(element) => {
                  const newFac=new Facility(element);
                  const AssociatedCenter=await Center.findOne({_id:element.owner});
                  AssociatedCenter.Alloptions.push(element.Facility);
                  await AssociatedCenter.save();
                  const currdate=FacilityRegHelper.formatdate(new Date());
                  newFac.SlotAvailability=FacilityRegHelper.listofnextsevendays(element.Offdays,currdate,element.CapacityperSlot,AssociatedCenter.OpeningTime,AssociatedCenter.ClosingTime);
                  await newFac.save();
            });
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

module.exports=router;