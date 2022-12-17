import React, { useEffect, useState } from 'react'
import { FaBell, FaTimesCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Readnoti } from '../../Component/Readnoti'
import { SAMe } from '../../Component/SAMe'
import { UnseenNoti } from '../../Component/UnseenNoti'

const Notification = () => {
    const {Userinfo,messages}= useSelector((state)=>state.UserLogin)
    const [tab,settab]=useState("Unread")
    const {sucess}= useSelector((state)=>state.Mark)
  

  return (
    <>
     
    <div className='Homemain'>
    <SAMe locationname={"Profile"}/>
   {/* <SAMe locationname={"Home"}/> */}

   <div className='mainin'>
 <div>

 <div className='headin'>
       <div className=''><FaTimesCircle/></div>
       {
        Userinfo.isAdmin&&(
       <div className='bell'><div>< FaBell/><span className={Userinfo.Unseennotofication.length>0?"rednoti":""}>{Userinfo.Unseennotofication.length}</span></div></div>)
       }
       

  
    
   </div>
 </div>
 <div>

   <h3>Notifications</h3>
   <div className='menus'>
    <div className={tab==="Unread"?"menutab":""} onClick={()=>settab("Unread")}>Unread</div>
    <div className={tab==="Read"?"menutab":""} onClick={()=>settab("Read")}>Read</div>

   </div>
   <hr/>
   <div className='NotiPages'> 
   {
    tab==="Unread"&&(<UnseenNoti/>)
    // (tab==="Unread"&&sucess)?(<Readnoti/>):(tab==="Unread"&&(<UnseenNoti/>))
   }
   {
    tab==="Read"&&(<Readnoti/>)
   }

   </div>


 </div>

       </div>
       </div>
   
   

   </>
  )
}

export default Notification