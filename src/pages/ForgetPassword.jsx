import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';

export const ForgetPassword = () => {
    const { loading } = useSelector((state) => state.auth);
    const [emailSend, setEmailSend] = useState(false);
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSend));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            {loading ? (
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
                    <p className="mt-4 text-lg font-semibold">Loading...</p>
                </div>
            ) : (
                <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
                    <h1 className="text-2xl font-bold text-center mb-4">
                        {emailSend ? "Check Your Email" : "Reset Password"}
                    </h1>
                    <p className="text-center text-gray-400 mb-6">
                        {emailSend 
                            ? `We have sent a reset link to ${email}`
                            : "Enter your email address to receive reset instructions"}
                    </p>

                    <form onSubmit={handleOnSubmit} className="space-y-6">
                        {!emailSend && (
                            <div>
                                <label className="block text-gray-400 mb-2 text-sm">Email Address</label>
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    value={email}
                                    placeholder="Enter your email address"
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                />
                            </div>
                        )}
                        <button
                            type="submit"
                            className="w-full bg-yellow-500 hover:bg-yellow-600 transition-colors duration-200 text-black font-semibold py-2 px-4 rounded-lg focus:outline-none"
                        >
                            {emailSend ? "Resend Email" : "Reset Password"}
                        </button>
                    </form>

                    <div className="text-center mt-6">
                        <NavLink
                            to="/login"
                            className="text-sm text-blue-400 hover:text-blue-500 transition-colors"
                        >
                            Back to Login
                        </NavLink>
                    </div>
                </div>
            )}
        </div>
    );
};
