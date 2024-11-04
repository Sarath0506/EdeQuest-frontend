import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';
import 'video-react/dist/video-react.css';
import { Player } from 'video-react';
import { FaPlay } from 'react-icons/fa';

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playerRef = useRef();
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, completedLectures } = useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setVideoDetails = () => {
      if (!courseSectionData.length || !courseId || !sectionId || !subSectionId) {
        navigate('/dashboard/enrolled-courses');
        return;
      }

      const section = courseSectionData.find((sec) => sec._id === sectionId);
      const video = section?.subSection.find((sub) => sub._id === subSectionId);
      setVideoData(video);
      setVideoEnded(false);
    };

    setVideoDetails();
  }, [courseSectionData, sectionId, subSectionId, location.pathname, navigate]);

  const isFirstVideo = () => {
    const sectionIndex = courseSectionData.findIndex((sec) => sec._id === sectionId);
    const subSectionIndex = courseSectionData[sectionIndex].subSection.findIndex(
      (sub) => sub._id === subSectionId
    );

    return sectionIndex === 0 && subSectionIndex === 0;
  };

  const isLastVideo = () => {
    const sectionIndex = courseSectionData.findIndex((sec) => sec._id === sectionId);
    const subSectionIndex = courseSectionData[sectionIndex].subSection.findIndex(
      (sub) => sub._id === subSectionId
    );

    const lastSection = courseSectionData.length - 1;
    const lastSubSection = courseSectionData[sectionIndex].subSection.length - 1;

    return sectionIndex === lastSection && subSectionIndex === lastSubSection;
  };

  const goToNextVideo = () => {
    const sectionIndex = courseSectionData.findIndex((sec) => sec._id === sectionId);
    const subSectionIndex = courseSectionData[sectionIndex].subSection.findIndex(
      (sub) => sub._id === subSectionId
    );

    const nextSubSectionIndex = subSectionIndex + 1;
    if (nextSubSectionIndex < courseSectionData[sectionIndex].subSection.length) {
      const nextSubSectionId = courseSectionData[sectionIndex].subSection[nextSubSectionIndex]._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`);
    } else {
      const nextSection = courseSectionData[sectionIndex + 1];
      if (nextSection) {
        const nextSubSectionId = nextSection.subSection[0]._id;
        navigate(`/view-course/${courseId}/section/${nextSection._id}/sub-section/${nextSubSectionId}`);
      }
    }
  };

  const goToPrevVideo = () => {
    const sectionIndex = courseSectionData.findIndex((sec) => sec._id === sectionId);
    const subSectionIndex = courseSectionData[sectionIndex].subSection.findIndex(
      (sub) => sub._id === subSectionId
    );

    if (subSectionIndex > 0) {
      const prevSubSectionId = courseSectionData[sectionIndex].subSection[subSectionIndex - 1]._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`);
    } else if (sectionIndex > 0) {
      const prevSection = courseSectionData[sectionIndex - 1];
      const prevSubSectionId = prevSection.subSection[prevSection.subSection.length - 1]._id;
      navigate(`/view-course/${courseId}/section/${prevSection._id}/sub-section/${prevSubSectionId}`);
    }
  };

  const handleLectureCompletion = async () => {
    setLoading(true);
    const res = await markLectureAsComplete({ courseId, subSectionId }, token);
    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }
    setLoading(false);
  };

  if (!videoData) return <div className="text-center text-xl">No Data Found</div>;

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      {/* Video Player Section (75% Width) */}
      <div className="w-3/4 max-w-6xl mx-auto rounded-lg overflow-hidden shadow-lg">
        <Player
          ref={playerRef}
          aspectRatio="16:9"
          playsInline
          onEnded={() => setVideoEnded(true)}
          src={videoData?.videoURL}
        >
          <FaPlay />
        </Player>
      </div>
  
      {/* Video Controls */}
      {videoEnded && (
        <div className="mt-6 flex flex-col items-center space-y-4">
          {!completedLectures.includes(subSectionId) && (
            <button
              disabled={loading}
              onClick={handleLectureCompletion}
              className={`px-6 py-2 rounded-lg text-white font-semibold transition ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {loading ? 'Loading...' : 'Mark As Completed'}
            </button>
          )}
  
          <button
            onClick={() => {
              if (playerRef.current) {
                playerRef.current.seek(0);
                setVideoEnded(false);
              }
            }}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Rewatch
          </button>
  
          <div className="flex space-x-4">
            {!isFirstVideo() && (
              <button
                onClick={goToPrevVideo}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
              >
                Prev
              </button>
            )}
            {!isLastVideo() && (
              <button
                onClick={goToNextVideo}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}
  
      {/* Video Details Section */}
      <div className="mt-8 text-center">
        <h1 className="text-3xl font-bold">{videoData?.title}</h1>
        <p className="text-lg text-gray-600 mt-2">{videoData?.description}</p>
      </div>
    </div>
  );
 
};

export default VideoDetails;
