import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaBell, FaTimesCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import { SAMe } from '../../Component/SAMe';

export const Home = () => {
  const { Userinfo, messages } = useSelector((state) => state.UserLogin)

  // const [loc, setloc] = useState('Home')
  const [AllDrs, setAllDr] = useState([])
  const [Drgetloading, setGetdrloading] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {

    if (!Userinfo.name) {
      navigate("/")

    }




  }, [Userinfo.name, navigate])

  useEffect(() => {
    if (messages) {
      toast(messages)
      console.log("jj")


    }

  }, [messages])
  const RedirectNoti = (() => {
    navigate("/RedirectNoti")
  })

  // AllDr
  useEffect(() => {

    const AlldrApi = (async () => {
      setGetdrloading(true)
      try {
        const { data } = await Axios.get("/postman/Alldrfinal/getAllDr")
        if (data) {
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

  }, [])
  // localStorage.setItem("userInfo",JSON.stringify(payload.user))









  return (
    <>
      <div className='Homemain'>
        <SAMe locationname={"Home"} />

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
          <div>
            {
              Drgetloading && (<div>getting all dr please wait ....</div>)
            }
            <h1>Home</h1>
            <div>
              {
                AllDrs.map((x) => (
                  <div key={x._id} className="maindralllist">
                    <div className='DrallCard'>
                      <ul>
                        <li className='headingname' onClick={()=>navigate(`/Drappoinment/${x._id}`)}>{x.firstname}</li>
                        <li className=''>{x.specilizations}</li>
                        <li className=''>{x.experince}</li>
                        <li className=''>{x.address}</li>
                        <li className=''>{x.feeper}</li>
                      </ul>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>

        </div>
      </div>



    </>

  )
}

