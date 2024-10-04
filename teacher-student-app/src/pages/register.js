import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Select,
  InputLabel,
  MenuItem,
  Card
} from "@mui/material";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "student", // or 'teacher'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/register",
        formData,
      );
      console.log(response);
      if (response.data.redirect_url) {
        // Redirect based on the URL provided by Flask
        window.location.href = response.data.redirect_url;
      }
      // Handle successful registration, e.g., redirect to login
    } catch (error) {
      console.error("Error registering:", error);
      // Handle registration failure
    }
  };

  return (
    <Container maxWidth="sm">

      <Card sx={{ p:2, mt: 10}}>
      <Typography variant="h4" component="h1" gutterBottom>
        Register
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
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        <InputLabel id="role-user">role</InputLabel>
        <Select
          labelId="user-role"
          id="role"
          value={formData.role}
          fullWidth
          margin="normal"
          label="role"
          onChange={handleChange}
        >
          <MenuItem value="Student">Student</MenuItem>
          <MenuItem value="Teacher">Teacher</MenuItem>
        </Select>

        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Register
        </Button>
      </form>
      </Card>
    </Container>
  );
};

export default Register;
