import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';  
import Course_Card from './Course_Card';

const CourseSlider = ({ courses }) => {
  return (
    <div>
      {courses?.length ? (
        <Swiper
            loop={true}
            slidesPerView={2} // Adjust the number of slides visible at once
            spaceBetween={30}  // Space between slides
            cssMode={true}
            navigation={true}
            pagination={{ clickable: true }}
            mousewheel={true}
            keyboard={true}
            autoplay={{    // Autoplay settings
              delay: 3000,  // 3 seconds delay between slides
              disableOnInteraction: false,  // Continue autoplay even after interaction
            }}
            modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}  // Include Autoplay module
            className="mySwiper"
            breakpoints={{
              // When window width is >= 640px, show 1 slide
              640: {
                slidesPerView: 1,
              },
              // When window width is >= 768px, show 2 slides
              768: {
                slidesPerView: 2,
              },
              // When window width is >= 1024px, show 3 slides
              1024: {
                slidesPerView: 2,
              },
            }}
        >
            {courses?.map((course, index) => (
              <SwiperSlide key={index}>
                <Course_Card course={course} />
              </SwiperSlide>
            ))}
        </Swiper>
      ) : (
        <p>No Courses Found</p>
      )}
    </div>
  );
};

export default CourseSlider;
