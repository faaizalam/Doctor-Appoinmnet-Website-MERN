
import React, { useEffect, useState} from 'react'
// import {  ToastContainer} from 'react-toastify';
import { toast, ToastContainer } from 'react-toastify'
// import { ToastContainer } from "bootstrap/"

// ..
// import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';
import { RegisterAction } from '../Store/Action';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  // const  {Userinfo,error,isLoading}=useSelector((state)=>state.User)
   const {Userinfo,error,isLoading}= useSelector((state)=>state.Userinfomain)
   
  //  const  {Userinfo:u}=useSelector((state)=>state.Userinfomain)
  const disptach=useDispatch()
  const [name,setname]=useState('')
  const [email,setemail]=useState('')
  const [password,setpassword]=useState('')

 const navigate=useNavigate()
const registersubmit=((e)=>{
  e.preventDefault()
console.log("working")
  disptach(RegisterAction({email,name,password}))

})

useEffect(()=>{
  if (Userinfo.name) {
    navigate("/Home")
    
    
    console.log(Userinfo)
  }
 

},[Userinfo, navigate])







 

  return (
    <div className='mainform'>
     
     
     {isLoading&&(<div>.....loading</div>)}
         {error&&(<div>{error}</div>)} 
          <Form  onSubmit={registersubmit}>
         <h1>Register</h1>
           
        

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>name</Form.Label>
        <Form.Control onChange={(e)=>setname(e.target.value)} type='text' placeholder='name' />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" onChange={(e)=>setemail(e.target.value)}  placeholder="name@example.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>password</Form.Label>
        <Form.Control type="password" onChange={(e)=>setpassword(e.target.value)}  placeholder="password" />
      </Form.Group>
      <Button type='submit'>click</Button>
            
    </Form>
     
    </div>
  )
}
