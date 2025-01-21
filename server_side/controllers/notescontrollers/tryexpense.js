    import expenseModel from "../../models/Expensemodel.js"

const tryexpense=async(req,res)=>{
    try {
        const result=await expenseModel.find({user:req.user.id})
        res.json(result)
    } catch (error) {
        res.status(404).send("Internal System Failure")
    }
}

export default tryexpense