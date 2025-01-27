import React, { useContext} from 'react'
import { context } from '../contexts/Context'
import Button from './Button'

//This is a test comment

const Home = () => {
  const firstnameAccess=useContext(context)
  const isLoggedIn=document.cookie.includes("loginToken=")
  return (
    
    isLoggedIn?<div>
      <h1>Welcome to Home Page {firstnameAccess.userMessage}</h1>
      <div>
        
      </div>
      
    </div>:<div>Welcome to Home Page {<Button/>}</div>
    
    
  )
}

export default Home
