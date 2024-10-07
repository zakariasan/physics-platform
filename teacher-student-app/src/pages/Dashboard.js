import React, { useContext } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Greetings from "../components/dashboard/Greetings";
import Courses from "../pages/Courses";
import { Box } from "@mui/material";
import { AuthContext } from "../components/context/AuthContext.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Quizzes from "../pages/Quizzes";

/*************************************
 * Dashboard: function view dashboard
 *
 *
 * return : Data of user (Teacher)
 */

function Dashboard() {
  const { user } = useContext(AuthContext);
console.log(user)
  //if (!user) {
  //  return <Navigate to="/login" />;
  // }

  return (
    <Box sx={{ display: "flex", bgcolor: "primary", height: "100vh", p: 10 }}>
      <Sidebar elevation={30} />
      <Box sx={{flexGrow:1, p:3}}>
      <Greetings />
      <Routes>
        <Route path="/" element={<Greetings />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/progression" element={<Quizzes />} />
        <Route path="/settings" element={<Quizzes />} />
      </Routes>
      </Box>
      {/* <Prog /> */}
    </Box>
  );
}

export default Dashboard;
