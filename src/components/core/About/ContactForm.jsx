import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { countryCode } from '../../../data/CountryCode';
import { apiConnector } from '../../../services/apiConnector';
import { contactusEndpoint } from '../../../services/api';
import toast from 'react-hot-toast';

const ContactForm = () => {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm();

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "",
                firstname: "",
                lastname: "",
                message: "",
                phoneNo: ""
            });
        }
    }, [isSubmitSuccessful, reset]);

    const submitHandler = async (data) => {
        try {
            setLoading(true);
            const contactResponse = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
            if(contactResponse){
                toast.success("Email send successfull , we will get back soon");
            }
            setLoading(false);
        } catch (error) {
            console.log("Error:", error.message);
            setLoading(false);
        }
        setLoading(false);
    };

    return (
        <div className="max-w-lg mx-auto p-8 bg-gray-900 text-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold mb-2">Get in touch</h1>
            <p className="text-gray-400 mb-8">We'd love to hear from you, fill out this form</p>

            <form onSubmit={handleSubmit(submitHandler)}>
                <div className="flex flex-col gap-5">
                    {/* First Name and Last Name */}
                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="w-full">
                            <label htmlFor="firstname" className="block text-sm font-medium mb-1">First Name</label>
                            <input
                                className="w-full px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                type="text"
                                placeholder="Enter first name"
                                id="firstname"
                                {...register("firstname", { required: true })}
                            />
                            {errors.firstname && (
                                <span className="text-red-500 text-sm">Please enter your first name</span>
                            )}
                        </div>

                        <div className="w-full">
                            <label htmlFor="lastname" className="block text-sm font-medium mb-1">Last Name</label>
                            <input
                                className="w-full px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                type="text"
                                placeholder="Enter last name"
                                id="lastname"
                                {...register("lastname")}
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col">
                        <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                        <input
                            className="w-full px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            type="email"
                            placeholder="Enter email"
                            id="email"
                            {...register("email", { required: true })}
                        />
                        {errors.email && <span className="text-red-500 text-sm">Please enter your email</span>}
                    </div>

                    {/* Phone Number */}
                    <div className="flex flex-col">
                        <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1">Phone Number</label>
                        <div className="flex gap-4">
                            <select
                                className="bg-gray-800 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                {...register("countrycode", { required: true })}
                            >
                                {countryCode.map((element, index) => (
                                    <option key={index} value={element.code}>
                                        {element.code} - {element.country}
                                    </option>
                                ))}
                            </select>
                            <input
                                className="flex-grow px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                type="number"
                                placeholder="Enter your number"
                                {...register("phoneNo", {
                                    required: {
                                        value: true,
                                        message: "Please enter your phone number",
                                    },
                                    maxLength: {
                                        value: 10,
                                        message: "Invalid number",
                                    },
                                    minLength: {
                                        value: 8,
                                        message: "Invalid number",
                                    },
                                })}
                            />
                        </div>
                        {errors.phoneNo && (
                            <span className="text-red-500 text-sm">{errors.phoneNo.message}</span>
                        )}
                    </div>

                    {/* Message */}
                    <div className="flex flex-col">
                        <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                        <textarea
                            className="w-full px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="Enter message"
                            id="message"
                            cols="30"
                            rows="7"
                            {...register("message", { required: true })}
                        />
                        {errors.message && (
                            <span className="text-red-500 text-sm">Please enter your message</span>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`mt-6 w-full py-2 rounded-md font-semibold text-lg ${
                        loading ? "bg-yellow-300" : "bg-yellow-500 hover:bg-yellow-600"
                    }`}
                >
                    {loading ? "Sending..." : "Send Message"}
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
