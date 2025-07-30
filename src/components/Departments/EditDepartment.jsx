import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './EditDepartment.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const EditDepartment = () => {
    const {id} = useParams()
    const [department, setDepartment]= useState({
        dep_name:"",
        description:""
    })
    const [deploading, setDeploading]= useState(false)
    const navigate = useNavigate()


     useEffect(()=>{

    const fetchDepartments = async()=>{
      setDeploading(true)
      try{
        const response = await axios.get(`https://employee-back-end.onrender.com/api/department/${id}`,{
          headers:{
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
        })
        
        if (response.data.success) {
            setDepartment(response.data.department)
        }
      } catch(error){
        if (error.response && error.response.data.error) {
        alert(error.response.data.error)
      }
      }finally{
        setDeploading(false)
      }
    };
fetchDepartments();
  },[id])

  const handleChange = (e)=>{
    const {name, value} = e.target;
    setDepartment({...department, [name]: value})
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      const response = await axios.put(`https://employee-back-end.onrender.com/api/department/${id}`, department,{
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
    <>{deploading ? <div>Loading...</div> : 
    <div className='D-part'>
     <div className='D-part-1'>
      <h3>Update Department</h3>
      <form onSubmit={handleSubmit}>
        <div className='D-part-2'>
          <label htmlFor="dep_name" >Department Name :</label>
          <input type="text" placeholder='Enter Dep Name'  name="dep_name" onChange={handleChange} value={department.dep_name}/>
        </div>
        <div className='D-part-3'>
          <label htmlFor="description">Description :</label>
          <textarea name="description" placeholder='Description' onChange={handleChange} value={department.description}></textarea>
        </div>
        <button>UPDATE</button>
      </form>
     </div>
    </div>
    }</>
  )
}

export default EditDepartment
