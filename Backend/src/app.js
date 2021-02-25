const express=require('express');
const cors=require('cors');
const cron=require('node-cron');
const updhelepr=require('./helpers/center-registration-helper');
const appointmentHelper=require('./helpers/Appointment-helper');
const Facility=require('./models/facilities');
 
require('./db/mongoose');
const userRouter=require('./routers/user');
const centerRouter=require('./routers/center');
const helperRouter=require('./routers/helper');
// const prescriptionRouter=require('./routers/prescription');
const User=require('./models/user');
const bodyParser=require('body-parser');

const app=express();
const port=process.env.PORT || 5000;

app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(centerRouter);
app.use(helperRouter);

app.get('/',(req,res)=>{
      res.send("Hello,Atleast this is working1");
})

app.listen(port,()=>{
      console.log('Server is running on port:',port);
})

const task=cron.schedule('0 0 * * *',async ()=>{
      const AllFacilities=await Facility.find({});
      for(let i=0;i<AllFacilities.length;i++)
      {
            let subject=AllFacilities[i].SlotAvailability;
            let nsa=[];
            for(let j=0;j<subject.length;j++)
            {
                  if (appointmentHelper.comparedatecurr(d1)==0)
                  {
                        nsa.push(subject[j]);
                  }
            }
            nsa=updhelepr.alteredlist(nsa,AllFacilities[i].Offdays);
            AllFacilities[i].SlotAvailability=nsa;
            await AllFacilities[i].save();
      }
},{
      scheduled:false,
      timezone:'Asia/Kolkata'
});
task.start();