// src/context/AuthContext.js
//
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Creating Context here babyy 
export const AuthContext = createContext();

// each Context need a Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:5000/check_auth", { withCredentials: true });
        setUser(response.data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (formData) => {
    try {
      const response = await axios.post("http://localhost:5000/login", formData, { withCredentials: true });
      if (user === null) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:5000/logout", {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };


  const [classes, setClasses] = useState([]);
  const getClasses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/get_classes", {
        withCredentials: true,
      });
      setClasses(res.data);
      setUser((prev) => ({
        ...prev,
        classes:res.data,
      }));
      console.log(user)
    } catch (err) {
      console.error(err);
    }
  };



  return (
    <AuthContext.Provider value={{ user, loading, login, logout,getClasses, classes}}>
      {children}
    </AuthContext.Provider>
  );
};

