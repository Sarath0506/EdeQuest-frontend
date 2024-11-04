import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import ReactStars from 'react-stars';
import { createRatingAPI } from '../../../services/operations/courseDetailsAPI';

const CourseReviewModal = ({ setReview }) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { courseEntireData } = useSelector((state) => state.viewCourse);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    setValue("courseExperience", "");
    setValue("courseRating", 0);
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await createRatingAPI({
        courseId: courseEntireData._id, 
        rating: data.courseRating,
        review: data.courseExperience,
      }, token);
  
      console.log("Rating API Response:", response);
      setReview(false);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const ratingChanged = (newRating) => {
    setValue("courseRating", newRating);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add Review</h2>
          <button
            onClick={() => setReview(false)}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        {/* User Info */}
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={user?.image}
            alt="User"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="text-lg font-semibold text-gray-800">
              {user?.firstName} {user?.lastName}
            </p>
          </div>
        </div>

        {/* Review Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Rating */}
          <div className="flex flex-col items-center">
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={30}
              color2="#ffd700"
            />
          </div>

          {/* Experience Textarea */}
          <div className="flex flex-col">
            <label
              htmlFor="courseExperience"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Add your Experience
            </label>
            <textarea
              id="courseExperience"
              placeholder="Share your thoughts about this course..."
              {...register("courseExperience", { required: true })}
              className="border rounded-md p-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.courseExperience && (
              <span className="text-red-500 text-sm mt-1">
                Please add your experience.
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setReview(false)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseReviewModal;
