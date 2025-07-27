import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import './Departments.css'
import { BsBuildingFillAdd } from "react-icons/bs";
import DataTable from 'react-data-table-component'
import { columns, DepartmentButtons } from '../../utils/DepartmentHelper';
import axios from 'axios'

const Departments = () => {

  const [departments,setDepartments]= useState([]);
  const [deploading,setDeploading]= useState(false);
  const [filterDepartments , setfilterDepartments]=useState()

  
  const onDepartmentDelete=  () => {
    fetchDepartments()

  }

const fetchDepartments = async()=>{
      setDeploading(true)
      try{
        const response = await axios.get('http://localhost:5000/api/department',{
          headers:{
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
        })
        if (response.data.success) {
          let sno = 1;
          const data = await response.data.departments.map((dep)=>(
            {
              _id: dep._id,
              sno: sno++,
              dep_name: dep.dep_name,
              action: (<DepartmentButtons _id={dep._id} onDepartmentDelete={onDepartmentDelete}/>)
            }
          ))
          setDepartments(data);
          setfilterDepartments(data)
        }
      } catch(error){
        if (error.response && !error.response.data.error) {
        alert(error.response.data.error)
      }
      }finally{
        setDeploading(false)
      }
    };

  useEffect(()=>{
    fetchDepartments();
  },[])

const filterDeparts = (e)=>{
  const records = departments.filter((dep)=>
  dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))
  setfilterDepartments(records)
}

  return (
    <>{deploading ?  <div>Loading...</div> : 
    <div className='Depart'>
      <div className='Depart-1'>
        <h3>Manage Departments</h3>
      </div>
      <div className='Depart-2'>
        <input type="text" placeholder='Search Department' onChange={filterDeparts}/>
        <Link className='link' to='/admin/add-department'> <BsBuildingFillAdd /> Add New Department</Link>
      </div>
      <div style={{marginTop:15}}>
        <DataTable columns={columns} data={filterDepartments} /> 
      </div>
    </div>
    }</>
  )
}

export default Departments
