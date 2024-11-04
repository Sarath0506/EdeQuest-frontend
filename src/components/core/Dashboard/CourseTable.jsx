import React, { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { COURSE_STATUS } from '../../../utils/constants';
import { RiDraftFill } from 'react-icons/ri';
import { TiTick } from 'react-icons/ti';
import { MdEdit, MdDelete } from 'react-icons/md';
import ConfirmationModal from '../../common/ConfirmationModal';
import { deleteCourse, fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

export default function CourseTable({ courses, setCourses }) {
    const [confirmationModal, setConfirmationModal] = useState(null);
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDeleteCourse = async (courseId) => {
        setLoading(true);
        await deleteCourse({ courseId }, token);
        const result = await fetchInstructorCourses(token);
        if (result) {
            setCourses(result);
        }
        setConfirmationModal(null);
        setLoading(false);
    };

    return (
        <div className="overflow-x-auto">
            <Table className="table-auto w-full text-left border-separate border-spacing-y-4">
                <Thead>
                    <Tr>
                        <Th className="p-3 text-gray-300 text-lg">Courses</Th>
                        <Th className="p-3 text-gray-300 text-lg">Duration</Th>
                        <Th className="p-3 text-gray-300 text-lg">Price</Th>
                        <Th className="p-3 text-gray-300 text-lg">Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {courses.length === 0 ? (
                        <Tr>
                            <Td colSpan="4" className="text-center text-gray-400 py-6">
                                No Courses found
                            </Td>
                        </Tr>
                    ) : (
                        courses.map((course) => (
                            <Tr key={course._id} className="bg-gray-800 rounded-lg shadow-lg text-white">
                                <Td className="p-4 align-top">
                                    <div className="flex gap-4">
                                        <img
                                            src={course.thumbnail}
                                            className="h-[120px] w-[180px] rounded-lg object-cover shadow-md"
                                            alt="course thumbnail"
                                        />
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-xl font-semibold text-yellow-400">{course.courseName}</p>
                                            <p className="text-gray-300">{course.courseDescription}</p>
                                            <p className="text-gray-400 text-sm">Created:</p>
                                            {course.status === COURSE_STATUS.DRAFT ? (
                                                <div className="text-pink-500 flex items-center gap-1">
                                                    <RiDraftFill size={20} />
                                                    <span>Draft</span>
                                                </div>
                                            ) : (
                                                <div className="text-green-400 flex items-center gap-1">
                                                    <TiTick size={20} />
                                                    <span>Published</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Td>
                                <Td className="p-4 align-top">2 hr 30 min</Td>
                                <Td className="p-4 align-top">${course.price}</Td>
                                <Td className="p-4 align-top flex flex-col gap-4">
                                    <button
                                        disabled={loading}
                                        className="flex items-center gap-1 text-blue-500 hover:text-blue-400"
                                        onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                                    >
                                        <MdEdit size={20} />
                                        <span>Edit</span>
                                    </button>
                                    <button
                                        disabled={loading}
                                        className="flex items-center gap-1 text-red-500 hover:text-red-400"
                                        onClick={() =>
                                            setConfirmationModal({
                                                text1: "Do you want to delete this course?",
                                                text2: "All data related to this course will be deleted.",
                                                btn1Text: "Delete",
                                                btn2Text: "Cancel",
                                                btn1Handler: () => handleDeleteCourse(course._id),
                                                btn2Handler: () => setConfirmationModal(null),
                                            })
                                        }
                                    >
                                        <MdDelete size={20} />
                                        <span>Delete</span>
                                    </button>
                                </Td>
                            </Tr>
                        ))
                    )}
                </Tbody>
            </Table>

            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    );
}
