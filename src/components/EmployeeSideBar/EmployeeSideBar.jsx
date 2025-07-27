import React, { useState } from "react";
import "./EmployeeSideBar.css";
import { NavLink } from "react-router-dom";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { FaRegBuilding } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { GiCash } from "react-icons/gi";
import { IoSettingsSharp } from "react-icons/io5";
import { useAuth } from "../../context/authContext";
import { RiMenuUnfold3Line } from "react-icons/ri";

const EmployeeSideBar = () => {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const linkStyle = {
    width: "85%",
    height: "8%",
    marginTop: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "10px",
    borderRadius: "5px",
    padding: "5px",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: 600,
  };

  const { user } = useAuth();
  return (
    <div className={`dashboard ${isOpen ? "open" : "collapsed"}`}>
      <div className="dash-1" onClick={handleToggle}>
        {isOpen ? (
          <h3 style={{ color: "white" }}>Employee Portal</h3>
        ) : (
          <h2 style={{ color: "white" }}>
            <RiMenuUnfold3Line />
          </h2>
        )}
      </div>

      <div className="dash-2">
        <NavLink
          to="/employee"
          style={({ isActive }) => ({
            ...linkStyle,
            color: isActive ? "white" : "white",
            background: isActive ? "#E4642D" : "none",
          })}
          end
        >
          <MdOutlineDashboardCustomize />
          {isOpen && <span style={{color:"white"}}>Dashboard</span>}
        </NavLink>

        <NavLink
          to={`/employee/profile/${user._id}`}
          style={({ isActive }) => ({
            ...linkStyle,
            color: isActive ? "white" : "white",
            background: isActive ? "#E4642D" : "",
          })}
        >
          <FaUsers />
          {isOpen && <span>Profile</span>}
        </NavLink>

        <NavLink
          to={`/employee/leaves/${user._id}`}
          style={({ isActive }) => ({
            ...linkStyle,
            color: isActive ? "white" : "white",
            background: isActive ? "#E4642D" : "",
          })}
        >
          <SlCalender />
                    {isOpen && <span>Leaves</span>}
        </NavLink>

        <NavLink
          to={`/employee/salary/${user._id}`}
          style={({ isActive }) => ({
            ...linkStyle,
            color: isActive ? "white" : "white",
            background: isActive ? "#E4642D" : "",
          })}
        >
          <GiCash />
                    {isOpen && <span>Salary</span>}
        </NavLink>

        <NavLink
          to="/employee/settings"
          style={({ isActive }) => ({
            ...linkStyle,
            color: isActive ? "white" : "white",
            background: isActive ? "#E4642D" : "",
          })}
        >
          <IoSettingsSharp />
                    {isOpen && <span>Settings</span>}
        </NavLink>
      </div>
    </div>
  );
};

export default EmployeeSideBar;
