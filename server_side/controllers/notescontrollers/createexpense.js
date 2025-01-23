import expenseModel from "../../models/Expensemodel.js"

const createexpense=async(req,res)=>{
    try {
        const {expenseName,expenseCategory,expenseAmount}=req.body
        const result=await expenseModel.create({user:req.user.id,expenseName,expenseCategory,expenseAmount})
        res.send("Expense Insertion Successful")
    } catch (error) {
        res.status(400).send(error.message)
    }    
}

export default createexpense