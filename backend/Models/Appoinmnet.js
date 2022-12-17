import mongoose from "mongoose"

const AppoinmentSchma= new mongoose.Schema({
 Userid:{type:mongoose.Schema.Types.ObjectId, ref:"Dr",reuired:true},
//  Userid:{type:mongoose.Schema.Types.ObjectId, ref:"Dr",reuired:true},
 DoctorInfoId:{type:mongoose.Schema.Types.ObjectId, ref:"Doctors",reuired:true},
 DoctorInfo:{type:Object,required:true},
 UserInfo:{type:Object,required:true},
 date:{type:String,required:true},
 time:{type:String,required:true},
 status:{
    type:Boolean,required:true,default:false
 },
 ch:{type:String}



})


const Appoinmnet=mongoose.model("Appoinment",AppoinmentSchma)
export default Appoinmnet