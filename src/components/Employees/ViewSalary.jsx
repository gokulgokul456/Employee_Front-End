import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ViewSalary.css'; 

const ViewSalary = () => {
  const [salaries, setSalaries] = useState(null);
  const [filteredSalaries, setFilteredSalaries] = useState(null);
  const { id } = useParams();

  const fetchSalaries = useCallback(async () => {
    try {
      const response = await axios.get(`https://employee-back-end.onrender.com/api/salary/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response);
      
      if (response.data.success) {
        setSalaries(response.data.salary);
        setFilteredSalaries(response.data.salary);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchSalaries();
  }, [fetchSalaries]);

  const handleFilterSalaries = (e) => {
    const q = e.target.value;
    const filterRecords = salaries.filter((salary) =>
      salary.employeeId?.employeeId?.toString().toLowerCase().includes(q.toLowerCase())
    );
    setFilteredSalaries(filterRecords);
  };

  return (
    <>
      {filteredSalaries === null ? (
        <div>View Salary</div>
      ) : (
        <div className='Salary'>
          <div className='Salary-1'>
            <h3>Salary History</h3>
          </div>
          <div className='Salary-2'>
            <input type="text" placeholder='Search' onChange={handleFilterSalaries} />
          </div>

          {filteredSalaries.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>SNO</th>
                  <th>Emp ID</th>
                  <th>Salary</th>
                  <th>Allowance</th>
                  <th>Deduction</th>
                  <th>Total</th>
                  <th>Pay Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredSalaries.map((salary, index) => (
                  <tr key={salary._id}>
                    <td data-label="SNO">{index + 1}</td>
                    <td data-label="Emp ID">{salary.employeeId?.employeeId}</td>
                    <td data-label="Salary">{salary.basicSalary}</td>
                    <td data-label="Allowance">{salary.allowances}</td>
                    <td data-label="Deduction">{salary.deductions}</td>
                    <td data-label="Total">{salary.netSalary}</td>
                    <td data-label="Pay Date">{new Date(salary.payDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}><>No Salary History</></div>
          )}
        </div>
      )}
    </>
  );
};

export default ViewSalary;
