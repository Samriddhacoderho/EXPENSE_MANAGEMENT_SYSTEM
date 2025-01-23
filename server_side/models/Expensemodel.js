import mongoose, { Schema } from "mongoose";
import validator from "validator"
const expenseSchema=new mongoose.Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"logins",
        required:true
    },
    expenseName:{
        type:String,
        required:true,
        validate:{
            validator:function(value){
                return validator.isLength(value,{min:3,max:100})
            },
            message:"Expense Name should be between 3 and 100 characters!"
        }
    },
    expenseCategory:{
        type:String,
        required:true,
    },
    expenseAmount:{
        type:Number,
        required:true,
        validate:{
            validator:function(value){
                return value>0
            },
            message:"Please enter a valid amount!"
        }
    },
    date: {
        type: Date,
        default:Date.now
    }
    
})

const expenseModel=mongoose.model("expenses",expenseSchema)

export default expenseModel