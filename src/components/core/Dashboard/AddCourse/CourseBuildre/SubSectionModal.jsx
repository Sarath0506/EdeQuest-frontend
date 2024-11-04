import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';
import { ImCross } from "react-icons/im";
import toast from 'react-hot-toast';
import Upload from './Upload';

const SubSectionModal = ({
    modalData,
    setModalData,
    add = false,
    view = false,
    edit = false,
}) => {
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        if (view || edit) {
            setValue("lectureTitle", modalData.title);
            setValue("lectureDesc", modalData.description);
            setValue("lectureVideo", modalData.videoURL);
        }
    }, [view, edit]);

    const handleEditSubSection = async () => {
        const currentValues = getValues();
        const formData = new FormData();

        formData.append("sectionId", modalData.sectionId);
        formData.append("subSectionId", modalData._id);

        // Append fields that have changed
        if (currentValues.lectureTitle !== modalData.title) {
            formData.append("title", currentValues.lectureTitle);
        }

        if (currentValues.lectureDesc !== modalData.description) {
            formData.append("description", currentValues.lectureDesc);
        }

        // Append the video file if it has changed
        if (currentValues.lectureVideo && currentValues.lectureVideo[0] !== modalData.videoURL) {
            formData.append("video", currentValues.lectureVideo[0]);
        }

        // If no fields are updated, show a message and return
        if (formData.get('title') === undefined && formData.get('description') === undefined && !formData.has('video')) {
            toast.error("No changes made");
            return;
        }

        setLoading(true);
        const result = await updateSubSection(formData, token);
        if (result) {
            const updatedCourseContent = course.courseContent.map((section) => 
                section._id === modalData.sectionId ? result : section
            );
            const updatedCourse = { ...course, courseContent: updatedCourseContent };
            dispatch(setCourse(updatedCourse));
        }
        setModalData(null);
        setLoading(false);
    };

    const onSubmit = async (data) => {
        if (view) {
            return;
        }
        if (edit) {
            await handleEditSubSection();
            return;
        }

        const formData = new FormData();
        formData.append("sectionId", modalData);
        formData.append("title", data.lectureTitle);
        formData.append("description", data.lectureDesc);

        // Append the video file if it's available
        if (data.lectureVideo && data.lectureVideo[0]) {
            formData.append("video", data.lectureVideo[0]);
        }

        setLoading(true);
        const result = await createSubSection(formData, token);

        if (result) {
            const updatedCourseContent = course.courseContent.map((section) => 
                section._id === modalData ? result : section
            );
            const updatedCourse = { ...course, courseContent: updatedCourseContent };
            dispatch(setCourse(updatedCourse));
        }
        setModalData(null);
        setLoading(false);
    };

    return (
        <div>
            <div>
                <div className='flex justify-between'>
                    <p>{view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lectures</p>
                    <button onClick={() => !loading && setModalData(null)}>
                        <ImCross />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Upload
                            name='lectureVideo'
                            label='Lecture Video'
                            register={register}
                            setValue={setValue}
                            getValues={getValues}
                            errors={errors}
                            video={true}
                            viewData={view ? modalData.videoURL : null}
                            editData={edit ? modalData.videoURL : null}                   
                        />

                        <div>
                            <label htmlFor='lectureTitle'>Lecture Title</label>
                            <input
                                id='lectureTitle'
                                placeholder='Enter Lecture Title'
                                {...register('lectureTitle', { required: true })}
                                className='w-full text-black'
                            />
                            {errors.lectureTitle && (
                                <span className='text-red-500'>Lecture Title is required</span>
                            )}
                        </div>

                        <div>
                            <label htmlFor='lectureDesc'>Lecture Description</label>
                            <textarea
                                id='lectureDesc'
                                placeholder='Enter Lecture Description'
                                {...register('lectureDesc', { required: true })}
                                className='w-full min-h-[130px] text-black'
                            />
                            {errors.lectureDesc && (
                                <span className='text-red-500'>Lecture Description is required</span>
                            )}
                        </div>

                        {!view && (
                            <div>
                                <button type='submit'>
                                    {loading ? 'Loading...' : edit ? 'Save Changes' : 'Save'}
                                </button>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SubSectionModal;
