import mongoose from "mongoose";

const DrSchema=new mongoose.Schema({
  name:{type:String,required:true},
  email:{type:String,required:true},
  password:{type:String,required:true},
  isAdmin:{type:Boolean,default:false},
  isDoctor:{type:Boolean,default:false},
  Seennotofication:{type:Array,default:[]},
  Unseennotofication:{type:Array,default:[]},
  postid:{type:String}
 


})


const Dr=mongoose.model("Dr",DrSchema)
export default Dr