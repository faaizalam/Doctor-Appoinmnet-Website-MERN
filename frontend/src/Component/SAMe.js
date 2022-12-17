import React, { useEffect, useState } from 'react'
import { FaRegIdBadge, FaBriefcaseMedical, FaTimesCircle, FaHouseUser } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Home } from '../Screen/UserScreen/Home';



export const SAMe = (props) => {
  const { pathname } = useLocation()
  const name = pathname.slice(1, pathname.length)
  const { Userinfo } = useSelector((state) => state.UserLogin)
  console.log()
  const [loc, setloc] = useState("Home")
  const handle = (num) => {
    setloc(num)
  }
  useEffect(() => {
    if (loc) {

      setloc(name)
      console.log(name)

    }
  }, [loc, name])


  return (
    <>


      <div className='side'>
        <h4>
          The Offical Web
          {Userinfo.name&&Userinfo.isDoctor?<div>Doctor</div>:Userinfo.name}
        </h4>
        <div className={loc === "Home" ? 'ad' : "hovers"}>
          <Link onClick={() => handle("Home")} className='a' to="/Home"><FaHouseUser />{"  "}Home</Link>

        </div>

        {
          (Userinfo.name && Userinfo.isAdmin) ? (<div className={loc === "users" ? 'ad' : "hovers"}> <Link onClick={() => handle("users")} className='a' to="/users" ><FaRegIdBadge />{" "}Users</Link></div>) : (<div className={loc === "Appoinment" ? 'ad' : "hovers"}>
            <Link onClick={() => handle("Appoinment")} className='a' to="/Appoinment" ><FaRegIdBadge />{" "}Appoinment</Link>

          </div>)

        }

        {
          (Userinfo.name && Userinfo.isAdmin) ? (<div className={loc === "Doctors" ? 'ad' : "hovers"}> <Link onClick={() => handle("Doctors")} className='a' to="/Doctors" ><FaRegIdBadge />{" "}Doctors</Link></div>) : (<div className={loc === "Apply" ? 'ad' : "hovers"}>
            <Link onClick={() => handle("Apply")} className='a' to="/Apply"><FaBriefcaseMedical />{" "} Apply Doctor</Link>

          </div>)


        }

        {

          Userinfo.name && Userinfo.isAdmin && (<div className={loc === "Profile" ? 'ad' : "hovers"}> <Link onClick={() => handle("Profile")} className='a' to="/Profile" ><FaRegIdBadge />{" "}Profile</Link></div>)


        }

        {

          Userinfo.name && Userinfo.isDoctor && (<div className={loc === "Profile" ? 'ad' : "hovers"}> <Link onClick={() => handle("Profile")} className='a' to="/Drprofile" ><FaRegIdBadge />{" "}Profile</Link></div>)


        }


      </div>

    </>
  )
}
