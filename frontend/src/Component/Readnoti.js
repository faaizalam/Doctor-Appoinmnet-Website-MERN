import Axios  from 'axios'
import React from 'react'
import Spinner from 'react-bootstrap/esm/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { DeleteNotiAction } from '../Store/Action'
import { login } from '../Store/Reducer'


export const Readnoti = () => {


  const {Userinfo}= useSelector((state)=>state.UserLogin)
  // const {sucess,isLoading}= useSelector((state)=>state.Mark)
  const {sucess:Sucessdelet,isLoading:delteloading}= useSelector((state)=>state.DeleteNoti)
  const navigate=useNavigate()
  const dispatch=useDispatch()

const RedirectTonoti=(()=>{
  navigate("/Admin/Notifiaction")
  
})

const DeleteSeen=(async()=>{
 
    
    DeleteNotiAction({_id:Userinfo._id},dispatch)
    // setRefreshAfterMarkseen(true)
    // const {data}=await Axios.get(`/postman/dr/${Userinfo._id}`)
    // if (data.user) {
    //   let payload=data
    //   dispatch(login.loginsucess(payload))
      
      
    //   localStorage.setItem("userInfo",JSON.stringify(payload.user))
    //   // localStorage.removeItem("userInfo")
    // }
    // console.log(data,"app")

 

})
const t=async()=>{
  const {data}= await Axios.get("/postman/Nodefile/t")
  console.log(data)
}

// console.log(window.location.origin)
  return (
    <div className='mainUnSeenNoti'>  
    {delteloading&&(<Spinner animation="border" />)}
    <div className='markAll' onClick={()=>DeleteSeen()}><h4>Delete All</h4></div> 
    <div className='markAll' onClick={()=>t()}><h4>t</h4></div> 
    <div className='notimessages'>
        { Userinfo.Seennotofication!==0&&(
            Userinfo.Seennotofication.map((x,index)=>(
              <div key={index} className='notimsg' onClick={RedirectTonoti}>

                <div>{x.message}</div>
                </div>
            )))
        }

    </div>



    </div>
  )
}
