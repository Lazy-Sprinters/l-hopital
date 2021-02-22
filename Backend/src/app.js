const express=require('express');
const cors=require('cors');
const faker=require('faker');
const axios=require('axios');
const Center=require('./models/center');
 
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


//functionality to remove non-verified users from the database 
//to reduce server load
// const getdocs=async ()=>{
//       try{
//             const data=await User.deleteMany({Status:false});
//             console.log(Chalk.red(`Deleted `)+data.deletedCount.toString()+` Non-Verified User-records from the Database at `+new Date().toLocaleString());
//       }catch{
//             console.log('Some error occured');
//       }
// }
// const filterprocess=setInterval(getdocs,1800000);