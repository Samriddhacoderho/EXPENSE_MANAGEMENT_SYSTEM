import { configDotenv } from "dotenv";
import mongoose from "mongoose";

configDotenv()

const uri=process.env.URI

const connectTo=async()=>{
    await mongoose.connect(uri).then(()=>console.log("Succesufully Connected to Database")).catch((e)=>console.log(e.message))
}

export default connectTo