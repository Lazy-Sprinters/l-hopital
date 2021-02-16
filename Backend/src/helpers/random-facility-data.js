const fs=require('fs');
const faker=require('faker');
const Center=require('../models/center');
require('../db/mongoose');

const daysarr=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const randomdata=async ()=>{
      try{
            let data=[];
            const allcenters=await Center.find({});
            let allids=[];
            allcenters.forEach(element => {
                  allids.push(element._id);
            });
            for(let i=0;i<allids.length;i++)
            {
                  const obj=
                  {
                        FacilityName:"Thyroid",
                        CapacityperSlot:1+faker.random.number()%5,
                        Price:1+faker.random.number()%500,
                        Offdays:[daysarr[faker.random.number()%7]],
                        owner:allids[i]
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
