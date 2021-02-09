const Vonage = require('@vonage/server-sdk');
const nodemailer=require('nodemailer');
const axios = require('axios').default;

//Setting up functionality for message-based authentication
const vonage = new Vonage({
      apiKey: 'b054c65b',
      apiSecret: 'gur6FHnIalka5e7d'
});

//Setting up functionality for email-based authentication
const transporter=nodemailer.createTransport({
      service: 'gmail',
      auth:{
            user:'r20324pavitra@dpsrkp.net',
            pass:'PASSWORD'
      }
});

//Setting up functionality for random-otp generation
const GetOtp=()=>{
      return Math.floor(Math.random()*1000000);
}

//Helper function to generate a email body
const EmailBody=(emailid,otp)=>{
      const message={
            from:'r20324pavitra@dpsrkp.net',
            to:emailid.toString(),
            subject:'Thanks for registering.Here is your verification OTP!',
            text:'Your verification OTP is '+otp.toString()+'\nThe OTP should be used within 30 min otherwise all your data will be erased from the database and you will be obliged to redo the registration process.'
      };
      return message;
}

//Helper function to generate a message body
const MessageBody=(otp)=>{
      return 'Greetings from the Team!\n'+'Your verification OTP is '+otp.toString()+'\nThe OTP should be used within 30 min otherwise all your data will be erased from the database and you will be obliged to redo the registration process.';
}

//Helper to verify the otps sent to the user and the ones entered by the user.
const Verificationutil=(user,otpobj)=>{
      const len1=user[0].RecentEmailOtps.length;
      const len2=user[0].RecentMobileOtps.length;
      const final=user[0].RecentEmailOtps[len1-1]==otpobj.body.otp2 && user[0].RecentMobileOtps[len2-1]==otpobj.body.otp1;
      return final;          
}


module.exports={EmailBody,MessageBody,GetOtp,Verificationutil};

