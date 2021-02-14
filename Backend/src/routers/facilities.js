const express=require('express');
const router=new express.Router();
const Facility=require('../models/facilities');
const Center=require('../models/center');



router.post('/facility/new',async (req,res)=>{
      const facility=new Facility(req.body);
      try{
            
      }catch(err){
            res.status(400).send();
      }
})

router.post('/facility/all',async(req,res)=>{
      console.log(req.body);
      const alloptions=["Thypoid","Diabetes","Rabies"];
      res.status(200).send(alloptions);
})

module.exports=router;