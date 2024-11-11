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

        <div className="w-11/12 max-w-[450px] mx-auto pt-8 rounded-lg text-white">
          <table className="w-full text-left table-auto border-collapse">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="px-4 py-2 border-b-2 border-gray-600">Login Details</th>
                <th className="px-4 py-2 border-b-2 border-gray-600">Email</th>
                <th className="px-4 py-2 border-b-2 border-gray-600">Password</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-700 text-white">
                <td className="px-4 py-2 border-b border-gray-600">Student</td>
                <td className="px-4 py-2 border-b border-gray-600">hocexi8272@bulatox.com</td>
                <td className="px-4 py-2 border-b border-gray-600">123456</td>
              </tr>
              <tr className="bg-gray-700 text-white">
                <td className="px-4 py-2 border-b border-gray-600">Instructor</td>
                <td className="px-4 py-2 border-b border-gray-600">-</td>
                <td className="px-4 py-2 border-b border-gray-600">-</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

      

    </div>
  );
}

export default Temp;
