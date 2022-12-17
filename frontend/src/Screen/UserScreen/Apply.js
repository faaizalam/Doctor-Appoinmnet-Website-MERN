import React, { useEffect, useState } from 'react'
import { FaTimesCircle,FaBell } from 'react-icons/fa'
import { SAMe } from '../../Component/SAMe'
import Form from 'react-bootstrap/Form';
import { TimePicker } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { DrApplyAction } from '../../Store/Action';
import Spinner from 'react-bootstrap/esm/Spinner';
import { useNavigate } from 'react-router-dom';
import Axios  from 'axios';
import moment from "moment"

const Apply = () => {
   
  const [Timigs,settime]=useState([])
  const [firstname,setfisrtname]=useState("")
  const [lastname,setlastname]=useState("")
  const [email,setemail]=useState("")
  const [phonnumber,setphon]=useState("")
  const [Website,setWeb]=useState("")
  const [address,setaddress]=useState("")
  const [specilizations,setspecail]=useState("")
  const [experince,setexp]=useState("")
  const [feepers,setfee]=useState()
  const dispatch=useDispatch()

  const  {isLoading,error,sucess}= useSelector((state)=>state.ApplyStore)
  const  {Userinfo}= useSelector((state)=>state.UserLogin)

  const navigate=useNavigate()
  useEffect(()=>{

    const RedirectIFAppliedAlready=async()=>{
      
      const {data}=await Axios.get(`/postman/apply/status/${Userinfo._id}`)
  
      if (data.status) {
        navigate("/Home")
        
      }
      
    } 
    RedirectIFAppliedAlready()
    if (sucess) {
      
      navigate("/Home")
      
    }

  },[Userinfo._id, navigate, sucess])

  const onFinish=((e)=>{
    e.preventDefault()

    let feeper=Number(feepers)
    const datadr={
      firstname,lastname,email,phonnumber,Website,address,specilizations,experince,Timigs:[moment(Timigs[0].format("HH:mm")),moment(Timigs[0].format("HH:mm"))],feeper,Userid:Userinfo._id
    }
//     (alias) t(data: any): (f: any) => void
// import t
     dispatch(DrApplyAction(datadr))
    // console.log(datadr)

  })
 

  


  return (
    <>
     
    <div className='Homemain'>
    <SAMe locationname={"Apply"}/>
   {/* <SAMe locationname={"Home"}/> */}

   <div className='mainin'>
 <div>

 <div className='headin'>
       <div className=''><FaTimesCircle/></div>
       <div className=''><FaBell/></div>
       

  
    
   </div>
 </div>
 <div className='Applydoctor'> 
  <h3>Apply to be a Doctor</h3>
  {isLoading&&(<Spinner animation="border" />)}
  {error&&(<div>{error}</div>)}
  {/* Userid:{type:mongoose.Schema.Types.ObjectId,ref:"Dr", required:true},
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    email:{type:String,required:true},
    phonnumber:{type:String,required:true},
    Website:{type:String,required:true},
    address:{type:String,required:true},
    specilizations:{type:String,required:true},
    experince:{type:String,required:true},
    feeper:{type:Number,required:true},
    Fromtime:{type:String,required:true},
    Totime:{type:String,required:true} */}


  <div>
  <Form onSubmit={onFinish} >
       <div className='doctorform'>
      <Form.Group className="mb-3" controlId="First-Name" >
        <Form.Label>firstname</Form.Label>
        <Form.Control type="text" onChange={((e)=>setfisrtname(e.target.value))} placeholder="First-Name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="lastname">
        <Form.Label>lastname</Form.Label>
        <Form.Control type="text" onChange={((e)=>setlastname(e.target.value))} placeholder="lastname" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" onChange={((e)=>setemail(e.target.value))} placeholder="name@example.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="phonnumber">
        <Form.Label>phonnumber</Form.Label>
        <Form.Control type="number" onChange={((e)=>setphon(e.target.value))} placeholder="phonnumber" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="Website">
        <Form.Label> Website</Form.Label>
        <Form.Control type="url"  onChange={((e)=>setWeb(e.target.value))}placeholder=" Website" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="address">
        <Form.Label>address</Form.Label>
        <Form.Control type="text" onChange={((e)=>setaddress(e.target.value))} placeholder="address" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="specilizations">
        <Form.Label>specilizations</Form.Label>
        <Form.Control type="text" onChange={((e)=>setspecail(e.target.value))} placeholder="specilizations" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="experince">
        <Form.Label>experince</Form.Label>
        <Form.Control type="text" onChange={((e)=>setexp(e.target.value))} placeholder="experince" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="feeper">
        <Form.Label>feeper</Form.Label>
        <Form.Control type="text" onChange={((e)=>setfee(e.target.value))} placeholder="Fee" />
      </Form.Group>
    
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Totime</Form.Label>
        
        <TimePicker.RangePicker onOk={(t)=>settime(t)}  />
      </Form.Group>
      </div>

      
      <button type='submit'>submit</button>
     </Form>
  </div>

 </div>

       </div>
       </div>
   
   

   </>
  )
}

export default Apply