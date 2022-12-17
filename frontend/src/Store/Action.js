 import {Register,login, Applydr, MarkAction, DeleteAction} from "../Store/Reducer"
import Axios from "axios"
// import { Toast } from "react-toastify/dist/components"

// import { toast } from "react-toastify"


export const RegisterAction=((datas)=>(async(disptach)=>{
   
   
     disptach(Register.Registerloading())
     
     try {
        const {data}=await Axios.post('/postman/dr/register',datas)
     console.log(data)
          if(data.user.name){
            let payload=data
             
            disptach(Register.RegisterSucess(payload))
            disptach(login.loginsucess(payload))

            localStorage.setItem("userInfo",JSON.stringify(payload.user))

                

          }else{
            let payload=data.message
          
            disptach(Register.Registerfaild(payload))
          }
        } catch (error) {
            console.log(error)
           let  payload=error.response&& error.response.data.message?error.response.data.message:error.message
          

            
            disptach(Register.Registerfaild(payload))
    }


}))




export const LoginAction=((datas)=>(async(disptach)=>{
   
  // toast("works")  
   
  console.log("wo")
  disptach(login.loginloading())
  
  try {
    const {data}=await Axios.post('/postman/dr/login',datas)
    console.log(data)
    if(data.user.name){
      // toast("works")  
      console.log("in")
      let payload=data
     
      disptach(login.loginsucess(payload))
      
      
      localStorage.setItem("userInfo",JSON.stringify(payload.user))


       }else{
         let payload=data.message
        
         disptach(login.loginfail(payload))
       }
     } catch (error) {
         console.log(error)
        let  payload=error.response&& error.response.data.message?error.response.data.message:error.message
         

         
         disptach(login.loginfail(payload))
 }


}))














export const Usersignout=(()=>(disptach)=>{

  console.log("workkkkk")
  

  disptach(login.Userlogout())
  // disptach(login.Userlogout("no"))
  disptach(Register.Registerlogout())
  

  localStorage.removeItem("userInfo")
    

})

export const Userreset=(()=>(disptach)=>{
  disptach(login.Userloginerrorreset())
  
})

// .....Doctor

export const DrApplyAction=((datas)=>(async(disptach)=>{
  const tok=localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")):{}
  disptach(Applydr.Applyloading())
  try {
    const {data}=await Axios.post("/postman/apply/doctor",datas,{
      headers:{
        authorization:`Berear ${tok.token}`
      }
    })
    if (data.resdoctore.firstname) {
      console.log(data)
          let payload=data.resdoctore

       disptach(Applydr.Applysuccs(payload))
       
      }else{
        let payload=data.message
       disptach(Applydr.Applyfaild(payload))
       
      }
      
      
      
      
    } catch (error) {
      let payload=error.response&&error.response.data.message?error.response.data.message:error.message
      
      disptach(Applydr.Applyfaild(payload))
  }
   
 


}))



// .........
// MarkSeenAction
// export const MarkSeenAction=(datas)=>(dispatch)=>{
  export const MarkSeenAction=async(datas,dispatch)=>{
   const tok=localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")):{}
  console.log("hhlll",datas)
    dispatch(MarkAction.Markloading())
  try {
    const {data}=await Axios.post(`/postman/apply/seen/${datas._id}`,{},{headers:{authorization:`Berear ${tok.token}`}})
   console.log(data.user.name)
    if (data.user.name) {
      console.log(data,"inmark")
      let payload=data
      dispatch(MarkAction.MarkSucess(payload))
      
      
    }else{
      let payload=data.message
      
      dispatch(MarkAction.MarkFaild(payload))
    }
    
    
  } catch (error) {
    let payload=error.response&&error.response.data.message?error.response.data.message:error.message
      
      dispatch(MarkAction.MarkFaild(payload))
    
  }

}


// ..
// DeleteNoti

export const DeleteNotiAction=async(datas,dispatch)=>{
  const tok=localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")):{}
  console.log(datas,tok.authorization)
  dispatch(DeleteAction.Deleteloading())
  try {
    const {data}=await Axios.delete(`/postman/dr/Delete/${datas._id}`,{
      headers:{
      authorization:`Berear ${tok.token}`
    }
  })
  if (data.user.name) {

    let payload=data
    dispatch(DeleteAction.DeleteSucss(payload))
    dispatch(login.loginsucess(payload))
    localStorage.setItem("userInfo",JSON.stringify(payload.user))
    
  }else{
    let payload=data.message
    dispatch(DeleteAction.Deletefail(payload))
  }
  
} catch (error) {
  let payload=error.response&&error.response.data.message
    dispatch(DeleteAction.Deletefail(payload))
    
  }


}