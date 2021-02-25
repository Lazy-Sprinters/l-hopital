const jwt=require('jsonwebtoken');
const Center=require('../models/center');

const auth=async (req,res,next)=>{
      try{
            // console.log(req.body);
            const token=req.body.centerInfo.data.token;
            const decoded=jwt.verify(token,'nodetoreact');
            const user=await Center.findOne({_id:decoded._id,'tokens.token':token});
            // console.log(user.tokens.length);
            if (!user){
                  throw new Error('Error Occured');
            }
            req.token=token;
            req.center=user;//center field is created just now
            next();
      }catch(err){
            console.log('Please authenticate');
            res.status(401).send({error:'Please authenticate'});
      }
}

module.exports=auth;