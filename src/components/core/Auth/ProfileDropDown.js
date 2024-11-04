import React, { useState } from 'react'
import { AiOutlineCaretDown } from 'react-icons/ai';
import { VscDashboard, VscSignOut } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../services/operations/authAPI'

const ProfileDropDown = () => {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <div className='relative'>
      <button 
        className='flex items-center gap-x-1' 
        onClick={() => setOpen(!open)} 
      >
        <div className='flex items-center'>
          <img
            src={user?.image}
            className='aspect-square w-[30px] rounded-full object-cover'
            alt="profile"
          />
          <AiOutlineCaretDown />
        </div>
      </button>

      {/* Dropdown menu */}
      {open && (
        <div
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the dropdown
          className='absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-gray-700
            overflow-hidden rounded-md border-[1px] border-gray-700 bg-gray-700'
        >
          <Link to='/dashboard/my-profile' onClick={() => setOpen(false)}>
            <div className='flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-white hover:bg-gray-700 hover:text-white'>
              <VscDashboard />
              Dashboard
            </div>
          </Link>

          <div
            className='flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-white cursor-pointer hover:bg-gray-700 hover:text-white'
            onClick={() => {
              dispatch(logout(navigate));
              setOpen(false);
            }}
          >
            <VscSignOut />
            Logout
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileDropDown;
