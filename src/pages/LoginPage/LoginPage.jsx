import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../../context/authContext'
import axios from 'axios'
import './LoginPage.css';
import logo from '../../assets/logo-company.png'

  function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError] = useState(null)
    const {login} = useAuth()

    const navigate = useNavigate();

  const handleLogin = async(e) =>{
    e.preventDefault()
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",{email,password});
      
    if (response.data.success) {
      login(response.data.user)
      localStorage.setItem("token", response.data.token)
      if (response.data.user.role === "admin") {
        navigate('/admin')
      }else{
        navigate('/')
        alert("Admin Not Found")
      }
    }

    } catch (error) {
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error)
      } else{
        setError("Server Error")
      }
      
    }

  }



    return (
      <div className="form-box" onSubmit={handleLogin}>
        <h2>ADMIN</h2>
        <input
          type="text"
          placeholder="Admin Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="login-btn" onClick={handleLogin}>LOGIN </button>
        {error && <p style={{color:"red"}}>{error}</p>}
      </div>
    );
  }

function EmployeeLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError] = useState(null)
    const {login} = useAuth()

    const navigate = useNavigate();

  const handleLogin = async(e) =>{
    e.preventDefault()
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",{email,password});
      
    if (response.data.success) {
      login(response.data.user)
      localStorage.setItem("token", response.data.token)
      if (response.data.user.role === "employee") {
        navigate('/employee')
      }else{
        navigate('/')
        alert("Employee Not Found")
      }
    }

    } catch (error) {
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error)
      } else{
        setError("Server Error")
      }
      
    }

  }



    return (
      <div className="form-box" onSubmit={handleLogin}>
        <h2>EMPLOYEE</h2>
        <input
          type="text"
          placeholder="Admin Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="login-btn" onClick={handleLogin}>LOGIN</button>
        {error && <p style={{color:"red"}}>{error}</p>}
      </div>
    );
  }

function LoginPage() {
  const [activeTab, setActiveTab] = useState('admin');

  return (
    <div className="login-container">
      <div className="login-nav">
        <span
          className={activeTab === 'admin' ? 'active' : ''}
          onClick={() => setActiveTab('admin')}
        >
          ADMIN
        </span>
        <span
          className={activeTab === 'employee' ? 'active' : ''}
          onClick={() => setActiveTab('employee')}
        >
          EMPLOYEE 
        </span>
      </div>

      <h1 className="welcome-title"><img style={{width:140, height:70}} src={logo} alt="" />
</h1>
      {activeTab === 'admin' ? <AdminLogin /> : <EmployeeLogin />}
    </div>
  );
}

export default LoginPage;
