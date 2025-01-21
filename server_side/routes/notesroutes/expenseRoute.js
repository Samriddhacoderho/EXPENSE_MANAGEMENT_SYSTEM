import express from "express";
import createexpense from "../../controllers/notescontrollers/createexpense.js";
import tokenAuth from "../../tokens/tokenAuth.js";
import getexpense from "../../controllers/notescontrollers/getexpense.js";
import putexpense from "../../controllers/notescontrollers/putexpense.js";
import deleteexpense from "../../controllers/notescontrollers/deleteexpense.js";
import tryexpense from "../../controllers/notescontrollers/tryexpense.js";
const expenseRoute=express.Router()

//expense routes
expenseRoute.post("/expense-create",tokenAuth,createexpense)
expenseRoute.get("/expenseget",tokenAuth,tryexpense)
expenseRoute.put("/expenseupdate/:id",tokenAuth,putexpense)
expenseRoute.delete("/expensedelete/:id",tokenAuth,deleteexpense)

export default expenseRoute
