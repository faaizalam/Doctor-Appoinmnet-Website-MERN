import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaBell, FaTimesCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { SAMe } from '../../Component/SAMe'
import moment from "moment"
import Form from 'react-bootstrap/Form';
import { Button, DatePicker, TimePicker } from 'antd'
const DRAppoinmentScreen = () => {
  const [AllDrs, setAllDr] = useState({})
  const { Userinfo, messages } = useSelector((state) => state.UserLogin)
  const [Drgetloading, setGetdrloading] = useState(false)
  const { id: DoctorInfoId } = useParams()
  const Navigate = useNavigate()
  const [times, setTime] = useState("")
  const [SelectedTimes, SetselectedTime] = useState({})
  const [Dates, setDate] = useState("")
  const [Avaliblity, setAvaliblity] = useState(false)
  const [AvaliblityMSG, setAvaliblityMSG] = useState("")
  const [BOOKLODING, SETBOOKLOADING] = useState(false)
  // setTime


  useEffect(() => {

    const AlldrApi = (async () => {
      setGetdrloading(true)
      try {
        const { data } = await Axios.get(`/postman/Alldrfinal/specficDrinfo/${DoctorInfoId}`)
        if (data) {
          setTime(data.Timigs)
          setAllDr(data)
          console.log(data, "alldr")
          setGetdrloading(false)

        }

      } catch (error) {
        console.log(error)
        setGetdrloading(false)


      }

    })
    AlldrApi()

  }, [DoctorInfoId])
  const RedirectNoti = (() => {
    Navigate("/RedirectNoti")
  })
  const onFinish = (async (e) => {
    e.preventDefault()


    SETBOOKLOADING(true)
    try {
      const { data } = await Axios.post(`/postman/Alldrfinal/Book/${AllDrs.Userid._id}`, { Userid: Userinfo._id, UserInfo: {...Userinfo,token:""}, DoctorInfo: AllDrs, date: Dates,time:moment(SelectedTimes).format("HH:mm")})
      if (data) {
        // setAllDr(data)
        console.log(data, "alldr")
        // setGetdrloading(false)

        SETBOOKLOADING(false)
      }

    } catch (error) {
      console.log(error)
      SETBOOKLOADING(false)
      // setGetdrloading(false)


    }






  })


  const ArrayOfHours = ((Start, End) => {
    if (times) {
      let from = times[0].slice(0, 2)
      from = Number(from)
      let to = times[1].slice(0, 2)
      to = Number(to)
      let DisableHoursArray = []
      for (let i = Start; i <= End; i++) {
        DisableHoursArray = [...DisableHoursArray, i];
      }
     DisableHoursArray.splice(from, to - 1)
      // console.log(DisableHoursArray, "problem")
      return DisableHoursArray
    }
  })
 const disabledHours = (() => {
  console.log("click")
    if (times) {
      const hour = ArrayOfHours(0, 24)
      console.log(hour)
      return hour

    }


  })
  disabledHours()



 const  CheckAvailbility=(async()=>{
   setAvaliblity(true)
   try {
     const {data}=await Axios.post(`/postman/Alldrfinal/Avaliblity/${AllDrs.Userid._id}`,{date: Dates, time:moment(SelectedTimes).format("HH:mm")})
     console.log(data.message,"normal")
     if (data.message==="Appoinment is Available") {

       setAvaliblityMSG(data.message)
       setAvaliblity(false)
       
       
       
      }else{
        setAvaliblity(false)
        
        setAvaliblityMSG(data.message)
      }
      
    } catch (error) {
      setAvaliblity(false)
      let errors =error.response&&error.response.data.message?error.response.data.message:error.message
      setAvaliblityMSG(errors)
    
  }

  })

  

 
  return (
    <div className='Homemain'>
      <SAMe />
      <div className='mainin'>
        <div className='headin'>
          <div className=''><FaTimesCircle /></div>
          {
            Userinfo.isAdmin ? (
              <div className='bell'><div onClick={RedirectNoti}>< FaBell /><span className={Userinfo.Unseennotofication.length > 0 ? "rednoti" : ""}>{Userinfo.Unseennotofication.length}</span></div></div>) : Userinfo.isDoctor ? (<div className='bell'><div onClick={RedirectNoti}>< FaBell /><span className={Userinfo.Unseennotofication.length > 0 ? "rednoti" : ""}>{Userinfo.Unseennotofication.length}</span></div></div>) : (<div>< FaBell /></div>)
          }
          {/* {
        Userinfo.name&&Userinfo.isDoctor?(
       <div className='bell'><div onClick={RedirectNoti}>< FaBell/><span className={Userinfo.Unseennotofication.length>0?"rednoti":""}>{Userinfo.Unseennotofication.length}</span></div></div>):(<div><FaBell/></div>)
       } */}





        </div>
        {Drgetloading && <div>Loading......</div>}
        <div className='MainbasicinfoDr'>

          <div className='Timings'>
            <h6>Timings {Avaliblity && (<span> we are checking</span>)}</h6>
            {AvaliblityMSG&& AvaliblityMSG}

            <span>{AllDrs.Timigs && AllDrs.Timigs[0]}</span>
            {"  : "}
            <span>{AllDrs.Timigs && AllDrs.Timigs[1]}</span>
            {/* <span>{sAllDrs.Timigs[1]}</span> */}
            {/* <div> */}

            <Form onSubmit={onFinish} >
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <DatePicker format="DD-MM-YYYY" onChange={(value) => setDate(moment(value).format("DD-MM-YYYY"))} />
                <Form.Label>Totime</Form.Label>
                <TimePicker disabledHours={disabledHours}  onChange={(value)=>SetselectedTime(value)} format="HH:mm" />
              </Form.Group>
              {/* onChange={(val)=>settime(val)}  format="HH:mm" */}


              <button type='button' onClick={CheckAvailbility}>Check Avaliblity</button>
              <button type='submit'>Book now</button>

            </Form>
            {/* </div> */}

          </div>
          <div className='BasicInfo'>
            <h1>Basic Info</h1>


          </div>

        </div>
      </div>
    </div>
  )
}

export default DRAppoinmentScreen