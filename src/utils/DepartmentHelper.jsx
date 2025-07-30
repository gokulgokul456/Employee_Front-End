import { useNavigate } from "react-router-dom"
import axios from 'axios'

export const columns =[
    {
        name: "S No",
        selector: (row)=> row.sno
    },
    {
        name: "Department Name",
        selector: (row)=> row.dep_name,
        sortable: true
    },
    {
        name: "Action",
        selector: (row)=> row.action
    },
]

export const DepartmentButtons = ({_id, onDepartmentDelete})=>{
    const navigate = useNavigate()

    const handleDelete= async (_id) => {
        const confirm = window.confirm("Do you want to delete?")
        if (confirm) {
        try{
        const response = await axios.delete(`https://employee-back-end.onrender.com/api/department/${_id}`,{
          headers:{
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
        })
        if (response.data.success) {
           onDepartmentDelete()
        }
      } catch(error){
        if (error.response && error.response.data.error) {
        alert(error.response.data.error)
      }
      }
        } 
    };


    return (
        <div>
            <button style={{width:60, height:25, color:"white", backgroundColor:"#17A34A",marginRight:10,border:"none",}}
            onClick={()=> navigate(`/admin/department/${_id}`)}
            >Update</button>
            <button style={{width:60, height:25, color:"white",backgroundColor:"red",border:"none"}}
            onClick={()=> handleDelete(_id)}>Delete</button>
        </div>
    )
}