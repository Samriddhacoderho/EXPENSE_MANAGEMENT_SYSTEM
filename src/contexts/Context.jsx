import { createContext, useEffect, useState } from "react";
import React from 'react'

export const context=createContext()

const Context = (props) => {
  const [userMessage,setUserMessage]=useState(()=>{
    return localStorage.getItem("firstname") || "User"
  })

  useEffect(()=>{
    localStorage.setItem("firstname",userMessage)
  },[userMessage])
  return (
     <context.Provider value={{userMessage,setUserMessage}}>
        {props.children}
    </context.Provider>
  )
}

export default Context
