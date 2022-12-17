
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner';

// ..
// import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LoginAction, Userreset } from '../Store/Action';

export const Login = () => {
  const [email,setemail]=useState('')
  let [times,settimes]=useState(30)
  let [n,setn]=useState(0)
  const [password,setpassword]=useState('')
  const [dis,setdis]=useState(false)
  const  {Userinfo,error,isLoading}= useSelector((state)=>state.UserLogin)
  const [err,seterr]=useState("")
  const navigate=useNavigate()
  
  const disptach=useDispatch()

  const loginsubmit=((e)=>{
    e.preventDefault()

  console.log("working")
    disptach(LoginAction({email,password}))
  
  })
  useEffect(()=>{
    // console.log(Userinfo,'h')
    if (Userinfo.name) {
      navigate("/Home")
      
      
    }
   
  
    // console.log(Userinfo)
  },[Userinfo.name, navigate])

  
  useEffect(()=>{
    let errs=error

  
//  settimes(4)
   
  if(errs==="Request failed with status code 429"){
    
    
    
    let nn = setInterval(()=>{
      if (times>0) {
      settimes(times-1)
      setdis(true)
        
      }else{
        setdis(false)
        settimes(4)
        disptach(Userreset())
      
      }
      
    },1000)
    return (()=>clearInterval(nn))
    
    
  }
  // let n=0
  
  //  return clearInterval(e)
  

  
  // clearInterval(e)
  // if (times===0) {
  //   setdis(false)
  //   seterr("")
  //   console.log("jj") 
  // }
  const sitv=()=>{
    setn(n+1)
    console.log("num")
  }
  const e=setInterval(sitv,1000)
  return(()=>clearInterval(e))

},[error, times, err, disptach,n])




  return (
  <>
  
    {isLoading&&(<Spinner animation="border" />)}
    <div className='mainform'>
      
         {error&&(<div>{error}</div>)}
         {(<div>{n}</div>)}
         {/* {!dis&&(<div>{times}</div>)} */}

        <Form onSubmit={loginsubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" onChange={(e)=>setemail(e.target.value)}  placeholder="name@example.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>password</Form.Label>
        <Form.Control type="password" onChange={(e)=>setpassword(e.target.value)}  placeholder="password" />
      </Form.Group>
      <Button type='submit' disabled={dis?true:false}>click</Button>
            
    </Form>
       
     
    </div>
    </>
  )
}
