// SidebarLink Component
import React from 'react'
import * as Icons from 'react-icons/vsc'
import { useDispatch } from 'react-redux';
import { NavLink, useLocation, matchPath } from 'react-router-dom';
import { resetCourseState, setEditCourse } from '../../../slices/courseSlice';

const SidebarLink = ({ link, iconName }) => {
  const Icon = Icons[iconName]; 
  const location = useLocation();
  const dispatch = useDispatch();

  const matchRoute = (route) => matchPath({ path: route }, location.pathname);

  const handleClick = () => {
    if (link.path === 'dashboard/add-course') {
      dispatch(resetCourseState());
      dispatch(setEditCourse(false));
    }
  };

  return (
    <NavLink
      to={link.path}
      onClick={handleClick}
      className={`relative flex items-center py-2 rounded-md transition-colors duration-200 ease-in-out ${
        matchRoute(link.path) ? "bg-yellow-700 text-gray-900" : "text-white hover:bg-gray-700"
      }`}
    >
      {/* Left Indicator */}
      <span className={`absolute left-0 top-0 h-full w-[3px] rounded-r-md transition-opacity duration-200 ${
        matchRoute(link.path) ? "bg-yellow-400 opacity-100" : "opacity-0"
      }`}></span>

      <Icon className="text-lg" />
      <span className="ml-2 font-medium">{link.name}</span>
    </NavLink>
  )
}

export default SidebarLink
