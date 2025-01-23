import authModel from "../../models/Authmodel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const loginControllers=async(req,res)=>{
    try {
        const {email,password}=req.body
        if(!email || !password)
        {
            return res.status(401).send("Incorrect Email ID or Password")
        }
        const result=await authModel.findOne({email:email})
        if(!await bcrypt.compare(password,result.password))
        {
            return res.status(401).send("Incorrect Email ID or Password")
        }
        const data={
            user:{
                id:result._id
            }
        }
        const token=jwt.sign(data,process.env.SECRET)
        if(!token)
        {
            return res.status(500).send("Internal Server Error")
        }
        res.cookie('loginToken',token,{
            secure:process.env.NODE_ENV==="production",
            sameSite:"strict"
        })
        res.json({
            "message":"Logged In Successfully",
            "firstname":result.firstname
        })
    } catch (error) {
        return res.status(401).send("Incorrect Email ID or Password")

    }
}

export default loginControllers