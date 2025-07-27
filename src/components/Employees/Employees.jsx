import React, { useEffect, useState } from 'react'
import './Employees.css'
import DataTable from 'react-data-table-component'
import {data, Link} from 'react-router-dom'
import { FaUsers } from 'react-icons/fa'
import { columns,EmployeeButtons } from '../../utils/EmployerHelper'
import axios from 'axios'





const Employees = () => {
  const [employees, setEmployees] = useState([])
  const [emploading,setEmploading]= useState(false);
  const [filteredEmployee, setFilteredEmployee] = useState([])
  

  useEffect(()=>{
  
      const fetchEmployees = async()=>{
        setEmploading(true)
        try{
          const response = await axios.get('http://localhost:5000/api/employee',{
            headers:{
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
          })
          if (response.data.success) {
            let sno = 1;
            const data = await response.data.employees.map((emp)=>(
              {
                _id: emp._id,
                sno: sno++,
                dep_name: emp.department.dep_name,
                name: emp.userId.name,
                dob : new Date(emp.dob).toDateString(),
                profileImage: emp.userId.profileImage, 
                action: (<EmployeeButtons id={emp._id}  />),
              }
            ))
            setEmployees(data);
            setFilteredEmployee(data)
          }
        } catch(error){
          if (error.response && !error.response.data.error) {
          alert(error.response.data.error)
        }
        }finally{
          setEmploading(false)
          
        }
      };
  fetchEmployees();
    },[])

    const handleFilter = (e)=>{
      const records = employees.filter((emp)=>(
        emp.name.toLowerCase().includes(e.target.value.toLowerCase())
      ))
      setFilteredEmployee(records)
    }

  return (
    <>{emploading ?  <div>Loading...</div> : 
    <div className='Depart'>
      <div className='Depart-1'>
        <h3>Manage Employees</h3>
      </div>
      <div className='Depart-2'>
        <input type="text" placeholder='Search By Employee ID' onChange={handleFilter} />
        <Link className='link' to='/admin/add-employee'> <FaUsers /> Add New Employee</Link>
      </div>
      <div style={{marginTop:15}}>
        <DataTable columns={columns}  data={filteredEmployee} /> 
      </div>
    </div>
}</>
    
  )
}

export default Employees
