import {
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { AuthContext } from "../context/AuthContext";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import axios from "axios";
import React, { useContext, useState } from "react";
/******************
 * CreateCourse: function to create a course.
 *
 */

function CreatCourse() {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    unite_name: "",
    title: "",
    className: "",
    lesson_file: null,
    pedagogical_file: null,
    exercise_file: null,
  });

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevD) => ({
      ...prevD,
      [name]: value,
    }));
  };
  // Handles class selection
  const handleClassChange = (e) => {
    setFormData((prevD) => ({
      ...prevD,
      className: e.target.value, // className now holds the selected class ID
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevD) => ({
      ...prevD,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
  /* Check the FormData content before sending
  console.log("FormData content before sending:");
  for (let [key, value] of data.entries()) {
    console.log(key, value);
  }*/
    try {
      const res = await axios.post("http://localhost:5000/creat_course", data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      console.log(res.data);
    } catch (error) {
      console.error("Create course failed", error);
    }
    handleClose();
  };
  return (
    <Button
      variant="outlined"
      sx={{
        border: "2px dashed",
        width: "100%",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
      }}
      onClick={handleClickOpen}
    >
      <AddCircleOutlinedIcon />

      <Typography variant="h6" component="h6">
        Creat a Course
      </Typography>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle> Create Your Course </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="unite_name"
            name="unite_name"
            label="Unite Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="title of the lesson"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
          />
          <InputLabel id="className">Class Name</InputLabel>

          <Select
            id="class_Name"
            label="Class Name"
            focused
            value={formData.className}
            required
            variant="standard"
            fullWidth
            onChange={handleClassChange}
          >
            {user?.classes?.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
          <TextField
            focused
            required
            margin="dense"
            id="lesson_file"
            name="lesson_file"
            label="lesson file"
            type="file"
            variant="standard"
            InputLabelProps={{ shrink: true }}
            onChange={handleFileChange}
          />

          <TextField
            focused
            required
            margin="dense"
            id="pedagogical_file"
            name="pedagogical_file"
            label="pedagogique file"
            type="file"
            variant="standard"
            InputLabelProps={{ shrink: true }}
            onChange={handleFileChange}
          />

          <TextField
            focused
            required
            margin="dense"
            id="exercise_file"
            name="exercise_file"
            label="Exercise file"
            type="file"
            variant="standard"
            InputLabelProps={{ shrink: true }}
            onChange={handleFileChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </Button>
  );
}

export default CreatCourse;
