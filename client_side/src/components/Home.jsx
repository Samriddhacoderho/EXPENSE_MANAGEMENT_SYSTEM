import React, { useContext} from 'react'
import { context } from '../contexts/Context'

const Home = () => {
  const firstnameAccess=useContext(context)
  const isLoggedIn=document.cookie.includes("loginToken=")
  return (
    isLoggedIn?<div>
      <h1>Welcome to Home Page {firstnameAccess.userMessage}</h1>
    </div>:<div>Welcome to Home Page</div>
  )
}

export default Home
