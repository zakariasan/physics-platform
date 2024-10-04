import React, { useContext, useState } from "react";
import "../App.css";
import { TextField, Button, Container, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { AuthContext } from "../components/context/AuthContext";
import {  useNavigate } from "react-router-dom";


const Login = () => {
  const { user, login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      console.log(user, response)
      navigate('/dashboard')
      // Handle successful login, e.g., save token, redirect, etc.
      // if (response.data.redirect_url) {
      //  window.location.href = response.data.redirect_url;
      //}
    } catch (error) {
      console.error("Error logging in:", error);
      // Handle login failure
    }
  };
  return (
    <Container maxWidth="sm">
      <Card sx={{ p: 2, mt: 10 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            color="secondary"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Login
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default Login;
