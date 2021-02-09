const User=require('../models/user');
const Chalk=require('chalk');
require('../db/mongoose');

const getdocs=async ()=>{
      try{
            const data=await User.deleteMany({Status:true}).countDocuments();
            console.log(Chalk.red(`Deleted `)+data.toString()+` Non-Verified User-records from the Database at `+new Date().toLocaleString());
      }catch{
            console.log('Some error occured');
      }
}
const filterprocess=setInterval(getdocs,3000);
