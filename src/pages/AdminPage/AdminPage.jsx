import React from 'react'
import { useAuth } from '../../context/authContext'
import { Navigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import AdminsideBar from '../../components/AdminsideBar/AdminsideBar'
import Navbar from '../../components/Navbar/Navbar'
import './AdminPage.css'

const AdminPage = () => {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/" />
  }

  return (
    <div className='AdminPage'>
      <div className='Admin-1'>
        <AdminsideBar />
      </div>
      <div className='Admin-2'>
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default AdminPage
