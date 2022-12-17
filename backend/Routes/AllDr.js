import express from "express"
import expressAsyncHandler from "express-async-handler";
import Appoinmnet from "../Models/Appoinmnet.js";
import Doctors from "../Models/DoctorSchema.js";
import Dr from "../Models/User.js";
import moment from "moment"


export const AllDrFinal=express.Router();

// /postman/Alldrfinal
AllDrFinal.get("/getAllDr",expressAsyncHandler(async(req,res)=>{

    const AlldrList=await Doctors.find({}).populate("Userid");
    if (AlldrList) {
        res.status(201).send(AlldrList)
        
    }else{
        res.status(404).send({message:"sorry No dr Avalabile currently"})
    }

}))
AllDrFinal.get("/specficDrinfo/:id",expressAsyncHandler(async(req,res)=>{
    console.log(req.params.id)

    const AlldrList=await Doctors.findById(req.params.id).populate("Userid");
    if (AlldrList) {
        res.status(201).send(AlldrList)
        
    }else{
        res.status(404).send({message:"sorry No dr Avalabile currently"})
    }

}))



AllDrFinal.post("/Book/:id",expressAsyncHandler(async(req,res)=>{
    console.log(req.body)
    // console.log(req.params.id,"drid")
   const NEWAppoinment = new Appoinmnet({...req.body,time:moment(req.body.time , "HH:mm").toISOString()})
   const savingAppoinment=await NEWAppoinment.save()

   if(savingAppoinment){
    //  console.log(savingAppoinment)
    console.log(req.params.id)
    const DrnotificationForNewAppoinment=await Dr.findById(req.params.id)
    if (DrnotificationForNewAppoinment) {
        DrnotificationForNewAppoinment.Unseennotofication.push({message:`You have a new Appoinment Notification With the date of:${savingAppoinment.date} and Time is ${savingAppoinment.time}`})
        await  DrnotificationForNewAppoinment.save()
        res.status(200).send({message:"Applied for Appoinment succesfully"})
        // console.log(DrnotificationForNewAppoinment)
    }else{
    //    console.log(DrnotificationForNewAppoinment)
    res.send({message:"Unfortunatly Appoinment has been requested but Dr didnt get Notification"})
    return

   }
       


    // res.send({message:"Appoinment has been scheduled"})
    
}else{
       res.send({message:"Appoinment has been scheduled"})

   }
}))



AllDrFinal.post("/Avaliblity/:id",expressAsyncHandler(async(req,res)=>{
const from=moment(req.body.time,"HH:mm").subtract(30,"minutes").toISOString()

const totime=moment(req.body.time,"HH:mm").add(30,"minutes").toISOString()
console.log(from,totime)
const time={time:{$gte:from,$lte:totime}}

const Avalible=await Appoinmnet.find({"DoctorInfo.Userid._id":req.params.id,...time,date:req.body.date})

if(Avalible.length>0){
    res.send({message:"Not avalible"})
    
    // console.log(req.body)
    
}else{
       res.send({message:"Appoinment is Available"})

   }
   
}))