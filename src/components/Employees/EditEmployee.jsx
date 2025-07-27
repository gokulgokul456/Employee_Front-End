import React, { useEffect, useState } from 'react'
import './AddEmployees.css'
import { fetchDepartments } from '../../utils/EmployerHelper'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'


const EditEmployee = () => {

    const [employee, setEmployee] = useState({
        name:"",
        maritalStatus:"",
        designation:"",
        salary:0,
        department:""
    })
    const navigate = useNavigate();

    const {id} = useParams()

    const [departments, setDepartments] = useState(null)

    
    useEffect(()=>{
            const getDepartments = async () => {
                 const departments = await fetchDepartments()
                 setDepartments(departments)
            }
          getDepartments()
        },[])

    useEffect(()=>{
         const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/employee/${id}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          } 
        })
        if (response.data.success) {
            const employee = response.data.employee
          setEmployee((prev)=> ({...prev, name: employee.userId.name,
            maritalStatus: employee.maritalStatus,
            designation: employee.designation,
            salary: employee.salary,
            department: employee.department
           }))
        }
      } catch (error) {
        if (error.response && error.response.data.error) {
          alert(error.response.data.error)
        }
      }
    }

    fetchEmployee();
    },[id])

    const handleChange=(e)=>{
        const {name,value,} = e.target
            setEmployee((prevData) =>({...prevData, [name]: value}))    
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
    try {
  const response = await axios.put(
    `http://localhost:5000/api/employee/${id}`,
    employee,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
  );

  if (response.data.success) {
    alert(response.data.message);
    navigate("/admin/employees");
  } else {
    alert(response.data.error || "Unknown error");
  }

} catch (error) {
  console.error(error);
  alert(error.response?.data?.error || "Request failed");
}

    }


  return (
    <>{departments && employee ? (
    <div className='Emply'>
        <div className='Emply-1'>
            <h3 style={{marginBottom:20}}>Edit Employees</h3>
        <form onSubmit={handleSubmit}>
            <div className='InputBoxes'>
                <div className='InputDivs'>
                    <label htmlFor="">Name</label>
                    <input type="text"  name='name' value={employee.name} placeholder='Employee Name' required  onChange={handleChange} />
                </div>
            </div>
            <div className='InputBoxes'>
                 <div className='InputDivs'>
                  <label>Married Status</label>
                     <select name='maritalStatus' value={employee.maritalStatus} required onChange={handleChange}>
                         <option value="" disabled>Select Status</option>
                         <option value="married">Married</option>
                         <option value="single">Single</option>
                    </select>
                </div>
            </div>
            <div className='InputBoxes'>
                <div className='InputDivs'>
                    <label htmlFor="">Designation</label>
                    <input type="text" name='designation' value={employee.designation} placeholder='Designation'required onChange={handleChange}/>
                </div>
            </div>
            <div className='InputBoxes'>
                <div className='InputDivs'>
                    <label htmlFor="">Salary</label>
                    <input type="number" name='salary' value={employee.salary} placeholder='Salary' required onChange={handleChange}/>
                </div>
            </div>
            <div className='col-span-2'>
                 <div className='InputDivs'>
                    <label htmlFor="">Department</label>
                     <select name='department' value={employee.department} defaultValue="" required onChange={handleChange}>
                         <option value="" disabled>Select Department</option>
                         {departments.map(dep =>(
                            <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                         ))}
                    </select>
                </div>
            </div>
            <button style={{width:200,height:35,borderRadius:5,border:"none",backgroundColor:"#E4642D",color:"white"}} type='submit'>UPDATE EMPLOYEE</button>
        </form>
        </div>
    </div>
    ) : <div>Loading...</div> }</>
  )
}

export default EditEmployee
