import  express  from "express";
import expressAsyncHandler from "express-async-handler";
import Doctors from "../Models/DoctorSchema.js";
import { isDoctor, tokencheck } from "../utils.js";

export const DrProfileRoute=express.Router();

// DrProfileRoute.get("/:id",tokencheck,isDoctor,expressAsyncHandler(async(req,res)=>{
//     console.log("hhh")
//    const DrData=await Doctors.findById(req.params.id)
//    if (DrData) {
//     res.send(DrData)
    
// }else{
//        res.send({message:"no "})

//    }



// }))
DrProfileRoute.get("/:id",tokencheck,isDoctor,expressAsyncHandler(async(req,res)=>{
    console.log("hhh")
   const DrData=await Doctors.findOne({Userid:req.params.id}).populate("Userid")
   if (DrData) {
    res.send(DrData)
    
}else{
      res.status(404).send({message:"not found old profile"})

   }



}))
DrProfileRoute.put("/Updatedr/:id",tokencheck,isDoctor,expressAsyncHandler(async(req,res)=>{
    console.log("uppppdate")
   const DrData=await Doctors.findOne({Userid:req.params.id}).populate("Userid")
   if (DrData) {
     DrData.firstname=req.body.firstname||DrData.firstname
     DrData.lastname=req.body.lastname||DrData.lastname
     DrData.email=req.body.email||DrData.email
     DrData.Website=req.body.Website||DrData.Website
     DrData.phonnumber=req.body.phonnumber||DrData.phonnumber
     DrData.address=req.body.address||DrData.address
     DrData.feeper=req.body.feeper||DrData.feeper
     DrData.Timigs=req.body.Timigs||DrData.Timigs
     DrData.specilizations=req.body.specilizations||DrData.specilizations
     DrData.experince=req.body.experince||DrData.experince

     const SucessUpadatedDrprofile=await DrData.save();
      if (SucessUpadatedDrprofile) {
        res.send({message:"sucessupdate"})
        
      }
    
}else{
       res.send({message:"no "})

   }



}))