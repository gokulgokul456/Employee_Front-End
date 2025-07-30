import React, { useEffect, useState } from 'react'
import './AddEmployees.css'
import { fetchDepartments } from '../../utils/EmployerHelper'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const AddEmployees = () => {

    const [departments, setDepartments] = useState([])

    const [formData,setFormData]=useState({})

    const navigate = useNavigate();

    useEffect(()=>{
        const getDepartments = async () => {
             const departments = await fetchDepartments()
             setDepartments(departments)
        }
      getDepartments()
    },[])

    const handleChange=(e)=>{
        const {name,value,files} = e.target
        if (name=="image") {
            setFormData((prevData) =>({...prevData, [name]: files[0]}))   
        }else{
            setFormData((prevData) =>({...prevData, [name]: value}))    
        }
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()

        const formDataObj = new FormData();
        Object.keys(formData).forEach((key)=>{
            formDataObj.append(key, formData[key])
        })

    try {
  const response = await axios.post(
    'https://employee-back-end.onrender.com/api/employee/add',
    formDataObj,
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
    <div className='Emply'>
        <div className='Emply-1'>
            <h3 style={{marginBottom:20}}>Add New Employees</h3>
        <form onSubmit={handleSubmit}>
            <div className='InputBoxes'>
                <div className='InputDivs'>
                    <label htmlFor="">Name</label>
                    <input type="text"  name='name' placeholder='Employee Name' required  onChange={handleChange} />
                </div>
                <div className='InputDivs'>
                    <label htmlFor="">Email</label>
                    <input type="email" name='email' placeholder='Employee Email'  required onChange={handleChange} />
                </div>
            </div>
            <div className='InputBoxes'>
                <div className='InputDivs'>
                    <label htmlFor="">Employee ID</label>
                    <input type="text" name='employeeId' placeholder='Employee ID' required onChange={handleChange}/>
                </div>
                <div className='InputDivs'>
                    <label htmlFor="">Date of Birth</label>
                    <input type="date" name='dob' placeholder='Employee Name' required onChange={handleChange}/>
                </div>
            </div>
            <div className='InputBoxes'>
               <div className='InputDivs'>
                  <label>Gender</label>
                     <select name='gender' defaultValue="" required onChange={handleChange}>
                         <option value="" disabled>Select Gender</option>
                         <option value="male">Male</option>
                         <option value="female">Female</option>
                    </select>
                </div>
                 <div className='InputDivs'>
                  <label>Married Status</label>
                     <select name='maritalStatus' defaultValue="" required onChange={handleChange}>
                         <option value="" disabled>Select Status</option>
                         <option value="married">Married</option>
                         <option value="single">Single</option>
                    </select>
                </div>
            </div>
            <div className='InputBoxes'>
                <div className='InputDivs'>
                    <label htmlFor="">Designation</label>
                    <input type="text" name='designation' placeholder='Designation'required onChange={handleChange}/>
                </div>
                <div className='InputDivs'>
                    <label htmlFor="">Department</label>
                     <select name='department' defaultValue="" required onChange={handleChange}>
                         <option value="" disabled>Select Department</option>
                         {departments.map(dep =>(
                            <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                         ))}
                    </select>
                </div>
            </div>
            <div className='InputBoxes'>
                <div className='InputDivs'>
                    <label htmlFor="">Salary</label>
                    <input type="number" name='salary' placeholder='Salary' required onChange={handleChange}/>
                </div>
                <div className='InputDivs'>
                    <label htmlFor="">Password</label>
                    <input type="password" name='password' placeholder='*******'required onChange={handleChange} />
                </div>
            </div>
            <div className='InputBoxes'>
               <div className='InputDivs'>
                  <label>Role</label>
                     <select name='role' defaultValue="" required onChange={handleChange}>
                         <option value="" disabled>Select Role</option>
                         <option value="employee">Employee</option>
                         <option value="admin">Admin</option>
                    </select>
                </div>
                 <div className='InputDivs'>
                  <label>Upload Image</label>
                     <input type="file" name='image' placeholder='Upload Image' accept='image/*'onChange={handleChange} />
                </div>
            </div>
            <button style={{width:200,height:35,borderRadius:5,border:"none",backgroundColor:"#E4642D",color:"white"}} type='submit'>ADD EMPLOYEE</button>
        </form>
        </div>
    </div>
  )
}

export default AddEmployees
