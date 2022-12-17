import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
// import { Link } from 'react-router-dom'


export const Protected = ({children}) => {
    const navigate=useNavigate()
    const  {Userinfo}= useSelector((state)=>state.UserLogin)

    const verfiyroutes =Userinfo.name?children:<Navigate to="/" />
    return verfiyroutes


  
}
