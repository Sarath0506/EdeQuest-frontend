import React, { useState, useEffect } from 'react';
import { HomePageExplore } from '../../../data/HomePage-explore';
import HighLightText from './HighLightText';

const tabs = [
    "Free", 
    "New to Coding", 
    "Most Popular", 
    "Skills Paths", 
    "Career Paths"
];


const ExploreMore = () => {
    const [currentTab, setCurrentTab] = useState(tabs[0]);
    const [currentHeading, setCurrentHeading] = useState('');
    const [currentCourse, setCurrentCourse] = useState([]);

    useEffect(() => {
        console.log(`Current Tab: ${currentTab}`);
        console.log('Available Tags in Data:', HomePageExplore.map(course => course.tag));

        const defaultCourses = HomePageExplore.find((course) => course.tag === currentTab);
        console.log('Default Courses:', defaultCourses);

        setCurrentCourse(defaultCourses ? defaultCourses.courses : []);
        if (defaultCourses && defaultCourses.courses.length > 0) {
            setCurrentHeading(defaultCourses.courses[0].heading);
            console.log('Setting Current Heading:', defaultCourses.courses[0].heading);
        } else {
            setCurrentHeading('');
            console.log('No courses found for this tab.');
        }
    }, [currentTab]);

    useEffect(() => {
        console.log('Updated Current Courses:', currentCourse);
        console.log('Updated Current Heading:', currentHeading);
    }, [currentCourse, currentHeading]);

    return (
        <div>
            {/* Heading Section */}
            <div className='text-4xl font-semibold text-center'>
                Unlock the <HighLightText text={"Power of Code"}/>
            </div>
            <div className='text-center text-gray-900 text-lg font-semibold mt-2'>
                Learn to build anything you imagine
            </div>

            {/* Tabs Section */}
            <div className='relative flex bg-gray-800 rounded-full p-2 gap-2 transition-all duration-200 justify-center mx-auto mt-4 mb-40' >
                {tabs.map((element, index) => (
                    <div 
                        key={index} 
                        className={`text-[16px] flex items-center gap-2 rounded-full transition-all duration-200 cursor-pointer p-1 px-2
                        ${currentTab === element ? "bg-black text-white" : "bg-gray-800 text-gray-400"}`}
                        onClick={() => {
                            console.log(`Tab clicked: ${element}`);
                            setCurrentTab(element);
                        }}
                        tabIndex="0"
                        aria-label={`Select ${element} tab`}
                    >
                        {element}
                    </div>
                ))}
            </div>

            {/* Courses Section */}
            <div className=' absolute left-[8%] top-[93%] flex flex-wrap justify-evenly mt-6 gap-5'>
                {currentCourse.length > 0 ? (
                    currentCourse.map((card, index) => (
                        <div 
                            key={index}
                            className={`w-[100%] md:w-[45%] lg:w-[30%] flex flex-col gap-2 p-4 rounded-md
                            ${card.heading === currentHeading ? "bg-white text-black" : "bg-gray-700"}`}
                            onClick={() => {
                                console.log(`Course clicked: ${card.heading}`);
                                setCurrentHeading(card.heading);
                            }}
                            aria-label={`Course: ${card.heading}`}
                            tabIndex="0"
                        >
                            <div className='text-2xl font-bold'> 
                                {card.heading}
                            </div>
                            <div>
                                {card.description}
                            </div>
                            <div className="border-t border-gray-500 my-2"></div>
                            <div className='flex justify-between mx-2 font-semibold text-blue-500'>
                                <div>{card.level}</div>
                                <div>{card.lessonNumber} Lessons</div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500 mt-4">
                        No courses available for this tab.
                    </div>
                )}
            </div>
        </div>
    );
}

export default ExploreMore;
