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
    domaine: "",
    unite_name: "",
    description: "",
    level: "",
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
      level: e.target.value.name, // className now holds the selected class ID
      classID: e.target.value.id
    }));
  };
/*
 * handling files
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevD) => ({
      ...prevD,
      [name]: files[0],
    }));
  };
*/
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/create_course",
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
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
        Creat a new Course
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
            id="domaine"
            name="domaine"
            label="Domaine"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
          />
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
            id="description"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
          />
          <InputLabel id="className" sx={{marginTop:2}}>Class Name</InputLabel>
          <Select
            id="class_Name"
            label="level"
            value={formData.className}
            required
            variant="standard"
            fullWidth
            placeholder="pick a class"
            onChange={handleClassChange}
          >
            <MenuItem disabled value="Choose a class">
              Choose a Class
            </MenuItem>

            {user?.classes?.map((item) => (
              <MenuItem key={item.id} value={item} >
                {item.name}
              </MenuItem>
            ))}
          </Select>
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
