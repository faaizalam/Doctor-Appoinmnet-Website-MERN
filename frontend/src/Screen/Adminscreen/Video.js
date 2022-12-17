import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { SAMe } from '../../Component/SAMe

const Video = () => {
    const [dat,setdata]=useState("")
    const [idn,setidd]=useState()
    const [vi,setv]=useState([])
     const [load,setload]=useState(false)
    const navigate=useNavigate()
   
        // const m=(Math.random()*(11115-22225)+22225).toFixed(0)
        const m=Math.min(4,5)
    
        console.log(m)
        
        // useEffect(()=>{
            const last=(async(x)=>{
               
                
              
              
              setidd(x)
               
                setload(true)
                
                  const {data}= await Axios.get(`/postman/v/video/${x}`)
                  if (data) {
                      setdata(data)
                       setload(false)
                       
                    }else{
                        console.log("no")
                        setload(false)
                    }
                
            })
            // last()
        // },[idn])
        
        
    

 useEffect(()=>{
    const allv=(async()=>{
        const {data}= await Axios.get(`/postman/v/vip`)
        if (data) {
           setv(data)
            
        }else{
            console.log("no")
        }


    })
    allv()
 },[])

      
  return (
   <>
   <div>
 
{/* https://www.linode.com/docs/guides/build-react-video-streaming-app/ */}
  <div>
    {
    
    vi.map((x)=>(
        <div key={x.id}>
            <div  >
                {x.poster&&(
                    <video  width="350" height="300" controls >
            <source  src={`${x.poster}`} type="video/mp4"/>
     </video>)}
                    <div><button onClick={()=>last(x.id)}>name</button></div>
            

        </div>
     {/* <div><button onClick={()=>v(x)}>{x.poster}</button></div> */}
        </div>
     ))}
  </div>
    
   </div> 
     
   <div>  
        
        { load||!idn?(<div>loading....</div>):(
    
                    <video width="350" height="300" controls id={idn} >
          <source src={`/postman/v/video/${idn}`} type="video/mp4"/>
         </video>
    
    
    
    )}
    </div>

   
   </>

  )
}

export default Video