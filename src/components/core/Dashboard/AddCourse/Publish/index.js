import React, { useEffect, useState  }  from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setStep } from '../../../../../slices/courseSlice';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';
import { useNavigate } from 'react-router-dom';
import  {resetCourseState}  from '../../../../../slices/courseSlice';

export default function Publish  () {

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);

    useEffect(()=>{
        if(course?.status === COURSE_STATUS.PUBLISHED){
            setValue('public',true);
        }
 
    },[])

    const gotToCourse = ()=>{
        dispatch(resetCourseState());
        navigate("/dashboard/my-courses");
    }

    const handleCoursePublish = async()=>{
        if((course?.status === COURSE_STATUS.PUBLISHED && getValues('public') === true) || 
        (course?.status === COURSE_STATUS.DRAFT && getValues('public') === false)) {
            gotToCourse();
            return;
        }

        const formData = new FormData();
        formData.append('courseId',course._id);
        const courseStatus = getValues('public') ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
        formData.append('status',courseStatus);

        setLoading(true);
        const result = await editCourseDetails(formData,token);

        if(result){
            gotToCourse();
        }
        setLoading(false);

    }

    const onSubmit = ()=>{
        handleCoursePublish();
    }

    const goBack =  ()=>{
        dispatch(setStep(2));
    }
 
  return (
    <div className='rounded-md bg-gray-800 p-6'>
        <div>
            Publish Course
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                
                <input
                type='checkbox'
                id='public'
                {...register('public')}
                className='rounded h-4 w-4'
                />
                <label htmlFor='public'>Make this course as public</label>
            </div>

            <div className='flex justify-end gap-x-3'>
                <button
                disabled={loading}
                type='button'
                onClick={goBack}
                className='flex items-center rounded-md bg-slate-600 p-2'
                >
                    Back
                </button>

                <button
                disabled={loading}
                className='flex items-center rounded-md bg-yellow-400 text-gray-900 p-2'
                >
                    Save Changes
                </button>

            </div>


        </form>

    </div>
  )
}
