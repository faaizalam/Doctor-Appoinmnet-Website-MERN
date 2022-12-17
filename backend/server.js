
import express from "express"
import http from "http"

import path from 'path'
import mongoose from "mongoose"


import cors from "cors"
import UserRouter from "./Routes/User.js"
import DoctorRoutes from "./Routes/DoctorRouts.js"
// import { VideoRouter } from "./Routes/VideoRouter.js"
import { Fsmodulejs } from "./Routes/FsModuleproject.js"
import { DrProfileRoute } from "./Routes/DrProfileRoute.js"
import { AllDrFinal } from "./Routes/AllDr.js"



// import { Server } from "socket.io"
// import { maxreq } from "./utils.js"
const app = express()
app.use(cors())

const port = 7000


const server = http.createServer(app)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const working = mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/convertry", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("working")
}).catch((error) => {
    console.log(error)
})



app.use((err, req, res, next) => {
    res.send({ err: err.message })
})

app.use('/postman/dr', UserRouter)
app.use('/postman/apply', DoctorRoutes)
app.use('/postman/Drprofile',DrProfileRoute)
// app.use('/postman/v', VideoRouter)
app.use('/postman/Nodefile', Fsmodulejs)
app.use("/postman/Alldrfinal",AllDrFinal)
// app.get("/api",maxreq,(req,res)=>{
//    const num={
//     namme:"faaiz"
//    }
//   res.send(num)
  
// })
// const __dirname = path.resolve()
// app.use(express.static(path.join(__dirname, '../frontend/build')))
// const __dirname=path.resolve()
// app.use('/Upload',express.static(path.join(__dirname,'../Upload')))
// app.use('*', (req, res) => {
    

//         res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
    
// })
// op
// app.use('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/public/index.html'))
// })
// app.use(express.static(path.join(__dirname, '../frontend/src')))
// app.set('trust proxy', 2)
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))