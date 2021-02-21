const jwt=require('jsonwebtoken');
const User=require('../models/user');

const auth=async (req,res,next)=>{
      try{
            // console.log(req.body);
            const token=req.body.userInfo.data.token;
            const decoded=jwt.verify(token,'nodetoreact');
            const user=await User.findOne({_id:decoded._id,'tokens.token':token});
            if (!user){
                  throw new Error('Error Occured');
            }
            req.token=token;
            req.user=user;
            next();
      }catch(err){
            console.log('Please authenticate');
            res.status(401).send({error:'Please authenticate'});
      }
}

module.exports=auth;