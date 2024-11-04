import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GetAvgRating from '../../../utils/avgRatting';
import RatingStars from '../../common/RatingStars';

const Course_Card = ({ course }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(course?.ratingAndReview);
    setAvgReviewCount(count);
  }, [course]);

  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden ">
      <Link to={`/course/${course?._id}`}>
        <div className="relative">
          {/* Course Thumbnail */}
          <img
            src={course?.thumbnail}
            alt="course thumbnail"
            className="h-[400px] w-full object-cover"
          />
        </div>

        <div className="p-6">
          {/* Course Name */}
          <p className="text-xl font-bold mb-2">{course?.courseName}</p>

          {/* Instructor Name */}
          <p className="text-sm text-gray-400 font-semibold">
            {course?.instructor?.firstName} {course?.instructor?.lastName}
          </p>

          {/* Rating Section */}
          <div className="flex items-center mt-3 gap-x-3">
            <span className="text-lg font-semibold">{avgReviewCount || 0}</span>
            <RatingStars Review_Count={avgReviewCount} Star_Size={20} />
            <span className="text-sm text-gray-400">
              {course?.ratingAndReview?.length || 0} Rating
            </span>
          </div>

          {/* Course Price */}
          <p className="mt-4 text-xl font-bold text-green-400">Rs. {course?.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Course_Card;
