import React, { useState  } from 'react'
import { useDispatch } from 'react-redux';
import { RxDropdownMenu } from "react-icons/rx";
import { useSelector } from 'react-redux';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdArrowDropDown } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import SubSectionModal from './SubSectionModal';
import ConfirmationModal from '../../../../common/ConfirmationModal';
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsAPI';
import {setCourse} from '../../../../../slices/courseSlice'

const NestedView = ({handleChangedSectionName}) => {

    const {course} = useSelector((state)=>state.course);
    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();

    const [addSubSection, setAddSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);

    const [confirmationModal, setConfirmationModal] = useState(null);

    const handleDeleteSection = async (sectionId,token)=>{
       
        const result = await deleteSection(
            { 
                sectionId, 
                courseId : course._id
            }, token);  
            

        if(result){
            dispatch(setCourse(result));
        }
        setConfirmationModal(null);

    }

    const handleDeleteSubSection = async (subSectionId,sectionId)=>{
        const result = await deleteSubSection({subSectionId,sectionId},token);

        if(result){
            const updatedCourseContent  = course.courseContent.map((section)=>section._id === sectionId ? result : section);
            const updatedCourse = {...course,courseContent:updatedCourseContent}
            dispatch(setCourse(updatedCourse));
        }
        setConfirmationModal(null);

    }

  return (
    <div>

        <div className='rounded-lg bg-gray-600 p-4'>
            {course?.courseContent?.map((section)=>(

                <details key={section._id} open>

                    <summary className='flex items-center justify-between gap-2 border-b-2'>

                        <div className='flex gap-3'>
                            <RxDropdownMenu />
                            <p>{section.sectionName}</p>

                        </div>

                        <div className='flex gap-3'>

                            <button onClick={()=>handleChangedSectionName(section._id,section.sectionName)}>
                                <MdEdit />    
                            </button>

                            <button onClick={()=>{
                                setConfirmationModal({
                                    text1:"Delete this section?",
                                    text2:"All the lectures in this section will be deleted",
                                    btn1Text:"Delete",
                                    btn2Text:"Cancel",
                                    btn1Handler:()=>handleDeleteSection(section._id,token),
                                    btn2Handler:()=>setConfirmationModal(null),
                                })
                            }} >
                                <MdDelete /> 
                            </button>

                            <span>|</span>
                            <MdArrowDropDown  className='text-lg text-gray-200'/>
                            
                        </div>

                    </summary>

                    <div>
                        {
                            section?.subSection?.map((data)=>(
                                <div key={data?._id}
                                onClick={()=>setViewSubSection(data)}
                                className='flex items-center justify-between gap-x-3 border-b-2'
                                >
                                    
                                    <div className='flex gap-3'>
                                        <RxDropdownMenu />
                                        <p>{data.title}</p>
                                    </div>

                                    <div className='flex items-center gap-x-3'
                                    onClick={(e)=>e.stopPropagation()}
                                    >
                                        <button
                                        onClick={()=>setEditSubSection({...data,sectionId:section._id})}
                                        >
                                            <MdEdit /> 
                                        </button>

                                        <button onClick={()=>{
                                            setConfirmationModal({
                                                text1:"Delete this subsection?",
                                                text2:"current lectures will be deleted",
                                                btn1Text:"Delete",
                                                btn2Text:"Cancel",
                                                btn1Handler:()=>handleDeleteSubSection(data._id,section._id),
                                                btn2Handler:()=>setConfirmationModal(null),
                                            })
                                        }} >
                                            <MdDelete /> 
                                        </button>
                                        
                                    </div>

                                    

                                </div>
                            ))
                        }

                        <button
                        onClick={()=>setAddSubSection(section._id)}
                        className='flex'
                        >
                            <FaPlus />
                            <p>Add lecture</p>
                        </button>
                    </div>

                </details>

            ))}
        </div>

        {
            addSubSection ?
            (
                <SubSectionModal
                modalData={addSubSection}
                setModalData = {setAddSubSection}
                add={true}
                />
            ):
            viewSubSection ?
            (
                <SubSectionModal
                modalData={viewSubSection}
                setModalData = {setViewSubSection}
                view={true}
                />
            ):
            editSubSection ?
            (
                <SubSectionModal
                modalData={editSubSection}
                setModalData = {setEditSubSection}
                edit={true}
                />
            ):
            (<div></div>)
        }

        {
            confirmationModal? 
            (<ConfirmationModal modalData={confirmationModal}/>)
            :(<div></div>)
        }

        
    </div>
  )
}

export default NestedView