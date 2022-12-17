import jwt from "jsonwebtoken"
// import Redis  from "ioredis"
import rateLimit from 'express-rate-limit'

export const  maketoken=((data)=>{
    return jwt.sign({
        firstname:data.name,
        email:data.email,
        _id:data._id,
        isAdmin:data.isAdmin,
        isDoctor:data.isDoctor,
        password:data.password,
        Unseennotofication:data.Unseennotofication,
        Seennotofication:data.Seennotofication
        

    },"secretkey",{expiresIn:"35min"})

})


export const tokencheck=((req,res,next)=>{
    const token = req.headers.authorization
    console.log(token)
    
    if (token) {
        const maintokenvalue=token.slice(7,token.length)
        jwt.verify(maintokenvalue,"secretkey",function(err,dec){
            if(err){
                res.status(401).send({message:"token expired"})
            }else{
                req.user=dec
                next()
            }

        })
        
    }else{
        res.status(401).send({message:"Token is required"})
    }
})


export const isDoctor=((req,res,next)=>{
    const Isdr=req.user.isDoctor
    if (Isdr) {
        next()

        
    }else{
        res.send({message:"Your are not a doctor",Isdr})
    }

})


// export const redis= new Redis()
export const maxreq = rateLimit({
    windowMs: 1 * 60 , // 15 minutes
    max: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})



