import express from "express";
import registerControllers from "../../controllers/authcontrollers/registerController.js";
import loginControllers from "../../controllers/authcontrollers/loginController.js";
import getfromToken from "../../controllers/authcontrollers/getfromToken.js";
import tokenAuth from "../../tokens/tokenAuth.js";

const authRoute=express.Router()

authRoute.post("/register",registerControllers)
authRoute.post("/login",loginControllers)
authRoute.get("/get",tokenAuth,getfromToken)

export default authRoute