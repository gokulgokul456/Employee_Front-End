import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export const columns =[
    {
        name: "S No",
        selector: (row)=> row.sno,
        width: "70px"
    },
    {
        name: "Name",
        selector: (row)=> row.name,
        sortable: true,
         width: "130px"
    },
     {
     name: "Image",
     selector: (row) => (<img src={`http://localhost:5000/uploads/${row.profileImage}`} alt="Profile"style={{ width: "40px", height: "40px", borderRadius: "50%" }}/>),
      width: "80px"
    },
     {
        name: "Department",
        selector: (row)=> row.dep_name,
         width: "280px"
    },
     {
        name: "DOB",
        selector: (row)=> row.dob,
        sortable: true
    },
    {
        name: "Action",
        selector: (row)=> row.action
    },
]



 
 export const fetchDepartments = async()=>{
    let departments

      try{
        const response = await axios.get('http://localhost:5000/api/department',{
          headers:{
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
        })
        if (response.data.success) {
            departments = response.data.departments 
         
        }
      } catch(error){
        if (error.response && !error.response.data.error) {
        alert(error.response.data.error)
      }
      }
      return departments
    };

    export const getEmployees = async(id)=>{
    let employees;

      try{
        const response = await axios.get(`http://localhost:5000/api/employee/department/${id}`,{
          headers:{
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
        })
        if (response.data.success) {
            employees = response.data.employees 
         
        }
      } catch(error){
        if (error.response && !error.response.data.error) {
        alert(error.response.data.error)
      }
      }
      return employees
    };

    export const EmployeeButtons = ({id})=>{
    const navigate = useNavigate()

   

    return (
        <div>
            <button style={{width:60, height:25, color:"white", backgroundColor:"#17A34A",marginRight:10,border:"none",}}
            onClick={()=> navigate(`/admin/employees/${id}`)}>
            View</button>
            <button style={{width:60, height:25, color:"white",backgroundColor:"orange",border:"none",marginRight:"10px"}}
            onClick={()=> navigate(`/admin/employees/edit/${id}`)}>
            Edit</button>
             <button style={{width:60, height:25, color:"white",backgroundColor:"#E4642D",border:"none",marginRight:"10px"}}
             onClick={()=> navigate(`/admin/employees/salary/${id}`)}>
            Salary</button>
             <button style={{width:60, height:25, color:"white",backgroundColor:"red",border:"none",marginRight:"10px"}}
             onClick={()=> navigate(`/admin/employees/leaves/${id}`)}
             >
            Leave</button>
        </div>
    )
}