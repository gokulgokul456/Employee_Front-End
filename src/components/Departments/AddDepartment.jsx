import React, { useState } from 'react'
import './AddDepartment.css'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const AddDepartment = () => {
  const [department,setDepartment]= useState({
    dep_name:'',
    description:''

  });
  const navigate = useNavigate()

  const handleChange = (e)=>{
    const {name, value} = e.target;
    setDepartment({...department, [name]: value})
  }
  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      const response = await axios.post('https://employee-back-end.onrender.com/api/department/add', department,{
        headers:{
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.data.success) {
        navigate("/admin/departments")

        
      }
    } catch (error) {
      if (error.response && !error.response.data.error) {
        alert(error.response.data.error)
      }
    }
  }
  return (
    <div className='D-part'>
     <div className='D-part-1'>
      <h3>Add New Department</h3>
      <form onSubmit={handleSubmit}>
        <div className='D-part-2'>
          <label htmlFor="dep_name" >Department Name :</label>
          <input type="text" placeholder='Enter Dep Name'  name="dep_name" onChange={handleChange}/>
        </div>
        <div className='D-part-3'>
          <label htmlFor="description">Description :</label>
          <textarea name="description" placeholder='Description' onChange={handleChange}></textarea>
        </div>
        <button>ADD DEPARTMENT</button>
      </form>
     </div>
    </div>
  )
}

export default AddDepartment
