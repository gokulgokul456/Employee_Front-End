import React from 'react'
import {useAuth} from '../../context/authContext'
import {useNavigate} from 'react-router-dom'
import SideBar from '../../components/EmployeeSideBar/EmployeeSideBar'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'

const EmployeePage = () => {

  const {user,loading} = useAuth()
  const navigate = useNavigate()

  if (loading) {
    return <div>Loading...</div>
    
  }

  if (!user) {
    navigate('/')
  }

  return (
    <div className='AdminPage'>
      <div className='Admin-1'>
        <SideBar />
      </div>
      <div className='Admin-2'>
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default EmployeePage
