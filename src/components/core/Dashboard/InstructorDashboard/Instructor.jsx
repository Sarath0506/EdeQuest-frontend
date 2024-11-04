import React, { useEffect, useState } from 'react';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { getInstructorData } from '../../../../services/operations/profileAPI';
import { useSelector } from 'react-redux';
import InstructorChart from './InstructorChart';

const Instructor = () => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const [loading, setLoading] = useState(false);
    const [instructorData, setInstructorData] = useState(null);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const getCourseDataWithStats = async () => {
            setLoading(true);
            const instructorApiData = await getInstructorData(token);
            const result = await fetchInstructorCourses(token);
            if (instructorApiData.length) setInstructorData(instructorApiData);
            if (result) setCourses(result);
            setLoading(false);
        };
        getCourseDataWithStats();
    }, [token]);

    const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0);
    const totalStudents = instructorData?.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0);

    return (
        <div className="p-6 bg-gray-900 text-white rounded-lg shadow-md space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Hi, {user?.firstName}</h1>
                <p className="text-gray-400">Let’s start something new</p>
            </div>

            {loading ? (
                <div className="spinner border-t-4 border-b-4 border-yellow-400 h-8 w-8 mx-auto animate-spin"></div>
            ) : courses.length > 0 ? (
                <div className="space-y-8">
                    <InstructorChart courses={instructorData} />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-gray-800 p-4 rounded-lg shadow-md">
                        <div className="text-center">
                            <p className="text-gray-400">Total Courses</p>
                            <p className="text-xl font-bold">{courses.length}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-gray-400">Total Students</p>
                            <p className="text-xl font-bold">{totalStudents}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-gray-400">Total Income</p>
                            <p className="text-xl font-bold">₹ {totalAmount}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-400">No courses to display.</p>
            )}
        </div>
    );
};

export default Instructor;
