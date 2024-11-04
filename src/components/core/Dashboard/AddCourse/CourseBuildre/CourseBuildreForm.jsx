import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoAddSharp } from "react-icons/io5";
import { useSelector,useDispatch } from 'react-redux';
import { GrFormNextLink } from "react-icons/gr";
import { setStep, setEditCourse, setCourse } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';
import NestedView from './NestedView';

const CourseBuildreForm = () => {

    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors },
    } = useForm();
    const [editSectionName, setEditSectionName] = useState(null);
    const {course} = useSelector((state)=>state.course);
    const [loading, setLoading] = useState(false);
    const {token} = useSelector((state)=>state.auth);


    const cancelEdit =  ()=> {
        setEditSectionName(null);
        setValue("sectionName","");
    } 

    const goBack = ()=>{
        dispatch(setEditCourse(true));
        dispatch(setStep(1));  
    }
    console.log("course",course);
    console.log("course?.courseContent",course?.courseContent)
    const goToNext = () => {
        
        if (!course?.courseContent || course.courseContent.length === 0) {
            toast.error("Please add at least one section");
            return;
        }
    
        // Check if any section has no subSections
        const hasEmptySubSections = course.courseContent.some(section => {
            return !section.subSection || section.subSection.length === 0;
        });
    
        if (hasEmptySubSections) {
            toast.error("Please add at least one lecture subsection for each section");
            return;
        }
    
        // Proceed to the next step if all checks pass
        dispatch(setStep(3));
    };
    

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            let result;
            if (editSectionName) {
                result = await updateSection(
                    {
                        sectionName: data.sectionName,
                        sectionId: editSectionName,
                        courseId: course._id,
                    }, token
                );
            } else {
                result = await createSection(
                    {
                        sectionName: data.sectionName,
                        courseId: course._id
                    }, token
                );
            }
            dispatch(setCourse(result));
            setValue("sectionName", "");
            setEditSectionName(null);
        } catch (error) {
            toast.error("Failed to save the section. Please try again.");
            console.error("Error during section operation:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChangedSectionName =(sectionId,sectionName)=>{

        if(editSectionName === sectionId){
            cancelEdit();
            return;
        }

        setEditSectionName(sectionId);
        setValue("sectionName",sectionName);
    }

  return (
    <div className='text-white'>
        <p>Course Builder</p>

        <form onSubmit={handleSubmit(onSubmit)}>

            <div>
                <label htmlFor='sectionName'>Section Name<sup>*</sup></label>
                <input
                id='sectionName'
                placeholder='Add section Name'
                {...register("sectionName" ,{required:true})}
                className='w-full text-black m-6'
                />
                {errors.sectionName && (
                    <span className='text-red-500'>sectionName is Required</span>
                )} 
            </div>

            <div className='flex gap-3'>

                <button
                className='flex items-center'
                type='submit'
                >
                    {
                        editSectionName ? "Edit Section Name":"Create Section"
                    }
                    <IoAddSharp/>
                </button>
                {
                    editSectionName && 
                    (
                        <button
                        type='button'
                        onClick={cancelEdit}
                        className='text-sm underline'
                        >
                            Cancel edit
                        </button>
                    )
                }
                
            </div>
 
        </form>

        {
            course?.courseContent?.length >0 && 
            (
                <NestedView  handleChangedSectionName={ handleChangedSectionName}/>
            )
        }

        <div className='flex justify-end gap-2'>
            <button onClick={goBack} className='flex rounded-md items-center'>Back</button>
            <div className='flex items-center'>
                <button onClick={goToNext}>Next</button>
                <GrFormNextLink />
            </div>
            
        </div>



    </div>
  )
}

export default CourseBuildreForm