import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI';
import { IoIosAddCircleOutline } from 'react-icons/io';
import CourseTable from './CourseTable';
import { resetCourseState } from '../../../slices/courseSlice';

const MyCourses = () => {
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCourse = async () => {
            const result = await fetchInstructorCourses(token);
            if (result) {
                setCourses(result);
            }
        };
        fetchCourse();
    }, [token]);

    const handleAddCourse = () => {
        dispatch(resetCourseState());
        navigate("/dashboard/add-course");
    };

    return (
        <div className="p-8 bg-gray-900 min-h-screen text-white">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">My Courses</h1>
                <button
                    onClick={handleAddCourse}
                    className="flex items-center gap-2 bg-yellow-500 text-gray-900 py-2 px-4 rounded-lg hover:bg-yellow-400 transition-all duration-200"
                >
                    <IoIosAddCircleOutline size={24} />
                    <span className="font-semibold">Add Course</span>
                </button>
            </div>

            {courses.length > 0 ? (
                <CourseTable courses={courses} setCourses={setCourses} />
            ) : (
                <div className="text-center mt-20">
                    <p className="text-gray-400 text-lg">No courses available yet.</p>
                </div>
            )}
        </div>
    );
};

export default MyCourses;
