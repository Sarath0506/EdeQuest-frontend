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

      </div>

      <div className="relative w-11/12 max-w-[450px] flex flex-col">
        
        <div>
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

        <div className="w-11/12 max-w-[450px] mx-auto p-4 bg-gray-100 border border-gray-300 rounded-lg text-gray-800">
          <h2 className="text-lg font-semibold mb-2">Student Login Details</h2>
          <p>Email: hocexi8272@bulatox.com</p>
          <p>Password: 123456</p>
        </div>

      </div>

      

    </div>
  );
}

export default Temp;
