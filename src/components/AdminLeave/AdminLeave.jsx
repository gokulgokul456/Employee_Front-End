import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { columns } from '../../utils/LeaveHelper';

const AdminLeave = () => {
  const [leaves, setLeaves] = useState(null);
  const [filterLeaves, setFilterLeaves] = useState(null);
  

  const fetchLeaves = async () => {
    
    try {
      const response = await axios.get('https://employee-back-end.onrender.com/api/leaves', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.success) {
        let sno = 1;
        const data = response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId.employeeId,
          name: leave.employeeId.userId.name,
          department: leave.employeeId.department.dep_name,
          leaveType: leave.leaveType,
          days:
            new Date(leave.endDate).getDate() -
            new Date(leave.startDate).getDate(),
          status: leave.status,
        }));

        setLeaves(data);
        setFilterLeaves(data);
      }
    } catch (error) {
      console.error("Error fetching leaves:", error);
      if (error.response && error.response.data?.error) {
        alert(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const filterByInput = async (e) => {
    const data = leaves.filter(leave=> leave.employeeId
      .toLowerCase()
      .includes(e.target.value.toLowerCase()));
    setFilterLeaves(data)
  }
  const filterByButton = async (status) => {
    const data = leaves.filter(leave=> leave.status
      .toLowerCase()
      .includes(status.toLowerCase()));
    setFilterLeaves(data)
  }

  return (
    <>
      {filterLeaves ? (
        <div className='Depart'>
          <div className='Depart-1'>
            <h3>Leave History</h3>
          </div>
          <div className='Depart-2'>
            <input type="text" placeholder='Search Employee ID' onChange={filterByInput}/>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                width: 400,
                height: 50
              }}
            >
              <button className="btn green"  onClick={()=> filterByButton("Approved")}>Approved</button>
              <button className="btn red"    onClick={()=> filterByButton("Rejected")}>Rejected</button>
              <button className="btn orange" onClick={()=> filterByButton("Pending")}>Pending</button>
            </div>
          </div>

          <style>{`
            .btn {
              width: 120px;
              height: 30px;
              border: none;
              color: white;
              border-radius: 5px;
              cursor: pointer;
              transition: background-color 0.3s ease;
            }

            .btn.green {
              background-color: #E4642D;
            }
            .btn.green:hover {
              background-color: green;
            }

            .btn.red {
              background-color: #E4642D;
            }
            .btn.red:hover {
              background-color: red;
            }

            .btn.orange {
              background-color: #E4642D;
            }
            .btn.orange:hover {
              background-color: orange;
            }
          `}</style>

          <DataTable columns={columns} data={filterLeaves}  />
        </div>
      ) : (
        <div>No Records...</div>
      )}
    </>
  );
};

export default AdminLeave;
