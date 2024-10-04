import { Box, Typography } from "@mui/material";
import CreatCourse from "../components/Courses/CreatCourse";

/*********************************
 * Courses: function in dashboard
 *
 * return all courses functionality
 */
function Courses() {
  return (
    <Box sx={{ ml: 5, p: 2 }}>
      <Typography
        variant="h4"
        component="h4"
        sx={{ fontWeight: "bold", mb: 2 }}
      >
        Courses Management
      </Typography>

      <CreatCourse />

      <Typography
        variant="h4"
        component="h4"
        sx={{ fontWeight: "bold", mb: 2 }}
      >
        All Courses:
      </Typography>

      <h1>Course Management</h1>
      <p>
        View Courses:List of all the courses the teacher has created. Each
        course should show the title, a brief description, and options to manage
        (edit/delete) the course.{" "}
      </p>

      <p>
        Add New Course:A prominent button to create a new course, allowing the
        teacher to input course details (title, description, files).
      </p>
    </Box>
  );
}

export default Courses;
