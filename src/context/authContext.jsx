import React, { createContext, useState, useContext, useEffect } from 'react'; 
import axios from 'axios'


const userContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setloading] = useState(true);


  useEffect(()=>{
    const verifyUser = async ()=>{
      try {
        const token = localStorage.getItem('token')


        const response = await axios.get('http://localhost:5000/api/auth/verify',{
          headers:{
            "Authorization" : `Bearer ${token}`
          }
        })
        if (response.data.success) {
          setUser(response.data.user)
        }else{
          setUser(null)
          setloading(false)
        }
      } catch (error) {
        if (error.response && !error.response.data.error) {
          setUser(null)
        }
      }finally{
        setloading(false)
      }
    }
    verifyUser()
  },[])

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <userContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </userContext.Provider>
  );
};

const useAuth = () => useContext(userContext); 

export { AuthProvider, useAuth }; 
