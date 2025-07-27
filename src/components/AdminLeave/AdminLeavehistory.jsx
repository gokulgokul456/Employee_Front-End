import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EmployeeLeaves = () => {
  const [leaves, setleaves] = useState(null);
  let sno = 1;
  const { id } = useParams();

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/leaves/admin/employee/${id}`,
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
  }, [id]);

  if (!leaves) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Depart">
      <div className="Depart-1">
        <h3>Employee Leave Details</h3>
      </div>
      <div className="Depart-2">
        <input type="text" placeholder="Search By Leave" />
      </div>

      {leaves.length === 0 ? (
        <div style={{display:"flex", alignItems:"center",justifyContent:"center",}}><h3>No Records Found</h3></div>
      ) : (
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
      )}
    </div>
  );
};

export default EmployeeLeaves;
