const User=require('../models/user');
const Center=require('../models/center');
const Appointment=require('../models/appointment');
const Facility=require('../models/facilities');
const express=require('express');
const router=new express.Router();


//Route-1 Registering a appointment
router.post('/appointment/new',async(req,res)=>{
      try{
            const queryobj=req.body.CentreValue;
            const existing=await Appointment.findOne({user_id:queryobj.Client._id,dateofappointment:queryobj.askeddate,facilityused:queryobj.service,Slotdetails:req.body.selectedTime,center_id:queryobj.cen._id});
            if (existing==null)
            {
                  const newappointment=new Appointment({
                        user_id:queryobj.Client._id,
                        center_id:queryobj.cen._id,
                        dateofappointment:queryobj.askeddate,
                        amount:queryobj.costing,
                        facilityused:queryobj.service,
                        Slotdetails:req.body.selectedTime[0]
                  });
                  const facility=await Facility.findOne({Price:queryobj.costing,FacilityName:queryobj.service,owner:queryobj.cen._id});
                  for(let i=0;i<facility.SlotAvailability.length;i++)
                  {
                        const o1=facility.SlotAvailability[i];
                        if (o1.date==queryobj.askeddate)
                        {
                              for(let j=0;j<o1.slotinfo.length;j++)
                              {
                                    const o2=o1.slotinfo;
                                    if (o2[j].det1==req.body.selectedTime)
                                    {
                                          facility.SlotAvailability[i].slotinfo[j].det2--;
                                    }
                              }
                        }
                  }
                  await facility.save();
                  newappointment.save();
                  res.send(newappointment);
            }
            else
            {
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
            if (allappointments.length==0)
            {
                  res.status(404).send();
            }
            else
            {

                  // ans.push(createData(x[i].CenterName,x[i].TestName,x[i].TestDate,x[i].AmountPaid,x[i].Status,x[i].Result,x[i].TimeSlot,x[i].ContactDet,x[i]));
                  console.log(allappointments);
                  for(let i=0;i<allappointments.length;i++)
                  {
                        const concernedcenter=await Center.findOne({_id:allappointments[i].center_id});
                        const obj1={
                              CenterName:concernedcenter.Name,
                              TestName:allappointments[i].facilityused,
                              TestDate:allappointments[i].dateofappointment,
                              AmountPaid:allappointments[i].amount,
                              //add handler for missed tests also so as to calculate penalty
                              Status:((new Date(allappointments[i].dateofappointment).getTime())<=(new Date().getTime())?"Completed":"Upcoming"),
                              Result:((allappointments[i].ResultStatus==true)?"Ready":"In Process"),
                              TimeSlot:allappointments[i].Slotdetails,
                              ContactDet:concernedcenter.PhoneNo,
                              Cenid:concernedcenter._id
                        }
                        ret.push(obj1);
                  }
                  console.log(ret);
                  res.status(200).send(ret);
            }
      }catch(err){
            console.log(err);
            res.status(400).send(err);
      }
});

module.exports=router;