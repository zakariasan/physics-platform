import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/Dashboard";
import Courses from "./components/Courses/Courses";
import Quizzes from "./pages/Quizzes";
import { AuthContext, AuthProvider } from "./components/context/AuthContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: [
      "Nunito",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
  palette: {
    primary: {
      main: "#C2BFF8",
      light: "#cecbf9",
      dark: "#8785ad",
      contrastText: "#120D2A",
    },
    secondary: {
      main: "#3F3D56",
      light: "#0d091e",
      dark: "#423e56",
      contrastText: "#fff",
    },
  },
});

const ProtectedRoute = ({ element }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>; // Show loading spinner or placeholder
  return user ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard/*"
              element={<ProtectedRoute element={<Dashboard />} />}
            />
            <Route
              path="/courses"
              element={<ProtectedRoute element={<Courses />} />}
            />
            <Route
              path="/quizzes"
              element={<ProtectedRoute element={<Quizzes />} />}
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
