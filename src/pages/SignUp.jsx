import React from 'react';
import signupImg from "../assets/signup.png";
import Temp from "../components/core/Auth/Temp";

const Signup = () => {
  return (
    <Temp
      title="Join the millions learning to code with StudyNotion for free"
      dec1="Build skills for today, tomorrow, and beyond."
      dec2="Education to future-proof your career."
      image={signupImg}
      formType="signup"
    />
  );
}

export default Signup;
