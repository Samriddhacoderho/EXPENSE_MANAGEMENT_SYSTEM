import expenseModel from "../../models/Expensemodel.js"

const getexpense=async(req,res)=>{
    try {
        if(Object.keys(req.query).length===0)
        {
            const result=await expenseModel.find({user:req.user.id},{expenseName:1,expenseCategory:1,expenseAmount:1,date:1})
            res.json(result)
        }
        else if(Object.keys(req.query).length>1)
        {
            res.status(400).send("You cannot pass more than one query to filter out expenses")
        }
        else if(!(Object.keys(req.query).every((key)=>Object.keys(expenseModel.schema.paths).includes(key))))
        {
            res.status(400).send("Attribute not available in database")
        }
        else
        {
            if(Object.keys(req.query)[0]===("expenseCategory"))
            {
                const result=await expenseModel.find({user:req.user.id,expenseCategory:req.query.expenseCategory},{expenseName:1,expenseCategory:1,expenseAmount:1,date:1})
                res.json(result)
            }
            else
            {
                res.status(400).send("Internal Server Error")
            }
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

export default getexpense