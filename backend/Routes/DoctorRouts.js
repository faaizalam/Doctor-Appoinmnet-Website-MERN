import express from "express";
import expressAsyncHandler from "express-async-handler";
import Doctors from "../Models/DoctorSchema.js";
import Dr from "../Models/User.js";
import { tokencheck } from "../utils.js";


const DoctorRoutes = express.Router();

DoctorRoutes.get("/status/:id",expressAsyncHandler(async(req,res)=>{
  const Userid=await Doctors.findOne({Userid:req.params.id})
  if (Userid) {
    res.status(201).send({status:true})
    
  }else{
   
    res.status(404).send({status:false})
  }



}))




// ..Doctore Apply
DoctorRoutes.post("/doctor",tokencheck,expressAsyncHandler(async(req, res) => {
  console.log(req.body)
        const doctorereate = new Doctors(req.body)
        // const Adminnoti= await Admin.save()
        
        if (doctorereate) {
            
            const resdoctore = await doctorereate.save()
            // const Admin = await Dr.findOne({ isAdmin: true })
            const Admin=await Dr.find({isAdmin:true})
            
            if (Admin) {
                // console.log(Admin)
                
                Admin.filter((x)=>x.Unseennotofication.push({
                    type: "New_Dr_Request",
                    message: `${resdoctore.firstname} ${resdoctore.lastname} has applied for Doctor`,
                    data: { doctoreId: resdoctore._id, name: `${resdoctore.firstname} ${resdoctore.lastname} has applied` }
                }))
                
                // const Adminnoti = await Admin.save()
                  const Adminnoti=Admin.filter((x)=>x.save())
               
                // console.log(Adminnoti)
                
                res.status(200).send({message:"Applied for Doctor succesfully",resdoctore})
            }else{
                res.send({message:"no admin"})
            }
          
        } else {
            res.send({ message: "Applied error" })
        }

    
    


}))

DoctorRoutes.post("/seen/:id",tokencheck,expressAsyncHandler(async(req,res)=>{
   const AdminNoti=await Dr.findById(req.params.id)
   if (AdminNoti) {
    AdminNoti.Seennotofication=[...AdminNoti.Seennotofication,...AdminNoti.Unseennotofication]
    AdminNoti.Unseennotofication=[]

    const madeallseen=await AdminNoti.save()
    res.send({user:madeallseen})

    
   }else{
    res.status(404).send({message:"Not found the user"})
   }

}))


let pagelimit=3
DoctorRoutes.get("/drlist",tokencheck,expressAsyncHandler(async(req,res)=>{
  // const drlist=await Doctors.remove()
  // res.send({message:"delete"})
  console.log("delist")
  const pageNo=Number(req.query.pageNo)||1
  const drlist=await Doctors.find({}).skip(pagelimit*(pageNo-1)).limit(pagelimit).populate("Userid")
  const totaldata= await Doctors.find({}).countDocuments()
 
 if (drlist) {
  res.status(200).send({message:"Succ",drlist,totaldata,pages:Math.ceil(totaldata/pagelimit)})
  
}else{
  
  res.status(404).send({message:"No user found might no user or your session is expired"})
 }


}))


// ...Approving dr
DoctorRoutes.put("/status/:id",tokencheck,expressAsyncHandler(async(req,res)=>{
  const id=req.params.id
  console.log(id)
  const approveresponse=await Doctors.findOne({Userid:req.params.id}).populate("Userid")
  const mainuserSchm=await Dr.findById(req.params.id)
  if (approveresponse&&mainuserSchm) {
    
    mainuserSchm.isDoctor=true
    approveresponse.status=true
    approveresponse.approved=true
   mainuserSchm.Unseennotofication.push({
      type: "Congratulations",
      message: `You have been approved for Doctor`,
    })
    const finalapprovresponse=await approveresponse.save()
    const finalmainuser=await mainuserSchm.save()
    res.send({message:"sucess",finalapprovresponse,finalmainuser})

  }else{
    console.log("no user")
  }
 

}))


DoctorRoutes.delete("/Block/:id",expressAsyncHandler(async(req,res)=>{
  const User=await Dr.findById(req.params.id)
  
  if (User) {
     User.Unseennotofication.push({type:"Not Verified",message:"Unfortunatly could not verified"})
     const notifisent= await User.save()
     if (notifisent) {
      console.log(notifisent)
       const Userid=await Doctors.findOneAndDelete({Userid:req.params.id}).populate("Userid")
       res.send({message:"has been delete",block:true})

      
     }
    


    

   
    
  }else{
   
    res.status(404).send({message:"Could not found"})
  }



}))

export default DoctorRoutes