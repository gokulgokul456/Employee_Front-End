import React from 'react'
import './EmployeeSummary.css'
import { FaUsers } from 'react-icons/fa'
import { useAuth } from '../../context/authContext'




const EmployeeSummary = ({ icon, iconBg }) => {
    const {user} =  useAuth()
  return (
<div className='Summary'> 
      <div className='topic'>
        <h4><span style={{color:"#E4642D"}}>Vulturon</span> Global Solution Private Limited</h4>
      </div> 
    <div className='card'>
      <div className='card-1' >
        <FaUsers/>
      </div>
      <div className='card-2'>
        <p className='card-text'>Hello, </p>
        <p className='card-number'>{user.name}</p>
      </div>
    </div>
</div>

  )
}

export default EmployeeSummary
