import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, NavLink } from 'react-router-dom';
import { passwordUpdate } from '../services/operations/authAPI';

export const UpdatePassword = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: ""
    });

    const { loading } = useSelector((state) => state.auth);

    const onChangeHandle = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    };

    const { password, confirmPassword } = formData;
    const resetToken = location.pathname.split("/").at(-1);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(passwordUpdate(password, confirmPassword, resetToken));
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
                    <h1 className="text-2xl font-bold text-center">Choose New Password</h1>
                    <form onSubmit={handleOnSubmit} className="space-y-4">
                        <label className="block">
                            <p className="text-sm text-gray-400 mb-2">New Password</p>
                            <input
                                required
                                placeholder="Enter password"
                                type="password"
                                name="password"
                                value={password}
                                onChange={onChangeHandle}
                                className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />
                        </label>

                        <label className="block">
                            <p className="text-sm text-gray-400 mb-2">Confirm Password</p>
                            <input
                                required
                                placeholder="Confirm password"
                                type="password"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={onChangeHandle}
                                className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />
                        </label>
                        
                        <button
                            type="submit"
                            className="w-full bg-yellow-500 hover:bg-yellow-600 transition-colors duration-200 text-black font-semibold py-2 px-4 rounded-lg focus:outline-none"
                        >
                            Reset Password
                        </button>
                    </form>

                    <div className="text-center mt-4">
                        <NavLink to="/login" className="text-blue-400 hover:text-blue-500 transition-colors">
                            Back to Login
                        </NavLink>
                    </div>
                </div>
            )}
        </div>
    );
};
