import React from 'react'
import CTButton from './Button'
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';

const CodeBlocks = ({position, heading, subheading, ctbt1, ctbt2, backgroundgradient, codecolor,codeBlock}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10 mx-14`}>

      <div className='w-[50%] flex flex-col ml-5'>
        {heading}
        <div className='font-bold text-gray-400'>
          {subheading}
        </div>

        <div className='flex gap-6 mt-7 items-center'>

          <CTButton active={ctbt1.active} linkTo={ctbt1.linkTo}>
            <div className='flex gap-2 items-center'>
              {ctbt1.text}
              <FaArrowRight/> 
            </div>
          </CTButton>

          <CTButton active={ctbt2.active} linkTo={ctbt2.linkTo}>
              {ctbt2.text}
          </CTButton>

        </div>


      </div>

      <div className='h-fit flex flex-row text-[15px] w-[100%] lg:w-[500px]'>
        <div className='text-center flex flex-col w-[10%] text-gray-400 font-bold'>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
        </div>

        <div className='w-[90%] flex flex-col gap-2 font-bold pr-2 text-yellow-300'>
          <TypeAnimation
            sequence={[codeBlock,2000,""]}
            repeat={Infinity}
            cursor={true}
            style={
              {
                whiteSpace:'pre-line',
                display:'block'
              }
            }
            omitDeletionAnimation={true}
          />
        </div>

      </div>

    </div>
  )
}

export default CodeBlocks