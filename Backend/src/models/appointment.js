const validator=require('validator');
const mongoose=require('mongoose');

const appointmentSchema=mongoose.Schema({
      Name:{
            type:String,
            required:true
      },
      Purpose:{
            type:String,
            required:true
      },
      Age:{
            type:Number,
            required:true
      },
      IdType:{
            type:String,
            required:true
      },
      IdNumber:{
            type:String,
            required:true
      },
      PayStatus:{
            type:String,
            required:true
      },
      Amount:{
            type:String,
            required:true
      },
      Email:{
            type:String,
            required:true,
            trim: true,
            lowercase: true,
            validate(value){
                  if (!validator.isEmail(value)){
                        throw new Error('Email is invalid');
                  }
            }
      },
      Center:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'center'
      }
});

const Appointment=mongoose.model('Appointment',appointmentSchema);

module.exports=Appointment;