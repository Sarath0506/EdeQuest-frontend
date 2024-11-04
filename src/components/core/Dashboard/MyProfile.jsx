import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const formatDate = (dateString) => {
    if (!dateString) return ''; // Return empty string if dateString is invalid
    try {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    } catch {
        return ''; // Fallback to empty string if an error occurs
    }
};

const MyProfile = () => {
    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();
  
    return (
        <div className='text-white p-6 max-w-3xl mx-auto space-y-8'>
            <h1 className='text-3xl font-bold border-b border-gray-700 pb-4'>My Profile</h1>

            <div className='flex items-center gap-4 bg-gray-800 p-4 rounded-lg shadow-md'>
                <img src={user?.image} className='aspect-square w-20 rounded-full object-cover'/>
                <div>
                    <p className='text-xl font-semibold'>{user?.firstName + " " + user?.lastName}</p>
                    <p className='text-gray-300'>{user?.email}</p>
                </div>
                <button
                    onClick={() => navigate('/dashboard/settings')}
                    className='ml-auto bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded-md'
                >
                    Edit
                </button>
            </div>

            <div className='bg-gray-800 p-4 rounded-lg shadow-md space-y-2'>
                <div className='flex justify-between items-center'>
                    <p className='text-xl font-semibold'>About</p>
                    <button
                        onClick={() => { navigate("/dashboard/settings") }}
                        className='text-blue-400 hover:text-blue-500 text-sm'
                    >
                        Edit
                    </button>
                </div>
                <p className='text-gray-300'>
                    {user?.additionalDetails?.about ?? "Write something about yourself"}
                </p>
            </div>

            <div className='bg-gray-800 p-4 rounded-lg shadow-md'>
                <div className='flex justify-between items-center mb-4'>
                    <p className='text-xl font-semibold'>Personal Details</p>
                    <button
                        onClick={() => { navigate("/dashboard/settings") }}
                        className='text-blue-400 hover:text-blue-500 text-sm'
                    >
                        Edit
                    </button>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                        <p className='text-gray-400'>First Name</p>
                        <p className='text-gray-300'>{user.firstName}</p>
                    </div>
                    <div>
                        <p className='text-gray-400'>Last Name</p>
                        <p className='text-gray-300'>{user.lastName}</p>
                    </div>
                    <div>
                        <p className='text-gray-400'>Email</p>
                        <p className='text-gray-300'>{user.email}</p>
                    </div>
                    <div>
                        <p className='text-gray-400'>Phone Number</p>
                        <p className='text-gray-300'>{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
                    </div>
                    <div>
                        <p className='text-gray-400'>Date of Birth</p>
                        <p className='text-gray-300'>{formatDate(user?.additionalDetails?.dateOfBirth ?? "Add Date Of Birth")}</p>
                    </div>
                    <div>
                        <p className='text-gray-400'>Gender</p>
                        <p className='text-gray-300'>{user?.additionalDetails?.gender ?? "Add Gender"}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyProfile;
