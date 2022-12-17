import Axios from 'axios'
import React, { useEffect } from 'react'
import Spinner from 'react-bootstrap/esm/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { MarkSeenAction } from '../Store/Action'
import { login, MarkAction } from '../Store/Reducer'

export const UnseenNoti = () => {
    const {Userinfo}= useSelector((state)=>state.UserLogin)
    const {sucess,isLoading}= useSelector((state)=>state.Mark)
   
    const navigate=useNavigate()
    const dispatch=useDispatch()

    // const [RefreshMark ,setRefreshAfterMarkseen]=useState(false)
  
  const RedirectTonoti=(()=>{
    navigate("/Admin/Notifiaction")
    
  })

  const MarkasSeen=(async()=>{
    
    MarkSeenAction({_id:Userinfo._id},dispatch)
    // setRefreshAfterMarkseen(true)
    const {data}=await Axios.get(`/postman/dr/${Userinfo._id}`)
    if (data.user) {
      let payload=data
      dispatch(login.loginsucess(payload))
      localStorage.setItem("userInfo",JSON.stringify(payload.user))
      // localStorage.removeItem("userInfo")
    }
    // console.log(data,"app")

  })

  useEffect(()=>{
    if (sucess) {
      
      const re=(async()=>{
        const {data}=await Axios.get(`/postman/dr/${Userinfo._id}`)
        console.log(data,"app")
          let payload=data
        if (data.user) {
          dispatch(login.loginsucess(payload))
          
          localStorage.setItem("userInfo",JSON.stringify(data.user))
        }
      })
      re()
      dispatch(MarkAction.ResetNotifee())
    }
       
  
   },[Userinfo._id, dispatch, sucess])


  return (
    <div className='mainUnSeenNoti'>  
    {isLoading&&(<Spinner animation="border" />)}
    <div className='markAll' onClick={()=>MarkasSeen()}><h4>Mark as All read</h4></div> 
    <div className='notimessages'>
        {
           Userinfo.Unseennotofication!==0&&(
            Userinfo.Unseennotofication.map((x,index)=>(
              <div key={index} className='notimsg' onClick={RedirectTonoti}>

                <div>{x.message}</div>
                </div>
            )))
        }

    </div>



    </div>
  )
}
