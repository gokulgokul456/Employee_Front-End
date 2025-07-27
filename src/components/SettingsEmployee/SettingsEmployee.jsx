import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const SettingsEmployee = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [settings, setSettings] = useState({
    userId: user._id,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (settings.newPassword !== settings.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:5000/api/settings/changepassword",
        settings,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setError("");
        alert("Password updated successfully");
        navigate("/employee");
      } else {
        setError(response.data.message || "Something went wrong");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Server error. Please try again later."
      );
    }
  };

  return (
    <div className='D-part'>
      <div className='D-part-1'>
        <h3>Change Password</h3>
        <form onSubmit={handleSubmit}>
          <div className='D-part-2'>
            <label>Old Password</label>
            <input
              type="password"
              name="oldPassword"
              placeholder="Old Password"
              onChange={handleChange}
              required
            />
          </div>
          <div className='D-part-2'>
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              onChange={handleChange}
              required
            />
          </div>
          <div className='D-part-2'>
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              required
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit">
            <h3>Update</h3>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingsEmployee;
