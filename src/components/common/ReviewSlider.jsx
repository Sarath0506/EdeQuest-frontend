import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import ReactStars from 'react-stars';
import { apiConnector } from '../../services/apiConnector';
import { ratingEndpoints } from '../../services/api';

const ReviewSlider = () => {
  const [reviews, setReviews] = useState([]);

  // Fetch all reviews on component mount
  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        const response = await apiConnector('GET', ratingEndpoints.REVIEW_DETAILS_API,null);
        console.log('Reviews Response:', response);
        if (response?.data?.success) {
          setReviews(response.data.data);
        } else {
          console.error('Failed to fetch reviews:', response?.data?.message);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchAllReviews();
  }, []);

  // Truncate long reviews for display
  const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };

  return (
    <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Student Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-center">No reviews available at the moment.</p>
      ) : (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={2}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="w-full max-w-3xl"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <img
                    src={review.user.image}
                    alt={`${review.user.firstName} ${review.user.lastName}`}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <p className="font-semibold">
                      {review.user.firstName} {review.user.lastName}
                    </p>
                    <ReactStars
                      count={5}
                      value={review.rating}
                      size={24}
                      edit={false}
                      color2="#ffd700"
                    />
                  </div>
                </div>
                <p className="text-gray-300">
                  {truncateText(review.review, 15)}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default ReviewSlider;
