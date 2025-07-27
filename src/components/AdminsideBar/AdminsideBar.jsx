import React, { useState } from 'react';
import './AdminsideBar.css';
import { NavLink } from 'react-router-dom';
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FaUsers, FaRegBuilding } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { GiCash } from "react-icons/gi";
import { IoSettingsSharp } from "react-icons/io5";
import { RiMenuUnfold3Line } from "react-icons/ri";


const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768);

  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };

  const linkStyle = {
    width: '85%',
    height: '8%',
    marginTop: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: isOpen ? 'flex-start' : 'center',
    gap: isOpen ? '10px' : '0px',
    borderRadius: '5px',
    padding: '5px',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: 600,
    color:"white"
  };

  return (
    <div className={`dashboard ${isOpen ? 'open' : 'collapsed'}`}>
      <div className="dash-1" onClick={handleToggle}>
        {isOpen ? <h3 style={{color:"white"}}>Admin Portal</h3> : <h2 style={{color:"white"}}><RiMenuUnfold3Line /></h2>}
      </div>

      <div className="dash-2">
        <NavLink to="/admin" style={({ isActive }) => ({ ...linkStyle, background: isActive ? '#E4642D' : 'none' })} end>
          <MdOutlineDashboardCustomize />
          {isOpen && <span style={{color:"white"}}>Dashboard</span>}
        </NavLink>

        <NavLink to="/admin/employees" style={({ isActive }) => ({ ...linkStyle, background: isActive ? '#E4642D' : 'none' })}>
          <FaUsers />
          {isOpen && <span>Employees</span>}
        </NavLink>

        <NavLink to="/admin/departments" style={({ isActive }) => ({ ...linkStyle, background: isActive ? '#E4642D' : 'none' })}>
          <FaRegBuilding />
          {isOpen && <span>Departments</span>}
        </NavLink>

        <NavLink to="/admin/adminleaves" style={({ isActive }) => ({ ...linkStyle, background: isActive ? '#E4642D' : 'none' })}>
          <SlCalender />
          {isOpen && <span>Leaves</span>}
        </NavLink>

        <NavLink to="/admin/salary/add" style={({ isActive }) => ({ ...linkStyle, background: isActive ? '#E4642D' : 'none' })}>
          <GiCash />
          {isOpen && <span>Salary</span>}
        </NavLink>

        <NavLink to="/admin/settings" style={({ isActive }) => ({ ...linkStyle, background: isActive ? '#E4642D' : 'none' })}>
          <IoSettingsSharp />
          {isOpen && <span>Settings</span>}
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
