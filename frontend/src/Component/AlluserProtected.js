import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

const AlluserProtected = ({children}) => {
    const navigate=useNavigate()
    const  {Userinfo}= useSelector((state)=>state.UserLogin)

    const verfiyroutes =Userinfo.name||Userinfo.isAdmin||Userinfo.isDoctor?children:<Navigate to="/" />
    return verfiyroutes


}

export default AlluserProtected