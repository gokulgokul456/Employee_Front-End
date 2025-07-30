import React, { useEffect, useState } from "react";
import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import axios from "axios";

const EmployeeLeaves = () => {
  const { user } = useAuth();
  const [leaves, setleaves] = useState([]);
  let sno = 1;

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(
        `https://employee-back-end.onrender.com/api/leaves/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("API Response:", response.data);
      if (response.data.success) {
        setleaves(response.data.leaves);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <div className="Depart">
      <div className="Depart-1">
        <h3>Manage Leaves</h3>
      </div>
      <div className="Depart-2">
        <input type="text" placeholder="Search By Leave" />
        <Link className="link" to="apply-leave">
          {" "}
          <SlCalender /> Apply Leave
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>SNO</th>
            <th>Leave Type</th>
            <th>From</th>
            <th>To</th>
            <th>Description</th>
            <th>Applied Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave._id}>
              <td>{sno++}</td>
              <td>{leave.leaveType}</td>
              <td>{new Date(leave.startDate).toDateString()}</td>
              <td>{new Date(leave.endDate).toDateString()}</td>
              <td>{leave.Description}</td>
              <td>{new Date(leave.appliedAt).toISOString().slice(0, 10)}</td>
              <td
                style={{
                  color:
                    leave.status === "Pending"
                      ? "orange"
                      : leave.status === "Approved"
                      ? "green"
                      : "red",
                }}
              >
                {leave.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeLeaves;
