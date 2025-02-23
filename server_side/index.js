import express from "express";
import connectTo from "./database/connection.js";
import authRoute from "./routes/authroutes/authRoute.js";
import expenseRoute from "./routes/notesroutes/expenseRoute.js";
import cors from "cors"
import cookieParser from "cookie-parser";

const app=express()
const port=process.env.PORT
console.clear()


//middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))

//database
connectTo()

//login route
app.use("/",authRoute)

//expense route
app.use("/",expenseRoute)

app.listen(port,()=>console.log(`Succesfully listening at http://localhost:${port}`))