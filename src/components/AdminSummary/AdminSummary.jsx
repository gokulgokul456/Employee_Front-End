import React, { useEffect, useState } from "react";
import "./AdminSummary.css";
import { FaBuilding, FaUsers } from "react-icons/fa";
import SummaryCard from "../SummaryCard/SummaryCard";
import { GiCash } from "react-icons/gi";
import { IoNewspaperOutline } from "react-icons/io5";
import { GiSandsOfTime } from "react-icons/gi";
import { FaCheck } from "react-icons/fa6";
import { FaRegTimesCircle } from "react-icons/fa";
import axios from "axios"


const AdminSummary = () => {

  const [summary , setSummary] = useState(null);

  useEffect(()=>{
    const fetchSummary = async () => {
      try {
        const summary = await axios.get('https://employee-back-end.onrender.com/api/dashboard/summary',{
          headers:{
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          }
        })
        setSummary(summary.data)
        
      } catch (error) {
        if (error.response) {
          alert(error.response.data.error)
        }
        console.log(error.message);
      }
    }
    fetchSummary()
  }, [])

  if (!summary) {
    return <div>Loading.....</div>
    
  }


  return (
    <div className="Summary">
      <div className="topic-1">
        <h4><span style={{color:"#E4642D"}}>Vulturon</span> Global Solution</h4>
      </div>
      <div className="detail-boxes">
        <SummaryCard
          icon={<FaUsers />}
          text="No of Employees"
          number={summary.totalEmployees}
          iconBg="#10b981"
        />
        <SummaryCard
          icon={<FaBuilding />}
          text="No of Departments"
          number={summary.totalDepartments}
          iconBg="#3b82f6"
        />
        <SummaryCard
          icon={<GiCash />}
          text="Total Salary's ₹"
          number={summary.totalSalaries}
          iconBg="red"
        />
      </div>
      <div className="topic-1">
        <h3>Leave Details</h3>
      </div>
      <div className="detail-boxes-1">
        <SummaryCard
          icon={<IoNewspaperOutline />}
          text="No of Applied"
          number={summary.leaveSummary.appliedFor}          
          iconBg="#10b981"
        />
        <SummaryCard
          icon={<GiSandsOfTime />}
          text="No of Pending"
          number={summary.leaveSummary.pending}          
          iconBg="#B57C05"
        />
      </div>
      <div className="detail-boxes-1">
        <SummaryCard
          icon={<FaCheck />}
          text="No of Approved"
          number={summary.leaveSummary.approved}          
          iconBg="#17A34A"
        />
        <SummaryCard
          icon={<FaRegTimesCircle />}
          text="No of Rejected"
          number={summary.leaveSummary.rejected}          
          iconBg="red"
        />
      </div>
    </div>
  );
};

export default AdminSummary;
