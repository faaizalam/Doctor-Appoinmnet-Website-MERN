import React from 'react'
import { FaBell, FaTimesCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { SAMe } from '../../Component/SAMe'

export const Profile = () => {
  const {Userinfo,messages}= useSelector((state)=>state.UserLogin)
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

     <h1>Profile</h1>
 </div>

       </div>
       </div>
   
   

   </>
  )
}
