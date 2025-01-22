import React from 'react'
import styles from "./Button.module.css";
import { Link } from 'react-router-dom';

const Button = () => {
  return (
    <div>
      <button type="button" class="btn btn-primary">{<Link to='/login'>Log In</Link>}</button>
      <button type="button" class="btn btn-secondary">Sign Up</button>
    </div>
  )
}

export default Button
