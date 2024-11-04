import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../../../services/operations/profileAPI';
import { useNavigate } from 'react-router-dom';
import ChangeProfilePicture from './ChangeProfilePicture';

const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
};

const Settings = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            email: user?.email || '',
            about: user?.additionalDetails?.about || '',
            gender: user?.additionalDetails?.gender || '',
            contactNumber: user?.additionalDetails?.contactNumber || '',
            dateOfBirth: formatDate(user?.additionalDetails?.dateOfBirth) || '',
        }
    });

    useEffect(() => {
        if (user) {
            setValue("firstName", user.firstName);
            setValue("lastName", user.lastName);
            setValue("email", user.email);
            setValue("about", user.additionalDetails?.about);
            setValue("gender", user.additionalDetails?.gender);
            setValue("contactNumber", user.additionalDetails?.contactNumber);
            setValue("dateOfBirth", formatDate(user.additionalDetails?.dateOfBirth));
        }
    }, [user, setValue]);

    const onSubmit = (data) => {
      dispatch(updateProfile(data, token, dispatch)).then(() => {
        navigate('/dashboard/my-profile');  
      });
    };

    return (
        <div className='text-white p-6 max-w-3xl mx-auto space-y-8'>
            <h1 className='text-3xl font-bold border-b border-gray-700 pb-4'>Edit Profile</h1>

            <ChangeProfilePicture/>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                        <label className='text-gray-400'>First Name</label>
                        <input
                            type='text'
                            {...register('firstName', { required: 'First name is required' })}
                            className='w-full px-3 py-2 bg-gray-800 text-white rounded-md'
                        />
                        {errors.firstName && <p className='text-red-500'>{errors.firstName.message}</p>}
                    </div>
                    <div>
                        <label className='text-gray-400'>Last Name</label>
                        <input
                            type='text'
                            {...register('lastName', { required: 'Last name is required' })}
                            className='w-full px-3 py-2 bg-gray-800 text-white rounded-md'
                        />
                        {errors.lastName && <p className='text-red-500'>{errors.lastName.message}</p>}
                    </div>
                    <div>
                        <label className='text-gray-400'>Email</label>
                        <input
                            type='email'
                            {...register('email')}
                            disabled
                            className='w-full px-3 py-2 bg-gray-800 text-white rounded-md cursor-not-allowed'
                        />
                    </div>
                    <div>
                        <label className='text-gray-400'>Phone Number</label>
                        <input
                            type='text'
                            {...register('contactNumber', { pattern: { value: /^\d+$/, message: "Invalid phone number" } })}
                            className='w-full px-3 py-2 bg-gray-800 text-white rounded-md'
                        />
                        {errors.contactNumber && <p className='text-red-500'>{errors.contactNumber.message}</p>}
                    </div>
                    <div>
                        <label className='text-gray-400'>Date of Birth</label>
                        <input
                            type='date'
                            {...register('dateOfBirth')}
                            className='w-full px-3 py-2 bg-gray-800 text-white rounded-md'
                        />
                    </div>
                    <div>
                        <label className='text-gray-400'>Gender</label>
                        <select
                            {...register('gender')}
                            className='w-full px-3 py-2 bg-gray-800 text-white rounded-md'
                        >
                            <option value=''>Select Gender</option>
                            <option value='Male'>Male</option>
                            <option value='Female'>Female</option>
                            <option value='Other'>Other</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className='text-gray-400'>About</label>
                    <textarea
                        {...register('about')}
                        className='w-full px-3 py-2 bg-gray-800 text-white rounded-md'
                        rows='4'
                    />
                </div>

                <button
                    type='submit'
                    className='bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md mt-4'
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default Settings;
