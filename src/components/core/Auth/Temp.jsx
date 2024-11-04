import React from 'react';
import frame from '../../../assets/frame.png';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
import { FcGoogle } from 'react-icons/fc';

function Temp({ title, dec1, dec2, image, formType }) {
  return (
    <div className="flex w-11/12 max-w-[1160px] py-12 mx-auto gap-y-0 gap-x-12 justify-between">
      <div className="w-11/12 max-w-[450px] mx-0 text-white"> 
        <h1 className="text-white font-semibold text-[1.875rem] leading-[2.375rem]"
        >{title}</h1>
        <p className="text-[1.125rem] mt-4 leading-[1.625rem]">
          <span className='text-white'>{dec1}</span>
          <br/>
          <span className='text-blue-900 italic'>{dec2}</span>
        </p>

        {formType === "signup" ? (<SignUpForm/>) : (<LoginForm/>)}

        <div className="flex w-full items-center my-4 gap-x-2">
          <div className="h-[1px] w-full bg-slate-500"></div>
          <p className="text-richblack-700 font-medium leading-[1.375rem]">Or</p>
          <div className="h-[1px] w-full bg-slate-500"></div>
        </div>

        <button className="w-full flex items-center justify-center rounded-[8px] font-medium text-richblack-100 border px-[12px] py-[8px] gap-x-2 mt-6 border-gray-800  bg-gray-800">
          <FcGoogle/>
          <p>Sign in with Google</p>
        </button>
      </div>

      <div className="relative w-11/12 max-w-[450px]">
        <img
          src={frame}
          width={558}
          height={584}
          loading='lazy'
          alt="Frame"
        />

        <img
          src={image}
          width={558}
          height={584}
          loading='lazy'
          alt="Main"
          className="absolute -top-4 right-4 "
        />
      </div>

    </div>
  );
}

export default Temp;
