import jwt from "jsonwebtoken"

const tokenAuth=async(req,res,next)=>{
    try {
        if(req.cookies)
        {
            const data=jwt.verify(req.cookies.loginToken,process.env.SECRET);
            req.user=data.user
            next()
        }
    } catch (error) {
        return res.status(400).send("Internal System Failure")   
    }
}

export default tokenAuth