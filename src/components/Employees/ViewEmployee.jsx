import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './ViewEmployee.css'

const ViewEmployee = () => {
  const { id } = useParams()
  const [employee, setEmployee] = useState(null)

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/employee/${id}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          } 
        })
        if (response.data.success) {
          setEmployee(response.data.employee)
        }
      } catch (error) {
        if (error.response && error.response.data.error) {
          alert(error.response.data.error)
        }
      }
    }

    fetchEmployee();
  }, [id])

  return (
    <>

      {employee ? (
        <div className='ViewProfile'>
          <div className='ProfileSec'>
          <div style={{ marginRight: "20px" }}>
            <h3 style={{marginBottom:10}}>Employee Detail</h3>
            <img
              src={`http://localhost:5000/uploads/${employee.userId.profileImage}`}
              alt="Profile"
              style={{ width: "200px", height: "250px", borderRadius: "10px", objectFit: "cover" }}
            />
          </div>
          <div>
            <p><strong>Name:</strong> {employee.userId?.name}</p>
            <p><strong>Department:</strong> {employee.department?.dep_name}</p>
            <p><strong>DOB:</strong> {new Date(employee.dob).toDateString()}</p>
          </div>
          </div>
        </div>
      ) : <div style={{display:"flex", alignItems: "center", justifyContent: "center", marginTop: 50}}> <h2>No Records Try Again</h2> </div>}
    </>
  )
}

export default ViewEmployee
