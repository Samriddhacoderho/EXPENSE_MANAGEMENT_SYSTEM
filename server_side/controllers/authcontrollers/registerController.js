import authModel from "../../models/Authmodel.js"
import jwt from "jsonwebtoken"

const registerControllers=async (req,res)=>{
    try {
        const result=await authModel.create(req.body)
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
        res.cookie("loginToken",token,{
            secure:process.env.NODE_ENV==='production',
            sameSite:"strict"
        })
        res.json({
            "message":"Registeration Successful",
            "firstname":result.firstname
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
}

export default registerControllers