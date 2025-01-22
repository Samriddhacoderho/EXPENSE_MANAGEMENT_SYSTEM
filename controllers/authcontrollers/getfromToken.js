import authModel from "../../models/Authmodel.js";

const getfromToken=async(req,res)=>
{
    try {
        const result=await authModel.findById(req.user.id)
        res.send(result)
    } catch (error) {
        return res.status(400).send("Invalid Token")
    }    
}

export default getfromToken