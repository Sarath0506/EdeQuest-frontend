// Sidebar Component
import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import { logout } from '../../../services/operations/authAPI'
import SidebarLink from './SidebarLink'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { VscSignOut } from 'react-icons/vsc'
import ConfirmationModal from '../../common/ConfirmationModal'

const Sidebar = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading, user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const [confirmationModal, setConfirmationModal] = useState(null);

  if (profileLoading || authLoading) {
    return (
      <div className="flex items-center justify-center text-white py-4">Loading...</div>
    )
  }

  return (
    <div className="flex flex-col h-screen w-[220px] bg-gray-900 text-white">
      <div className="flex flex-col py-8 px-4 space-y-3">
        {/* Map Sidebar Links */}
        {sidebarLinks.map((link) => {
          if (link.type && user?.accountType !== link.type) return null
          return (
            <SidebarLink key={link.name} link={link} iconName={link.icon} />
          )
        })}
      </div>

      {/* Divider */}
      <div className='mx-4 my-4 h-[1px] w-5/6 bg-gray-700'></div>

      {/* Settings and Logout Section */}
      <div className="flex flex-col space-y-2 px-4 pb-8">
        <SidebarLink
          link={{ name: "Settings", path: "dashboard/settings" }}
          iconName="VscSettingsGear"
        />

        <button 
        onClick={() => setConfirmationModal({
        text1: "Are you sure?",
        text2: "You will be logged out",
        btn1Text: "Logout",
        btn2Text: "Cancel",
        btn1Handler: () => dispatch(logout(navigate)),
        btn2Handler: () => setConfirmationModal(null),
        })}
        className="flex items-center gap-2 text-sm font-medium hover:text-yellow-400 transition duration-200 ease-in-out"
        >
          <VscSignOut className="text-lg" />
          <span>Logout</span>
        </button>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
}

export default Sidebar
