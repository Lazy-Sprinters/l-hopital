const validator=require('validator');
const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const centerSchema=mongoose.Schema({
      Name:{
            type:String,
            required:true,
            trim:true
      },
      Address:{
            type:String,
            required:true,
            trim:true
      },
      PhoneNo:{
            type:String,
            required:true
      },
      Email:{
            type:String,
            required:true,
            unique:true,
            trim: true,
            lowercase: true,
            validate(value){
                  if (!validator.isEmail(value)){
                        throw new Error('Email is invalid');
                  }
            }
      },
      Password:{
            type:String,
            required:true,
            minlength:8
      },
      OpeningTime:{
            type:String,
            required:true,
            minlength:8
      },
      ClosingTime:{
            type:String,
            required:true
      },
      RecentMobileOtps:[Number],
      RecentEmailOtps:[Number],
      Status:{
            type:Boolean //true means activated ;;false means not activated
      },
      NearestLandmark:{
            type:String,
            required:true
      },
      City:{
            type:String,
            required:true
      },
      Pincode:{
            type:String,
            required:true
      },
      State:{
            type:String,
            required:true
      },
      Country:{
            type:String,
            required:true
      },
      FrontImage:{
            type:String,
            required:true
      },
      LicenseNum:{
            type:String,
            required:true
      },
      Facilities:[
            {
                 name:{type:String,required:true},
                 capacityperslot:{type:Number,required:true},
                 price:{type:Number,required:true}
                 //of 1 hr ...following COVID-19 Guidelines
            }
      ],
      PositionCoordinates:[Number],
      Reviews:[{
            text:{type:String},
            stars:{type:Number}
      }],
      AvgStars:{
            type:Number,
            required:true
      }
})

const Center=mongoose.model('Center',centerSchema);

module.exports=Center;