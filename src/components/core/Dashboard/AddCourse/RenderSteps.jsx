import React from "react";
import { useSelector } from "react-redux";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import { FaCheck } from "react-icons/fa";
import CourseBuildreForm from "../AddCourse/CourseBuildre/CourseBuildreForm";
import Publish from "./Publish";

const RenderSteps = () => {
  const { step } = useSelector((state) => state.course);
  const steps = [
    { id: 1, title: "Course Information" },
    { id: 2, title: "Course Builder" },
    { id: 3, title: "Publish" },
  ];

  return (
    <div className="space-y-8">
      {/* Step Indicators */}
      <div className="flex items-center space-x-8">
        {steps.map((item) => (
          <div key={item.id} className="flex items-center space-x-2">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full font-semibold
                ${step === item.id ? "bg-yellow-500 text-black" : "bg-gray-700 text-white"} 
                ${step > item.id && "bg-green-500 text-white"}`}
            >
              {step > item.id ? <FaCheck /> : item.id}
            </div>
            <p
              className={`font-medium ${
                step === item.id ? "text-yellow-500" : "text-white"
              }`}
            >
              {item.title}
            </p>
          </div>
        ))}
      </div>

      {/* Render Forms Based on Current Step */}
      <div className="mt-8">
        {step === 1 && <CourseInformationForm />}
        {step === 2 && <CourseBuildreForm />}
        {step === 3 && <Publish />}
      </div>
    </div>
  );
};

export default RenderSteps;
