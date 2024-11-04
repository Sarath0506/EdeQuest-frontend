import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const VideoDetailSidebar = ({ setReview }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { sectionId, subSectionId } = useParams();

    const [activeStatus, setActiveStatus] = useState(sectionId || "");
    const [videobarActive, setVideobarActive] = useState(subSectionId || "");

    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures,
    } = useSelector((state) => state.viewCourse);

    // Update the active section and sub-section when the URL changes
    useEffect(() => {
        if (!courseSectionData.length) return;

        const section = courseSectionData.find((data) => data._id === sectionId);
        const subSection = section?.subSection.find((data) => data._id === subSectionId);

        if (section) setActiveStatus(section._id);
        if (subSection) setVideobarActive(subSection._id);
    }, [courseSectionData, sectionId, subSectionId,location.pathname]);

    return (
        <aside className="w-full">
          {/* Header Section */}
          <div className="mb-4">

            <div className='flex justify-between items-center'>
              <div onClick={() => navigate("/dashboard/enrolled-courses")} className="cursor-pointer mb-2 text-lg text-blue-400 hover:underline">
                Back
              </div>
        
              <button onClick={() => setReview(true)} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Add Review
              </button>
            </div>
      
            <div className="mt-4">
              <p className="font-semibold">{courseEntireData?.courseName}</p>
              <p className="text-sm text-gray-300">
                {completedLectures.length} / {totalNoOfLectures} Lectures Completed
              </p>
            </div>
          </div>
      
          {/* Course Section List */}
          <ul className="space-y-4">
            {courseSectionData.map((section) => (
              <li key={section._id} className="bg-gray-700 rounded-lg p-4">
                <div
                  onClick={() => setActiveStatus(section._id)}
                  className="cursor-pointer flex justify-between items-center"
                >
                  <p className="text-white font-bold">{section.sectionName}</p>
                  <span>➤</span>
                </div>
      
                {activeStatus === section._id && (
                  <ul className="mt-2 space-y-2">
                    {section.subSection.map((topic) => (
                      <li
                        key={topic._id}
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                          videobarActive === topic._id ? 'bg-yellow-400 text-black' : 'bg-gray-800 text-white'
                        }`}
                        onClick={() => {
                          navigate(`/view-course/${courseEntireData._id}/section/${section._id}/sub-section/${topic._id}`);
                          setVideobarActive(topic._id);
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={completedLectures.includes(topic._id)}
                          onChange={() => {}}
                          className="w-4 h-4"
                        />
                        <span>{topic.title}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </aside>
    );
      
};

export default VideoDetailSidebar;
