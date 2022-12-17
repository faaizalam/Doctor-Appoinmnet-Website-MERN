import React from 'react'
import { FaTimesCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { SAMe } from '../../Component/SAMe'

export const Appoinment = () => {
  const  {Userinfo}= useSelector((state)=>state.UserLogin)
  return (
    <>
     
     <div className='Homemain'>
    
      <SAMe locationname={"Appoinment"}/>
    {/* <SAMe locationname={"Home"}/> */}

    <div className='mainin'>
  <div>

  <div className='main'>
        <div className='headin'><FaTimesCircle/></div>

   
     
    </div>
  </div>
  <div>

      <h1>Appoinmnet</h1>
  </div>

        </div>
        </div>
    
    

    </>
    
  )
}
