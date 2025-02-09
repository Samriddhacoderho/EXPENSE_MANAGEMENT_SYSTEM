import { createContext, useEffect, useState } from "react";
import React from 'react'

export const context=createContext()

const Context = (props) => {
  const [updateItems,setupdateItems]=useState(null)

  const [userMessage,setUserMessage]=useState(()=>{
    return localStorage.getItem("firstname") || "User"
  })

  const [mode,setmode]=useState("Enable Dark Mode")


  useEffect(()=>{
    localStorage.setItem("firstname",userMessage)
  },[userMessage])

  return (
     <context.Provider value={{userMessage,setUserMessage,updateItems,setupdateItems,mode,setmode}}>
        {props.children}
    </context.Provider>
  )
}

export default Context