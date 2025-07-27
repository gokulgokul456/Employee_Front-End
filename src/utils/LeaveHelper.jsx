import { useNavigate } from "react-router-dom";
import React from "react";

export const LeaveButtons = ({ id }) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/admin/adminleaves/${id}`);
  };

  return (
    <button onClick={()=> handleView(id)} className="btn green">
      View
    </button>
  );
};

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: "Emp ID",
    selector: (row) => row.employeeId,
    width: "120px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    width: "120px",
  },
  {
    name: "Leave Type",
    selector: (row) => row.leaveType,
    width: "140px",
  },
  {
    name: "Department",
    selector: (row) => row.department,
    width: "170px",
  },
  {
    name: "Days",
    selector: (row) => row.days,
    width: "80px",
  },
  {
    name: "Status",
    selector: (row) => row.status,
    width: "120px",
  },
  {
    name: "Action",
    cell: (row) => <LeaveButtons id={row._id} />,
    center: true,
  },
];
