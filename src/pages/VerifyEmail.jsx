import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OTPInput from 'react-otp-input';
import { sendOTP, signUp } from '../services/operations/authAPI';
import { useNavigate, NavLink } from 'react-router-dom';

const VerifyEmail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const { loading, signupData } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!signupData) {
            navigate('/signUp');
        }
    }, [signupData, navigate]);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const { accountType, firstName, lastName, email, confirmPassword, password } = signupData;
        dispatch(signUp(accountType, firstName, lastName, email, confirmPassword, password, otp, navigate));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            {loading ? (
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
                    <p className="mt-4 text-lg font-semibold">Loading...</p>
                </div>
            ) : (
                <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md space-y-6">
                    <h1 className="text-2xl font-bold text-center">Verify Email</h1>
                    <form onSubmit={handleOnSubmit} className="space-y-6">
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span className="text-yellow-500 px-1">-</span>}
                            renderInput={(props) => (
                                <input
                                    {...props}
                                />
                            )}
                            inputStyle={{
                                width: "2rem",
                                height: "3rem",
                                margin: "0.5rem",
                                fontSize: "1.5rem",
                                borderRadius: "0.375rem",
                                border: "1px solid #4B5563",
                                backgroundColor: "#1F2937",
                                color: "white",
                                textAlign: "center",
                            }}
                        />
                        <button
                            type="submit"
                            className="w-full bg-yellow-500 hover:bg-yellow-600 transition-colors duration-200 text-black font-semibold py-2 px-4 rounded-lg focus:outline-none"
                        >
                            Verify Email
                        </button>
                    </form>
                    <div className="flex justify-between items-center mt-4">
                        <NavLink to="/login" className="text-blue-400 hover:text-blue-500 transition-colors">
                            Back to Login
                        </NavLink>
                        <button
                            onClick={() => dispatch(sendOTP(signupData.email, navigate))}
                            className="text-yellow-500 hover:text-yellow-600 transition-colors"
                        >
                            Resend OTP
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VerifyEmail;
