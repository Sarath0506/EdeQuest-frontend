import React from 'react';
import instructor from '../../../assets/instructor.jpeg';
import HighLightText from './HighLightText';
import CTButton from './Button';
import { FaArrowRight } from "react-icons/fa";

const Instructor = () => {
  return (
    <div className="w-11/12 mx-auto max-w-screen-lg flex flex-col bg-gray-900 text-white mt-14 p-10 rounded-xl shadow-xl">

      {/* Instructor Section */}
      <div className="flex flex-col lg:flex-row items-center gap-10">

        {/* Instructor Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img src={instructor} alt="Instructor" className="rounded-lg shadow-lg max-w-full h-auto" />
        </div>

        {/* Instructor Info */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6 text-left">
          <h2 className="text-4xl font-semibold leading-snug">
            Become an <HighLightText text="Instructor" />
          </h2>
          <p className="text-lg font-medium text-gray-300">
            Instructors from around the world teach millions of students on EduQuest, sharing their knowledge and experience.
          </p>
          <CTButton active={true} linkTo={'/signUp'}>
            <div className="flex items-center gap-2 font-medium">
              Start teaching today
              <FaArrowRight />
            </div>
          </CTButton>
        </div>

      </div>
    </div>
  );
};

export default Instructor;
