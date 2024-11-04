import React from 'react'
import loginImg from "../assets/login.png"
import Temp from "../components/core/Auth/Temp"


const Login = () => {
  return (
    <Temp
      title="Welcome Back"
      dec1="Build skills for today, tomorrow, and beyond."
      dec2="Education to future-proof your career."
      image={loginImg}
      formType="login"
    />
  )
}

export default Login;