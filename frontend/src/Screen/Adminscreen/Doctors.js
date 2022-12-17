import React, { useState } from 'react'
import { FaTimesCircle } from 'react-icons/fa'
import { SAMe } from '../../Component/SAMe'
import { useEffect } from 'react'
import Axios  from 'axios'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

export const Doctors = () => {
  
  // let {id}=useParams()
  const [approve,setapprove]=useState(false)
  // const search=window.location.search
  const {search}=useLocation()
  const pageNo=new URLSearchParams(search).get("pages")||1
  console.log(pageNo)
  // let pageNo=id||1
  const {Userinfo}= useSelector((state)=>state.UserLogin)
  
  const [loaddr,setloaddr]=useState(false)
  const [statusload,setstatusload]=useState(false)
  const [drerror,setdrerror]=useState(" ")
  const [statuserror,setstatuserro]=useState(" ")
  const [statuSucess,setstatuSucess]=useState(false)
  const [drlist,setdrlist]=useState([])
  const [pages,setpages]=useState()
  const [Block,SetBlock]=useState(false)
  const [LoadingBlock,setLoadingBlock]=useState(false)

  


 
 
useEffect(()=>{
  setloaddr(true)
   try {
     (async()=>{
   
       const {data}=await Axios.get(`/postman/apply/drlist?pageNo=${pageNo}`,{
         headers:{
          authorization:`Bearer ${Userinfo.token}`
         }
       })
       if (data.message==="Succ") {
        setloaddr(false)
        setdrlist(data.drlist)
        setpages(data.pages)
        console.log("from succ",data)
        
      }else{
        setloaddr(false)
       setdrerror(data.message)
        console.log("from else fail",data)
        
      }
      
    })()
    
  } catch (error) {
    setloaddr(false)
    console.log("from catch fail", error)
     const err=error.response&&error.response.data.message?error.response.data.message:error.message
     setdrerror(err)
    
   }

},[Userinfo.token, pageNo])
const list = []


  
 for(let i=1;i<=pages;i++){
    list.push(i)
   

 }

//  ........ApproveHandle
const ApproveHandle=(async(id)=>{
  
  console.log("in",approve,id)
  setstatusload(true)
  try {
    const {data}=await Axios.put(`/postman/apply/status/${id}`,{},{
      headers:{
        authorization:`Bearer ${Userinfo.token}`
      }
    })
    if (data.message==="sucess") {
      console.log(data,"insidechekc")
      setstatusload(false)
      setstatuSucess(true)


      
    }else{
      setstatusload(false)
      setstatuserro(data.message)
      
    }
    
  } catch (error) {
    setstatusload(false)
    setstatuserro(error.response&& error.response.data.message?error.response.data.message:error.message)
    
  }
})
useEffect(()=>{
  if (statuSucess) {
    setloaddr(true)
    try {
      (async()=>{
    
        const {data}=await Axios.get(`/postman/apply/drlist?pageNo=${pageNo}`,{
          headers:{
            authorization:`Bearer ${Userinfo.token}`
          }
        })
        if (data.message==="Succ") {
         setloaddr(false)
         setdrlist(data.drlist)
         setpages(data.pages)
         console.log("from succ",data)
         
       }else{
         setloaddr(false)
        setdrerror(data.message)
         console.log("from else fail",data)
         
       }
       
     })()
     
   } catch (error) {
     setloaddr(false)
     console.log("from catch fail", error)
      const err=error.response&&error.response.data.message?error.response.data.message:error.message
      setdrerror(err)
     
    }

    
  }
},[Userinfo.token, pageNo, statuSucess])

const BlockFunction=(async(x)=>{
  setLoadingBlock(true)
  const {data}=await Axios.delete(`/postman/apply/Block/${x}`)
  if (data.block) {
    setLoadingBlock(false)
    SetBlock(true)
    console.log("noti true")
    
    
  }else{
    setLoadingBlock(false)
    SetBlock(false)

  }

})
useEffect(()=>{
  if (Block) {
    SetBlock(false)
    setloaddr(true)
    try {
      (async()=>{
    
        const {data}=await Axios.get(`/postman/apply/drlist?pageNo=${pageNo}`,{
          headers:{
            authorization:`Bearer ${Userinfo.token}`
          }
        })
        if (data.message==="Succ") {
         setloaddr(false)
         setdrlist(data.drlist)
         setpages(data.pages)
         console.log("from succ",data)
         
       }else{
         setloaddr(false)
        setdrerror(data.message)
         console.log("from else fail",data)
         
       }
       
     })()
     
   } catch (error) {
     setloaddr(false)
     console.log("from catch fail", error)
      const err=error.response&&error.response.data.message?error.response.data.message:error.message
      setdrerror(err)
     
    }

    
  }
},[Block, Userinfo.token, pageNo])



  return (
    <>
     
    <div className='Homemain'>
    <SAMe locationname={"Doctors"}/>
   {/* <SAMe locationname={"Home"}/> */}

   <div className='mainin'>
 <div>

 <div className='main'>
       <div className='headin'><FaTimesCircle/></div>

  
    
   </div>
 </div>
 <div>
  {LoadingBlock&&(<div>Loading...</div>)}
     <h1>Doctors</h1>
 </div>
 <div className='maindrlist'>

    {loaddr&&(<div>Loading.......</div>)}
    {drerror&&(<div>{drerror}</div>)}
    <table>
         
             <thead>
              <tr>
            <th>name</th>
            <th>phonnumber</th>
            <th>Register Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Actions</th>
            
            
              { statuserror&&(<div>{statuserror}</div>)}
              </tr>
      
            </thead>
            
            <tbody>
              {
                drlist.filter((x)=>x._id!==Userinfo._id).map((x)=>(
                  <tr key={x._id}>
                <td>{x.Userid.name}</td>
                <td>{x.phonnumber}</td>
                <td>{x.createdAt.slice(0,10)}</td>
                <td>{x.createdAt.slice(11,16)>="12"?Number(x.createdAt.slice(11,13))-12 +x.createdAt.slice(13,16) + "Pm" :x.createdAt.slice(11,16) + "Am"}</td>
                <td>{x.status?(<div className='status'>Approved</div>):(<div className='status' >Pending</div>)}</td>
                {statusload?(<div className='approvload'>Approving......</div>):
                <td>{x.approved?(<div className='approve' onClick={()=>BlockFunction(x.Userid._id)}>Block</div>):(<div className='approve' onClick={()=>ApproveHandle(x.Userid._id)}>Approve me</div>)}</td>
                }
                </tr>

      
      
      ))
                }
            </tbody>
          


</table>
  </div>
  <div className='listgap' >
 {
  list.map((x)=>(
      <Link key={x} className={x===Number(pageNo)?"bright":""} to={`/Doctors?pages=${x}`}>{x}</Link>
      ))
      // [...Array(pages).keys()].map((x)=>(
        //   <div>{x+1}</div>
        // ))
        
}
        </div>

 </div>

       </div>
      
   

   </>
  )
}
