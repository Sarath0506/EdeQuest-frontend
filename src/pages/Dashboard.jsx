import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Dashboard/Sidebar';

const Dashboard = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);

  if (profileLoading || authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Loading...
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-800 text-white">
      {/* Sidebar - Fixed at 25% width with padding */}
      <aside className="w-1/5 min-w-[250px] bg-gray-900 p-6">
        <Sidebar />
      </aside>

      {/* Main Content - 75% width with scroll and padding */}
      <main className="w-4/5 h-screen overflow-auto p-8 bg-gray-700">
        <Outlet />
      </main>
    </div>
  )
}

export default Dashboard
