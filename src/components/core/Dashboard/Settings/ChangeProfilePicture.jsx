import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePicture, requestPasswordResetToken } from '../../../../services/operations/profileAPI';
import { MdEdit } from "react-icons/md";
import { toast } from 'react-hot-toast';

const ChangeProfilePicture = () => {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const [selectedImage, setSelectedImage] = useState(null);
    const dispatch = useDispatch();

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));  
            dispatch(updatePicture(file, token));  
        }
    };

    const handlePasswordReset = () => {
        dispatch(requestPasswordResetToken(user.email, token));
        toast.success("Password reset link sent to your email.");
    };

    return (
        <div className="p-4 bg-gray-800  rounded-lg text-white flex justify-between items-center">
            <div className="relative w-40 h-40">
                <img
                    src={selectedImage || user?.image}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover border-4 border-gray-700"
                />
                <label 
                    htmlFor="profilePictureUpload" 
                    className="absolute bottom-1 right-1 bg-gray-900 p-2 rounded-full text-white cursor-pointer hover:bg-gray-600"
                >
                    <MdEdit size={20} />
                </label>
                <input
                    type="file"
                    id="profilePictureUpload"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                />
            </div>
            <div className='pr-10'>
                <button 
                    onClick={handlePasswordReset}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md mt-4"
                >
                    Reset Password
                </button>
            </div>
        </div>
    );
};

export default ChangeProfilePicture;
