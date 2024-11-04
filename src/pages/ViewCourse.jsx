import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { getFullDetails } from '../services/operations/courseDetailsAPI';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal';
import VideoDetailSidebar from '../components/core/ViewCourse/VideoDetailSidebar';


const ViewCourse = () => {

    const [review,setReview] = useState(false);
    const {courseId} = useParams();
    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();

    useEffect(()=>{

        const setCourseSpecificDetails = async()=>{
            const courseData = await getFullDetails(courseId,token);
            dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent));
            dispatch(setEntireCourseData(courseData?.courseDetails));
            dispatch(setCompletedLectures(courseData?.completedVideos));
            
            let lectures = 0;
            courseData?.courseDetails?.courseContent?.forEach((sec)=>{
                lectures += sec.subSection.length
            })
            dispatch(setTotalNoOfLectures(lectures));

        }
        setCourseSpecificDetails();
    },[]);
    return (
      <div className="h-screen flex">
      {/* Sidebar - Takes 1/4 of the screen */}
      <div className="w-1/4 bg-gray-900 text-white p-6 overflow-y-auto">
        <VideoDetailSidebar setReview={setReview} />
      </div>

      {/* Main Content - Video Section (Takes remaining space) */}
      <div className="w-3/4 flex flex-col bg-gray-50">
        <Outlet />
      </div>

      {/* Course Review Modal */}
      {review && <CourseReviewModal setReview={setReview} />}
    </div>
    );
      
      
      
}

export default ViewCourse