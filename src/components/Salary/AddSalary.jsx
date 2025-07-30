import React, { useEffect, useState } from 'react'
import { fetchDepartments, getEmployees } from '../../utils/EmployerHelper'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'



const AddSalary = () => {

    const [salary, setSalary] = useState({
        employeeId:null,
        basicSalary: 0,
        allownaces: 0,
        deductions: 0,
        payDate: null, 
    })
    const navigate = useNavigate();

    const [departments, setDepartments] = useState(null)

    const [employees, setEmployees] = useState([])

 
    
    useEffect(()=>{
            const getDepartments = async () => {
                 const departments = await fetchDepartments()
                 setDepartments(departments)
            }
          getDepartments()
        },[])

        const handleDepartment = async (e) => {
         const emps = await getEmployees(e.target.value)
         setEmployees(emps)
        }

    const handleChange=(e)=>{
        const {name,value,} = e.target
            setSalary((prevData) =>({...prevData, [name]: value}))    
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
    try {
  const response = await axios.post(
    `https://employee-back-end.onrender.com/api/salary/add`,
    salary,
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
    <>{departments ? (
    <div className='Emply'>
        <div className='Emply-1'>
            <h3 style={{marginBottom:20}}>Add Salary</h3>
        <form onSubmit={handleSubmit}>
            <div className='col-span-2'>
                 <div className='InputDivs'>
                    <label htmlFor="">Department</label>
                     <select name='department' defaultValue="" required onChange={handleDepartment}>
                         <option value="" disabled>Select Department</option>
                         {departments.map(dep =>(
                            <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                         ))}
                    </select>
                </div>
            </div>
            {/* {Employee} */}
            <div className='col-span-2'>
                 <div className='InputDivs'>
                    <label htmlFor="">Employee</label>
                     <select name='employeeId' defaultValue="" required onChange={handleChange}>
                         <option value="" disabled>Select Employee</option>
                         {employees.map(emp =>(
                            <option key={emp._id} value={emp._id}>{emp.employeeId}</option>
                         ))}
                    </select>
                </div>
            </div>
            <div className='InputBoxes'>
                <div className='InputDivs'>
                    <label htmlFor="">Basic Salary</label>
                    <input type="number" name='basicSalary'placeholder='Basic Salary'required onChange={handleChange}/>
                </div>
            </div>
            <div className='InputBoxes'>
                <div className='InputDivs'>
                    <label htmlFor="">Allownaces</label>
                    <input type="number" name='allowances' placeholder='Allownaces' required onChange={handleChange}/>
                </div>
            </div>

             <div className='InputBoxes'>
                <div className='InputDivs'>
                    <label htmlFor="">deductions</label>
                    <input type="number" name='deductions' placeholder='deductions' required onChange={handleChange}/>
                </div>
            </div>

            <div className='InputBoxes'>
                <div className='InputDivs'>
                    <label htmlFor="">Pay Date</label>
                    <input type="date" name='payDate' placeholder='Pay Date' required onChange={handleChange}/>
                </div>
            </div>
            <button style={{width:200,height:35,borderRadius:5,border:"none",backgroundColor:"#E4642D",color:"white"}} type='submit'>UPDATE SALARY</button>
        </form>
        </div>
    </div>
    ) : <div>Loading...</div> }</>
  )
}

export default AddSalary
