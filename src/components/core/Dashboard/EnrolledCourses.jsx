import React, { useEffect, useState } from 'react';
import { getEnrolledCourses } from '../../../services/operations/profileAPI';
import { useSelector } from 'react-redux';
import ProgressBar from '@ramonak/react-progress-bar';
import { useNavigate } from 'react-router-dom';

const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const navigate = useNavigate();

  const fetchEnrolledCourses = async () => {
    try {
      const response = await getEnrolledCourses(token);
      setEnrolledCourses(response);
    } catch (error) {
      console.error('Unable to fetch enrolled courses:', error);
      setEnrolledCourses([]); // Prevents indefinite loading
    }
  };

  useEffect(() => {
    if (token) {
      fetchEnrolledCourses();
    }
  }, [token]);

  const handleCourseClick = (course) => {
    const sectionId = course.courseContent?.[0]?._id;
    const subSectionId = course.courseContent?.[0]?.subSection?.[0]?._id;

    if (!sectionId || !subSectionId) {
      console.error('Missing section or sub-section ID', { sectionId, subSectionId });
      alert('Cannot navigate: Section or sub-section missing.');
      return;
    }

    navigate(`/view-course/${course._id}/section/${sectionId}/sub-section/${subSectionId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-extrabold text-white mb-8">Enrolled Courses</h1>

      <div className="w-full max-w-6xl bg-gray-800 shadow-xl rounded-lg p-8">
        {!enrolledCourses ? (
          <div className="text-center text-lg text-white">Loading...</div>
        ) : enrolledCourses.length === 0 ? (
          <p className="text-center text-lg text-white">You have not enrolled in any course.</p>
        ) : (
          <div className="space-y-8">
            {/* Header */}
            <div className="grid grid-cols-3 gap-6 border-b pb-4 text-gray-400 font-semibold">
              <p>Course Name</p>
              <p>Details</p>
              <p>Progress</p>
            </div>

            {/* Enrolled Courses */}
            {enrolledCourses.map((course) => {
              const sectionId = course.courseContent?.[0]?._id;
              const subSectionId = course.courseContent?.[0]?.subSection?.[0]?._id;
              const isClickable = sectionId && subSectionId;

              return (
                <div
                  key={course._id}
                  onClick={isClickable ? () => handleCourseClick(course) : null}
                  className={`grid grid-cols-3 gap-6 items-center border-b pb-4 ${
                    isClickable ? 'cursor-pointer' : 'cursor-not-allowed'
                  }`}
                >
                  {/* Course Info */}
                  <div className="flex items-center space-x-6">
                    <img
                      src={course.thumbnail}
                      alt="Course Thumbnail"
                      className="w-28 h-20 rounded-md object-cover shadow-lg"
                    />
                    <div>
                      <p className="text-xl font-semibold text-white">{course.courseName}</p>
                      <p className="text-sm text-gray-300">{course.courseDescription}</p>
                    </div>
                  </div>

                  {/* Course Duration */}
                  <div className="text-center">
                    <p className="text-lg text-gray-200">
                      Duration: {course.totalDuration || 'N/A'}
                    </p>
                  </div>

                  {/* Course Progress */}
                  <div className="flex flex-col items-center">
                    <p className="text-lg text-white mb-2">
                      Progress: {Math.min(course.progressPercentage || 0, 100)}%
                    </p>
                    <ProgressBar
                      completed={Math.min(course.progressPercentage || 0, 100)}
                      height="10px"
                      isLabelVisible={false}
                      className="w-full max-w-sm"
                      bgColor="#22c55e"
                      baseBgColor="#374151"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrolledCourses;
