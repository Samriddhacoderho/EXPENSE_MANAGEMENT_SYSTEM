import { configDotenv } from "dotenv";
import mongoose from "mongoose";

configDotenv()

const uri=process.env.URI  //reference to environment

const connectTo=async()=>{
    await mongoose.connect(uri).then(()=>console.log("Succesufully Connected to Database")).catch((e)=>console.log(e.message)) //Connection message
}

export default connectTo