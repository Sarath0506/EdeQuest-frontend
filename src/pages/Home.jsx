import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import {NavLink} from "react-router-dom";
import HighLightText from '../components/core/HomePage/HighLightText';
import CTButton from '../components/core/HomePage/Button';
import banner from '../assets/intro.mp4';
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import Instructor from '../components/core/HomePage/Instructor';
import ExploreMore from '../components/core/HomePage/ExploreMore';
import ReviewSlider from '../components/common/ReviewSlider';

const Home = () => {
  return (
    <div>
      
      {/*section 1*/}
      <div className='mt-16 p-1 relative mx-auto flex flex-col w-11/12 items-center text-white justify-center'>

        <NavLink to={"/sighUp"}>
          <div className='group mx-auto rounded-full bg-gray-700 font-bold text-gray-400 transition-all duration-200 hover:scale-95 w-fit'>
            <div className='flex flex-row items-center gap-2 rounded-full p-3 transition-all duration-200 group-hover:bg-gray-900'>
              <p>Become an instructor</p>
              <FaArrowRight />
            </div>
          </div>

        </NavLink>
        
        <div className='text-center font-semibold text-4xl m-4'>
          Empower your future growth with 
          <HighLightText text={'coding skills'} />
        </div>

        <div className='m-1 w-[70%] text-center text-lg font-bold text-gray-400'>
          With our online courses, you can learn at you own pace, from scarch to mastery, 
          get access to welth resources, hand-on projects, quizzes, and personalized feedback from instructors 
        </div>

        <div className='flex flex-row mt-4 gap-6'>
          <CTButton active={true} linkTo={"/signUp"}>
            Learn More
          </CTButton>

          <CTButton active={false} linkTo={"/login"}>
            Watch a Demo
          </CTButton>
        </div>

        <div className='shadow-blue-200 mx-3 my-12 w-[600px]'>
          <video
          muted
          loop
          autoPlay
          >
            <source src={banner} type='video/mp4'/>

          </video>
        </div>

        <div>
          <CodeBlocks
          position={'lg:flex-row'}
          heading={
            <div className='text-4xl font-bold'>
              unlock your <HighLightText text={"coding corses "}/>
              with our online courses
            </div>
          }
          subheading={
            "With our online courses, you can learn at you own pace, from scarch to mastery, get access to welth resources, hand-on projects, quizzes, and personalized feedback from instructors"
          }
          ctbt1={
            {
              text:'try it yourself',
              linkTo:"/signUp",
              active:true

            }
          }

          ctbt2={
            {
              text:'learn more',
              linkTo:"/login",
              active:false

            }
          }

          codeBlock={
            "<!DOCTYPE html>\n<html>\n<head>\n<title>Page Title</title>\n</head>\n<body>\n<h1>This is a Heading</h1>\n<p>This is a paragraph.</p>\n</body>\n</html>"
          }
          />
        </div>

        <div>
          <CodeBlocks
          position={'lg:flex-row-reverse'}
          heading={
            <div className='text-4xl font-bold'>
              unlock your <HighLightText text={"coding corses "}/>
              with our online courses
            </div>
          }
          subheading={
            "With our online courses, you can learn at you own pace, from scarch to mastery, get access to welth resources, hand-on projects, quizzes, and personalized feedback from instructors"
          }
          ctbt1={
            {
              text:'try it yourself',
              linkTo:"/signUp",
              active:true

            }
          }

          ctbt2={
            {
              text:'learn more',
              linkTo:"/login",
              active:false

            }
          }

          codeBlock={
            "<!DOCTYPE html>\n<html>\n<head>\n<title>Page Title</title>\n</head>\n<body>\n<h1>This is a Heading</h1>\n<p>This is a paragraph.</p>\n</body>\n</html>"
          }
          />
        </div>

        <ExploreMore/>

      </div>

      {/*section 2*/}
      <div className='bg-white'>

        <div className='w-11/12 flex flex-col items-center mx-auto mb-9'>

          <div className='flex gap-7  mt-[200px]'>

            <CTButton active={true} linkTo={'/signUp'} >

              <div className='flex items-center gap-3'>
                Explore full catalog
                <FaArrowRight/>
              </div>
              
            </CTButton>

            <CTButton active={false} linkTo={'/signUp'} >
              Learn more
            </CTButton>

          </div>


        </div>

        <div className='mx-auto max-w-maxContent flex items-center gap-5 bg-gray-900 text-white'>

          <div className='flex gap-5 m-8'>

            <div className='text-4xl font-semibold w-[45%] mx-auto'>
              get the skills you need for a
              <HighLightText text={' job that is in demand'}/>
            </div>

            <div className='flex flex-col gap-10 w-[40%] mx-auto items-start'>

              <div>
                The modern student is the dicates its own trems. Today, to be a compentitive
                specilaist requires more than professional skills.
              </div>

              <CTButton active={true} linkTo={'/signUp'}>
                  learn more
              </CTButton>

            </div>
          </div>

        </div>

      </div>

      {/*section 3*/}
      <div className='w-11/12 mx-auto max-w-maxContent flex flex-col justify-between gap-8 bg-gray-900 text-white mt-14'>
        <Instructor/>
        <div className='text-center text-4xl font-bold mt-10 text-yellow-500'>
          Review from other learners
        </div>
        <ReviewSlider/>
 
      </div>


    </div>
  )
}

export default Home