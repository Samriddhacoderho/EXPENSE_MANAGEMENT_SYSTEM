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
    validate:[validator.isEmail,"Provide a valid Email ID"]
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

// Mongoose Middleware (pre-save hook)
// This function runs before saving the document to the database.
authSchema.pre("save",async function(next){
    if(!this.isModified("password")) {
      // If the password hasn't been modified (like during profile update without password change), skip hashing.
      return next()}
    else
    { // If the password is new or modified:
    this.password=await bcrypt.hash(this.password,10)
    // Hash the password using bcrypt with a salt round of 10 for security.
    this.confirmPass=undefined
    }
})

const authModel=mongoose.model("logins",authSchema)
// This creates a 'logins' collection in MongoDB (or uses it if already exists) based on the authSchema structure.

export default authModel

