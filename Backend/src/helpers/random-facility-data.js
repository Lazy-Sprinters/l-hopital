const fs=require('fs');
const faker=require('faker');
const Center=require('../models/center');
require('../db/mongoose');

const daysarr=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const names=["Thypoid","Thyroid","Diabetes","CT Scan","MRI","Neuro Scan","Thermal Scan"];
const randomdata=async ()=>{
      try{
            let data=[];
            const allcenters=await Center.find({});
            let allids=[];
            allcenters.forEach(element => {
                  allids.push(element._id);
            });
            for(let i=0;i<30;i++)
            {
                  const obj=
                  {
                        FacilityName:names[faker.random.number()%(names.length)],
                        CapacityperSlot:1+faker.random.number()%5,
                        Price:1+faker.random.number()%500,
                        Offdays:[daysarr[faker.random.number()%7]],
                        owner:allids[faker.random.number()%(allids.length)]
                  }
                  data.push(obj);
            }
            fs.appendFileSync('demo-facility-data',"[\n");
            data.forEach(element => {
                  const flag=JSON.stringify(element);
                  fs.appendFileSync('demo-facility-data',flag);
                  fs.appendFileSync('demo-facility-data',',');
                  fs.appendFileSync('demo-facility-data',"\n");
            });
            fs.appendFileSync('demo-facility-data',"]");
      }catch(err){
            console.log(err);
      }
}
randomdata();
