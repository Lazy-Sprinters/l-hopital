const express=require('express');
const router=new express.Router();
const Facility=require('../models/facilities');
const Center=require('../models/center');

const daysarr=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

// router.post('/facility/new',async (req,res)=>{
//       const facility=new Facility(req.body);
//       try{
            
//       }catch(err){
//             res.status(400).send();
//       }
// })


module.exports=router;