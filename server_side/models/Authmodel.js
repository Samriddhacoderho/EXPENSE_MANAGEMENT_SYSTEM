import mongoose from "mongoose";
import validator from "validator"
import bcrypt from "bcryptjs"

const authSchema = new mongoose.Schema({
  firstname: { 
    type: String,
    required: true,
    validate:[validator.isAlpha,"Firstname should not contain anything except alphabets"]
  },
  lastname: { 
    type: String,
    required: true,
    validate:[validator.isAlpha,"Lastname should not contain anything except alphabets"]

  },
  email: { 
    type: String,
    required: true,
    unique: true,
    validate:[validator.isEmail,"Provide a proper Email ID"]
  },
  password: { 
    type: String,
    required: true,
    validate:[validator.isStrongPassword,"Provide a strong password"]
  },
  confirmPass:{  
    type:String,
    required:true,
    validate:{
        validator:function(value){
            return value===this.password
        },
        message:"Passwords do not match each other"
    }
  }
});

authSchema.pre("save",async function(next){
    if(!this.isModified("password")) {return next()}
    else
    {
    this.password=await bcrypt.hash(this.password,10)
    this.confirmPass=undefined
    }
})

const authModel=mongoose.model("logins",authSchema)

export default authModel
