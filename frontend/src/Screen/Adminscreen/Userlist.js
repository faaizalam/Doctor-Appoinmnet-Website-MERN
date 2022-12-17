import  Axios  from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { FaTimesCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { SAMe } from '../../Component/SAMe'

export const Userlist = () => {
  let {id}=useParams()
  let pageNo=id||1

let n=5
// console.log([...[5,4,"uu"].keys()])
 
const picref=useRef()
  
  //  const navigate=useNavigate()
  const {Userinfo}= useSelector((state)=>state.UserLogin)
  const [loaduser,setloaduser]=useState(false)
  const [pages,setpages]=useState()
  const [CheckId,setCheckID]=useState([])
  const Inp=useRef()
 
  const [usererror,setusererror]=useState(" ")
  // const [pageNof,setpageNo]=useState(" ")
  const [userlist,setuserlist]=useState([])
useEffect(()=>{
  setloaduser(true)
   try {
     (async()=>{
   
       const {data}=await Axios.get(`/postman/dr/Userlist?pageNo=${pageNo}`,{
         headers:{
           token:`Bearer ${Userinfo.token}`
         }
       })
       if (data.message==="Succ") {
        setloaduser(false)
        setuserlist(data.drlist)
        setpages(data.pages)
        console.log("from succ",data)
       
       
        
        
      }else{
        setloaduser(false)
        setusererror(data.message)
        console.log("from else fail",data)
        
      }
      
    })()
    
  } catch (error) {
    setusererror(false)
    console.log("from catch fail", error)
     const err=error.response&&error.response.data.message?error.response.data.message:error.message
     setusererror (err)
    
   }

},[Userinfo.token, pageNo])
const list = []


  
 for(let i=1;i<=pages;i++){
    list.push(i)
   

 }
 console.log(list)


// Chebox Functionality

const Allcheck=((e)=>{
  // if (CheckId.length===0) {
    picref.current.src="/img/th.jpg"
    console.log(Inp.current.checked,"id by ref")
    // console.log(,"id")
     
                      
    const all =document.querySelectorAll("input[type='checkbox']")
    if (Inp.current.checked===true) {
      all.forEach((x)=>{
        x.checked=true
      })
      const data= userlist.map((x)=>x._id)
      setCheckID(data)
      console.log("greater")
      
      
    }else{
      all.forEach((x)=>{
        x.checked=false

        
      })
      picref.current.src=""
      setCheckID([])
  }
    
  // }else{
  //   setCheckID([])
  //   console.log("less")

  // }

 

})
useEffect(()=>{
  if (CheckId) {
    console.log(CheckId)
    
  }
},[CheckId])



const SpecficCheck=((e)=>{
  console.log(e.target.value,"val")
  
 


const ExistItem=CheckId.find((x)=>x===e.target.value)
if (ExistItem) {
  if (CheckId.length===1) {
    const all =document.querySelectorAll("input[type='checkbox']")
    all.forEach((x)=>{
      x.checked=false

    })

    
  }
  setCheckID(CheckId.filter((x)=>x!==ExistItem))
  
}else{
  setCheckID([...CheckId,e.target.value])

}


})


// finsih




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

     <h1>All Users</h1>
 </div>
 <div className='maindrlist'>
    {loaduser&&(<div>Loading.......</div>)}
    {usererror&&(<div>{usererror}</div>)}
    <table>
         
             <thead>
              
              <tr>
                <th style={{display:"flex",alignItems:"center"}}> All <input style={{marginLeft:"5px"}} ref={Inp} type="checkbox"  onChange={Allcheck} ></input></th>
            {/* <th>Select</th> */}
            <th>name</th>
            <th>email</th>
            <th>Action</th>
            
            
              </tr>
      
            </thead>
            
            <tbody>

      
              {

                userlist.map((x)=>(
                  
                  <tr key={x._id}>
                   
                  <td><input type="checkbox" name='entity' onChange={SpecficCheck} value={x._id} ></input></td>
                  
                 


                       
                     
                <td>{x.name}  {x._id}</td>
                <td>{x.email}</td>
                {/* <td>{x.email}</td> */}
                <td>Block</td>
               
              </tr>
      
      
      ))
                }
            </tbody>
          


</table>
  </div>
  <div  className="numbers">
  <div className='listgap' >
  {
  list.map((x)=>(
      <Link key={x} className={x===Number(pageNo)?"bright":""} to={`/users/${x}`}>{x}</Link>
  ))
  // [...Array(pages).keys()].map((x)=>(
  //   <div>{x+1}</div>
  // ))

}
<img  ref={picref} alt='pic'></img>
</div>
      </div>






 </div>

<div>

</div>
       </div>
      
   

   </>
  )
}
