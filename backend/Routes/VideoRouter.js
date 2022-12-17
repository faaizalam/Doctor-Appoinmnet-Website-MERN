// import { videos } from "../Data.js";
// import fs from "fs"
// import  express  from "express";
// import expressAsyncHandler from "express-async-handler";
// export const VideoRouter=express.Router()
// import path from "path";







// VideoRouter.get("/vip",(req,res)=>{
    
    
//     console.log("nn")
//     res.send(videos)
  
//   })

//   let ids;
//   let range
//   VideoRouter.get("/video/:id",(req,res)=>{
//     // console.log("w")
//     ids=req.params.id
    
    
    
//     let v=videos.find((x)=>x.id===Number(ids))
//     if (v.id!==ids) {
      
//       range=req.headers.range||"0"
//     }else{
      
//       range=req.headers.range||"0"
//     }
//     if (!range||!ids) {
//       res.status(404).send({message:"please set the range"})
//       return
      
//     }
  
//   //  console.log(ids)
  
//   //  console.log(v)
   
//     // console.log(v)
//     if(v){
      
//       // console.log(range,"",range.slice(6,range.length-1),range.replace(/\D/g, ""))

//     const b=v.poster
//     const size=fs.statSync(b).size
//     console.log(size-1,size,"size")
//    const Chunk=10**6 //1 mb
//    const start=Number(range.slice(6,range.length-1));
//    console.log(start,"start")
//    const end=Math.min(start+Chunk,size-1)
//    console.log(end,"end")
//    const contentlength=end-start+1;
//    console.log(contentlength,"length")
//    const headers={
//     "Content-Range":`bytes ${start}-${end}/${size}`,
//     "Accept-Ranges":'bytes',
//     "Content-Length":contentlength,
//     "Content-Type":"video/mp4",
    
//    }
//    let data={
//     name:"faaiz"
//    }
//     res.writeHead(206,headers);
//     const videostream=fs.createReadStream(b,{start,end})
//     videostream.pipe(res)
//     const d={
//       name:"faaz"
//     }
//   }else{
//     res.send({message:"path is not required"})
//   }
  
  
//   })
  
//   // specific conversation bring
 
