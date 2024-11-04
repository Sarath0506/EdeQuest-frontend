import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import {login} from '../../../services/operations/authAPI';

function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email:"",
        password:""
    })
    const {email,password} = formData

    const[showPassword, setShowPassword] = useState(false);

    function changeHandler(e){
        setFormData((prev)=>(
            {
                ...prev,
                [e.target.name] : e.target.value
            }

        ))

    }

    function submitHandler(e){
        e.preventDefault();
        dispatch(login(email,password,navigate))
    }

  return (
    <form onSubmit={submitHandler}
    className="flex flex-col w-full gap-y-4 mt-6"
    >
        <label  className="w-full">
            <p className="text-[0.875rem] text-white mb-1 leading-[1.375rem]">
                Email Address<sup  className="text-red-800">*</sup>
            </p>

            <input
            required
            type='text'
            placeholder='Enter email id'
            value = {formData.email}
            name='email'
            onChange={changeHandler}
            className="rounded-[0.75rem] w-full p-[8px]  border-gray-800  bg-gray-800"
            />

        </label>

        <label className="w-full relative">
            <p className="text-[0.875rem] text-white mb-1 leading-[1.375rem]">
                Password<sup className="text-red-800">*</sup>
            </p>

            <input
            required
            type={showPassword? ('text'):('password')}
            placeholder='Enter Password'
            value = {formData.password}
            name='password'
            onChange={changeHandler}
            className="rounded-[0.75rem] w-full p-[8px]  border-gray-800  bg-gray-800"
            />

            <span onClick={()=>setShowPassword(prev=>!prev)}  className="absolute right-3 top-[38px] cursor-pointer ">
                {showPassword?(<FaEyeSlash fontSize={24} fill='#AFB2BF'/> ):( <FaEye fontSize={24} fill='#AFB2BF'/>)}
            </span>

            <NavLink to="/forgot-password">
                <p className="text-xs mt-1 text-blue-100 max-w-max ml-auto"> Forgot Password</p>
            </NavLink>

            


        </label>
        
        <button type='submit' className="bg-yellow-500 py-[8px] px-[12px] rounded-[8px] mt-6 font-medium text-black">
            Sign In
        </button>

        
    </form>
  )
}

export default Login;