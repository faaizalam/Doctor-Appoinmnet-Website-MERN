import React, { useEffect, useState } from 'react'
import { FaBell, FaTimesCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { SAMe } from '../../Component/SAMe'
import Form from 'react-bootstrap/Form';
import { TimePicker } from 'antd';
import Axios  from 'axios';
import moment from "moment"
const DrProfile = () => {
    const {Userinfo,messages}= useSelector((state)=>state.UserLogin)
    const [DrProfileloading ,setUpdateDrprofileLoading]=useState(false)
    const [Updatedsucess , setupadtedSucess]=useState(false)
  // Bring dr old profile
  useEffect(()=>{ 
    if(Updatedsucess){
      const Droldprofile=(async()=>{
        const {data}=await Axios.get(`/postman/Drprofile/${Userinfo._id}`,{headers:{authorization:`Berear ${Userinfo.token}`}})
      if (data) {
        setfisrtname(data.firstname||"")
        setlastname(data.lastname||"")
        setemail(data.email||"")
        setphon(data.phonnumber||"")
        setWeb(data.Website||"")
        setaddress(data.address||"")
        setspecail(data.specilizations||"")
        setexp(data.experince||"")
        setfee(data.feeper||"")
        // settime(moment(data.Timigs[0], "HH:mm") ,moment(data.Timigs[1], "HH:mm"))
       
        console.log(data ,"profiel")
        
      }else{
        let error=data.error.message
        console.log(error)
      }

    })
    Droldprofile()
  

    }  

      const Droldprofile=(async()=>{
        const {data}=await Axios.get(`/postman/Drprofile/${Userinfo._id}`,{headers:{authorization:`Berear ${Userinfo.token}`}})
      if (data) {
        setfisrtname(data.firstname||"")
        setlastname(data.lastname||"")
        setemail(data.email||"")
        setphon(data.phonnumber||"")
        setWeb(data.Website||"")
        setaddress(data.address||"")
        setspecail(data.specilizations||"")
        setexp(data.experince||"")
        setfee(data.feeper||"")
      settime([moment(data.Timigs[0], "HH:mm") ,moment(data.Timigs[1], "HH:mm")])
       
       
        
      }else{
        let error=data.error.message
        console.log(error)
      }

    })
    Droldprofile()
  
  },[Updatedsucess, Userinfo._id, Userinfo.token])
    
  const [firstname,setfisrtname]=useState("")
  const [lastname,setlastname]=useState("")
  const [email,setemail]=useState("")
  const [phonnumber,setphon]=useState("")
  const [Website,setWeb]=useState("")
  const [address,setaddress]=useState("")
  const [specilizations,setspecail]=useState("")
  const [experince,setexp]=useState("")
  const [feepers,setfee]=useState()
  const [Timigs,settime]=useState([])
  const onFinish=(async(e)=>{
    e.preventDefault()

    let feeper=Number(feepers)
    console.log(Timigs,"befor")
    const datadr={
      firstname,lastname,email,phonnumber,Website,address,specilizations,experince,Timigs:[moment(Timigs[0]).format("HH:mm"),moment(Timigs[1]).format("HH:mm")],feeper,Userid:Userinfo._id
    }
    setUpdateDrprofileLoading(true)
    try {
      const {data}=await Axios.put(`/postman/Drprofile/Updatedr/${Userinfo._id}`,datadr,{headers:{authorization:`Berear ${Userinfo.token}`}})
      if (data.message==="sucessupdate") {
        setUpdateDrprofileLoading(false)
        setupadtedSucess(true);
        
      }else{
        console.log(data.message)
        setUpdateDrprofileLoading(false)
      }
      
    } catch (error) {
      console.log(error.data.response.message)
      setUpdateDrprofileLoading(false)
      
    }


  })
  return (
    <div className='Homemain'>
    <SAMe locationname={"Profile"}/>
   {/* <SAMe locationname={"Home"}/> */}

   <div className='mainin'>
 <div>

 <div className='headin'>
       <div className=''><FaTimesCircle/></div>
       {
        Userinfo.isDoctor&&(
       <div className='bell'><div>< FaBell/><span className={Userinfo.Unseennotofication.length>0?"rednoti":""}>{Userinfo.Unseennotofication.length}</span></div></div>)
       }
       

  
    
   </div>
 </div>
 <div>

     <h1>Profile</h1>
     {DrProfileloading&&(<div>Updating....</div>)}
     <div>
  <Form onSubmit={onFinish} >
       <div className='doctorform'>
      <Form.Group className="mb-3" controlId="First-Name" >
        <Form.Label>firstname</Form.Label>
        <Form.Control type="text" value={firstname} onChange={((e)=>setfisrtname(e.target.value))} placeholder="First-Name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="lastname">
        <Form.Label>lastname</Form.Label>
        <Form.Control type="text" value={lastname} onChange={((e)=>setlastname(e.target.value))} placeholder="lastname" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" value={email} onChange={((e)=>setemail(e.target.value))} placeholder="name@example.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="phonnumber">
        <Form.Label>phonnumber</Form.Label>
        <Form.Control type="number" value={phonnumber} onChange={((e)=>setphon(e.target.value))} placeholder="phonnumber" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="Website">
        <Form.Label> Website</Form.Label>
        <Form.Control type="url" value={Website}  onChange={((e)=>setWeb(e.target.value))}placeholder=" Website" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="address">
        <Form.Label>address</Form.Label>
        <Form.Control type="text" value={address} onChange={((e)=>setaddress(e.target.value))} placeholder="address" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="specilizations">
        <Form.Label>specilizations</Form.Label>
        <Form.Control type="text" value={specilizations} onChange={((e)=>setspecail(e.target.value))} placeholder="specilizations" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="experince">
        <Form.Label>experince</Form.Label>
        <Form.Control type="text" value={experince} onChange={((e)=>setexp(e.target.value))} placeholder="experince" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="feeper">
        <Form.Label>feeper</Form.Label>
        <Form.Control type="text" value={feepers} onChange={((e)=>setfee(e.target.value))} placeholder="Fee" />
      </Form.Group>
    
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Totime</Form.Label>
        
        <TimePicker.RangePicker  value={Timigs}   onChange={(val)=>settime(val)}  format="HH:mm" />
      </Form.Group>
      </div>

      
      <button type='submit'>submit</button>
     </Form>
  </div>

 </div>

       </div>
       </div>
  )
}

export default DrProfile