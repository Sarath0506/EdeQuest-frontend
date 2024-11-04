import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from '../services/operations/studentFeaturesAPI';
import { getFullDetails } from '../services/operations/courseDetailsAPI';
import GetAvgRating from '../utils/avgRatting';
import Error from './Error';
import ConfirmationModal from '../components/common/ConfirmationModal';
import RatingStars from '../components/common/RatingStars';
import CourseDetailsCard from '../components/core/Course/CourseDetailsCard';
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

const CourseDetails = () => {
    const { user, loading } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { courseId } = useParams();

    const [courseData, setCourseData] = useState(null);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const [shouldNavigate, setShouldNavigate] = useState(false);
    const [averageReviewCount, setAverageReviewCount] = useState(0);
    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
    const [expandedSections, setExpandedSections] = useState([]);

    useEffect(() => {
        const getCourseDetails = async () => {
            try {
                const result = await getFullDetails(courseId, token);
                setCourseData(result || { error: true });
            } catch (error) {
                setCourseData({ error: true });
            }
        };
        getCourseDetails();
    }, [courseId, token]);

    useEffect(() => {
        if (courseData?.courseDetails?.ratingAndReviews) {
            const count = GetAvgRating(courseData?.courseDetails?.ratingAndReviews);
            setAverageReviewCount(count);
        }
    }, [courseData]);

    useEffect(() => {
        let lectures = 0;
        courseData?.courseDetails?.courseContent?.forEach((section) => {
            lectures += section.subSection.length;
        });
        setTotalNoOfLectures(lectures);
    }, [courseData]);

    useEffect(() => {
        if (shouldNavigate) navigate('/dashboard/enrolled-courses');
    }, [shouldNavigate, navigate]);

    const handleBuyCourse = () => {
        if (token) {
            buyCourse(token, [courseId], user, dispatch, setShouldNavigate);
        } else {
            setConfirmationModal({
                text1: "You are not logged in",
                text2: "Please log in to purchase the course",
                btn1Text: "Login",
                btn2Text: "Cancel",
                btn1Handler: () => navigate('/login'),
                btn2Handler: () => setConfirmationModal(null),
            });
        }
    };

    const toggleSection = (id) => {
        setExpandedSections((prev) =>
            prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
        );
    };

    if (loading || !courseData) return <div className="text-white">Loading...</div>;
    if (courseData?.error) return <Error />;

    const {
        courseName,
        courseDescription,
        ratingAndReviews = [],
        instructor = {},
        studentsEnrolled = [],
        whatWillYouLearn,
        courseContent = [],
    } = courseData?.courseDetails || {};
    const { firstName, lastName } = instructor;

    return (
        <div className="flex flex-col lg:flex-row items-start text-white bg-gray-900 p-8 space-y-10 lg:space-y-0 min-h-screen">
            {/* Left Section - Course Details */}
            <div className="w-full lg:w-[70%] lg:mr-8 space-y-10">
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold text-white">{courseName}</h1>
                    <p className="text-gray-300">{courseDescription}</p>
                    <div className="flex items-center space-x-4 mt-4">
                        <span className="text-yellow-400 font-bold text-xl">{averageReviewCount}</span>
                        <RatingStars Review_Count={averageReviewCount} Star_Size={24} />
                        <span className="text-gray-400">{`(${ratingAndReviews.length} reviews)`}</span>
                        <span className="text-gray-400">{`(${studentsEnrolled.length} students enrolled)`}</span>
                    </div>
                    <p className="text-gray-400 mt-2">Created by {`${firstName} ${lastName}`}</p>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg shadow-md space-y-2">
                    <h2 className="text-2xl font-bold text-white">What you will learn</h2>
                    <p className="text-gray-400">{whatWillYouLearn}</p>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
                    <h2 className="text-2xl font-bold text-white">Course Content</h2>

                    <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                        <div className="text-gray-400">
                            <span>{courseContent.length} Sections • </span>
                            <span>{totalNoOfLectures} Lectures</span>
                        </div>
                        <button
                            className="text-yellow-500 hover:underline"
                            onClick={() => setExpandedSections([])}
                        >
                            Collapse all sections
                        </button>
                    </div>

                    {courseContent.map((section) => (
                        <div key={section._id} className="my-4">
                            <div
                                className="flex justify-between items-center cursor-pointer text-lg font-semibold bg-gray-700 p-3 rounded-md hover:bg-gray-600"
                                onClick={() => toggleSection(section._id)}
                            >
                                <span className="text-white">{section.sectionName}</span>
                                <span className="text-yellow-500">
                                    {expandedSections.includes(section._id) ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
                                </span>
                            </div>

                            {expandedSections.includes(section._id) && (
                                <div className="pl-6 mt-2 space-y-2">
                                    {section.subSection.map((subSection) => (
                                        <div
                                            key={subSection._id}
                                            className="text-gray-300 text-base pl-2 border-l border-gray-600 hover:bg-gray-700 rounded-sm p-2"
                                        >
                                            {subSection.title}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Section - Course Card */}
            <div className="w-full lg:w-[30%] lg:sticky top-8 space-y-8 h-[calc(100vh-4rem)]">
                <CourseDetailsCard
                    course={courseData?.courseDetails}
                    setConfirmationModal={setConfirmationModal}
                    handleBuyCourse={handleBuyCourse}
                />
            </div>

            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    );
};

export default CourseDetails;
