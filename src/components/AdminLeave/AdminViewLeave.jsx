import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

const AdminViewLeave = () => {
  const { id } = useParams()
  const [leave, setLeave] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(`https://employee-back-end.onrender.com/api/leaves/detail/${id}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          } 
        })
        if (response.data.success) {
          setLeave(response.data.leave)
        }
      } catch (error) {
        if (error.response && error.response.data.error) {
          alert(error.response.data.error)
        }
      }
    }

    fetchLeave();
  }, [id]);


  const changeStatus = async (id, status) => {
    try {
        const response = await axios.put(`https://employee-back-end.onrender.com/api/leaves/${id}`, {status} ,{
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          } 
        })
        if (response.data.success) {
          navigate('/admin/adminleaves')
        }
      } catch (error) {
        if (error.response && error.response.data.error) {
          alert(error.response.data.error)
        }
      }
  }

  return (
    <>
      {leave ? (
        <div style={{
          display: "flex",
          alignItems: "center",
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "20px",
          width: "600px",
          height:"400px",
          margin: "50px auto",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          gap:10
        }}>
          <div style={{ marginRight: "20px" }}>
            <h3 style={{marginBottom:10}}>Leave Detail</h3>
            <img
              src={`https://employee-back-end.onrender.com/uploads/${leave.employeeId.userId.profileImage}`}
              alt="Profile"
              style={{ width: "200px", height: "250px", borderRadius: "10px", objectFit: "cover" }}
            />
          </div>
          <div style={{height:280,marginTop:25,display:"flex",alignItems:"start",justifyContent:"center",flexDirection:"column",gap:10}}>
            <p><strong>Name :</strong> {leave.employeeId.userId?.name}</p>
            <p><strong>EmployeeID :</strong> {leave.employeeId.employeeId}</p>
            <p><strong>Department  :</strong> {leave.employeeId.department?.dep_name}</p>
            <p><strong>Leave Type :</strong> {leave.leaveType}</p>
            <p><strong>Reason :</strong> {leave.Description}</p>
            <p><strong>Start Date  :</strong> { new Date (leave.startDate).toLocaleDateString()}</p>
            <p><strong>End Date  :</strong> { new Date (leave.endDate).toLocaleDateString()}</p>
            <p><strong>{leave.status === "Pending" ? "Action:" : "Status:"}</strong>{leave.status === "Pending" ? (<span style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
              <button style={{width:90, height:30,borderRadius:5,border:"none",color:"white",backgroundColor:"darkgreen"}}
              onClick={()=> changeStatus(leave._id, "Approved")}
              >Approve</button>
              <button style={{width:90, height:30,borderRadius:5,border:"none",color:"white",backgroundColor:"red"}}
              onClick={()=> changeStatus(leave._id, "Rejected")}
              >Reject</button>
            </span>) : (leave.status)}
            </p>
          </div>
        </div>
      ) : <div style={{display:"flex", alignItems: "center", justifyContent: "center", marginTop: 50}}> <h2>No Records</h2> </div>}
    </>
  )
}

export default AdminViewLeave

 

