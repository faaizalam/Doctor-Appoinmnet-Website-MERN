import fs from "fs"
import  express  from "express";
import expressAsyncHandler from "express-async-handler";
import { videos } from "../Data.js";
import path from "path";
export const Fsmodulejs=express.Router()



const __dirname=path.resolve()
Fsmodulejs.get("/t",(req,res)=>{
  const b=fs.createReadStream("Data.js")
  let size=fs.
  console.log(size)
//   b.pipe(res)


})






// import path from "path";

// const __dirname=path.resolve()
// //  To find file location
// // Fsmodulejs.get("/vip",(req,res)=>{
// //     console.log(__dirname)
// //     fs.readdir(__dirname,function(err,res){
// //         if (err) {
// //             console.log(err)
// //         }else{
// //             console.log(res)
// //         }

// //     })
// //     // console.log("nn")
// //     // res.send(videos)
  
// //   })


// // .......making the write/read method in node js
// //....... create txt file and write in it
// // const name="me inside const"
// // fs.writeFile("Uploads",name,(err,res)=>{
// //     if (err) {
// //         console.log(err)
        
// //     }else{
// //         console.log(res)

// //     }

// // })


// // ...... read the data inside file
// // fs.readFile("Uploads",(err,req)=>{
// //     if (err) {
// //         console.log(err)
        
// //     } else {
// //         console.log(req.toString())
// //     }

// // })


// // ....delets the created file of any file
// // fs.unlink("Uploads2",(err,req)=>{
// //     if (err) {
// //         console.log(err)
        
// //     }else{
        
// //         console.log(req)
// //     }
// // })


// // .... to make folder  mkdir
// // fs.mkdir("Route",(err,res)=>{
//     //     if (err) {
//         //         console.log(err)
//         //     } else {
            
//             //         console.log(res)
//             //     }
            
//             // })
//             // .... to delete folder  rmdir
// // fs.rmdir("Route",(err,res)=>{
// //     if (err) {
// //         console.log(err)
// //     } else {
        
// //         console.log(res)
// //     }

// // })

// // .....to reanme 
// // fs.rename("Route","ree",(err,res)=>{
// //     if (err) {
// //         console.log(err)
// //     } else {
        
// //         console.log(res)
// //     }

// // })