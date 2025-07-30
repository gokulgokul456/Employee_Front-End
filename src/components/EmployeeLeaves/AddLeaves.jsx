import React, { useState } from 'react'
import './AddLeave.css'
import {useAuth} from "../../context/authContext"
import { Await, useNavigate } from 'react-router-dom'
import axios from 'axios'

const AddLeaves = () => {

    const {user } = useAuth()

    const [leave, setLeave] = useState({
        userId : user._id, 
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        const {name , value} = e.target
        setLeave((preState) => ({...preState, [name]: value}))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Submitting leave with data:", leave);
            const response = await axios.post(
                `https://employee-back-end.onrender.com/api/leaves/add`,leave,
                {
                    headers: {
                        Authorization : `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            console.log(response);
            
            
            if (response.data.success) {
               navigate(`/employee/leaves/${user._id}`)
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error) 
            }
        }
    }


  return (
   <div className='Emply'>
        <div className='Emplyy-1'>
            <h3 style={{marginBottom:20}}>Request For Leave</h3>
        <form onSubmit={handleSubmit}> 
            <div className='InputBoxes'>
                <div className='InputDivs'>
                    <label htmlFor="">From</label>
                    <input type="date" name='startDate' placeholder='Designation' onChange={handleChange} required />
                </div>
            </div>
            <div className='InputBoxes'>
                <div className='InputDivs'>
                    <label htmlFor="">To</label>
                    <input type="date" name='endDate' placeholder='Designation' onChange={handleChange} required />
                </div>
            </div>
            <div className='InputBoxes'>
               <div className='InputDivs'>
                  <label>Leave Type</label>
                     <select name='leaveType' defaultValue="" onChange={handleChange} required >
                         <option value="" disabled>Select Type</option>
                         <option value="Sick Leave">Sick Leave</option>
                         <option value="Annual Leave">Annual Leave</option>
                         <option value="Casual Leave">Casual Leave</option>
                         <option value="Other">Other</option>
                    </select>
                </div>
            </div>
            <div className='InputBoxes'>
                <div className='Description'>
                    <label htmlFor="">Description</label>
                    <input type="text" name='Description' placeholder='Enter Here' onChange={handleChange} required />
                </div>
            </div>
            <button style={{width:200,height:35,borderRadius:5,border:"none",backgroundColor:"#E4642D",color:"white"}} type='submit'>APPLY LEAVE</button>
        </form>
        </div>
    </div>
  )
}

export default AddLeaves
