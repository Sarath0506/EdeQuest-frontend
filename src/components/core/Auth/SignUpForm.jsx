import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSignupData } from '../../../slices/authSlice';
import { sendOTP } from '../../../services/operations/authAPI';

function SignUp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        accountType: "Student",
        firstName: "",
        lastName: "",
        email: "",
        confirmPassword: "",
        password: ""
    });

    const { 
        accountType,
        firstName,
        lastName,
        email,
        confirmPassword,
        password,
    } = formData;

    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    function changeHandler(e) {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    function submitHandler(e) {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            return;
        }

        // Dispatch the form data to Redux store
        dispatch(setSignupData(formData));

        // Call sendOTP action
        dispatch(sendOTP(email, navigate));
    }

    return (
        <div>
            <div className="flex border-gray-800 bg-gray-800 p-1 gap-x-1 rounded-full max-w-max">
                <button onClick={() => setFormData({ ...formData, accountType: "Student" })}
                    className={`${accountType === "Student" ? "bg-gray-900 text-white" : "bg-gray-800"} py-2 px-5 rounded-full transition-all`}>
                    Student
                </button>
                <button onClick={() => setFormData({ ...formData, accountType: "Instructor" })}
                    className={`${accountType === "Instructor" ? "bg-gray-900 text-white" : "bg-gray-800"} py-2 px-5 rounded-full transition-all`}>
                    Instructor
                </button>
            </div>

            <form onSubmit={submitHandler}>
                <div className="flex gap-x-4">
                    <label className="w-full">
                        <p className="text-[0.875rem] text-white mb-1 leading-[1.375rem]">
                            First Name<sup className="text-red-800">*</sup>
                        </p>
                        <input
                            required
                            type='text'
                            placeholder='Enter your First Name'
                            value={firstName}
                            name='firstName'
                            onChange={changeHandler}
                            className="rounded-[0.75rem] w-full p-[8px] border-gray-800 bg-gray-800"
                        />
                    </label>

                    <label className="w-full">
                        <p className="text-[0.875rem] text-white mb-1 leading-[1.375rem]">
                            Last Name<sup className="text-red-800">*</sup>
                        </p>
                        <input
                            required
                            type='text'
                            placeholder='Enter your Last Name'
                            value={lastName}
                            name='lastName'
                            onChange={changeHandler}
                            className="rounded-[0.75rem] w-full p-[8px] border-gray-800 bg-gray-800"
                        />
                    </label>
                </div>

                <label>
                    <p className="text-[0.875rem] text-white mb-1 leading-[1.375rem]">
                        Email<sup className="text-red-800">*</sup>
                    </p>
                    <input
                        required
                        type='text'
                        placeholder='Enter your Email'
                        value={email}
                        name='email'
                        onChange={changeHandler}
                        className="rounded-[0.75rem] w-full p-[8px] border-gray-800 bg-gray-800"
                    />
                </label>

                <div className="flex gap-x-4">
                    <label className='w-full relative'>
                        <p className="text-[0.875rem] text-white mb-1 leading-[1.375rem]">
                            Create Password<sup className="text-red-800">*</sup>
                        </p>
                        <input
                            required
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Create Password'
                            value={password}
                            name='password'
                            onChange={changeHandler}
                            className="rounded-[0.75rem] w-full p-[8px] border-gray-800 bg-gray-800"
                        />
                        <span onClick={() => setShowPassword(prev => !prev)} className="absolute right-3 top-[38px] cursor-pointer ">
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </label>

                    <label className='w-full relative'>
                        <p className="text-[0.875rem] text-white mb-1 leading-[1.375rem]">
                            Confirm Password<sup className="text-red-800">*</sup>
                        </p>
                        <input
                            required
                            type={showPassword2 ? 'text' : 'password'}
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            name='confirmPassword'
                            onChange={changeHandler}
                            className="rounded-[0.75rem] w-full p-[8px] border-gray-800 bg-gray-800"
                        />
                        <span onClick={() => setShowPassword2(prev => !prev)} className="absolute right-3 top-[38px] cursor-pointer ">
                            {showPassword2 ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </label>
                </div>

                <button type='submit' className="bg-yellow-500 py-[8px] px-[12px] rounded-[8px] mt-6 font-medium text-black w-full">
                    Create Account
                </button>
            </form>
        </div>
    );
}

export default SignUp;
