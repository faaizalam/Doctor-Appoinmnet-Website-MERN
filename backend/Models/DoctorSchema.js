import mongoose from "mongoose"


const DoctorSchema=new mongoose.Schema({
     Userid:{type:mongoose.Schema.Types.ObjectId,ref:"Dr", required:true},
     firstname:{type:String,required:true},
     lastname:{type:String,required:true},
     email:{type:String,required:true},
     phonnumber:{type:String,required:true},
     Website:{type:String,required:true},
    address:{type:String,required:true},
    specilizations:{type:String,required:true},
    experince:{type:String,required:true},
    feeper:{type:Number,required:true},
    Timigs:{type:Array,required:true},
    status:{type:Boolean,required:true,default:false},
    approved:{type:Boolean,required:true,default:false}
 
    

},{timestamps:true})


const Doctors=mongoose.model("Doctors",DoctorSchema)
export default Doctors