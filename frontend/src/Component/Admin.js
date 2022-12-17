import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export const Admin = ({children}) => {
    const  {Userinfo}= useSelector((state)=>state.UserLogin)


    const Adminroutes=Userinfo.name&& Userinfo.isAdmin?(children):<Navigate to="/"/>
    return Adminroutes

    


  
}
