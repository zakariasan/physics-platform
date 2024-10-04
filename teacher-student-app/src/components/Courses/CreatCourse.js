import {
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { useState } from "react";
import axios from "axios";
/******************
 * CreateCourse: function to create a course.
 *
 */
function CreatCourse() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    courseName: "",
    unite: "",
    lessonFile: null,
    pedaFile: null,
    exoFile: null,
  });

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const className = e.currentTarget.classe.value;
    const data = { className };

    try {
      const res = await axios.post("http://localhost:5000/creat_class", data, {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Create class failed", error);
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
        }}
      >
        <DialogTitle> Create Your Course </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="courseName"
            name="name"
            label="Course Name"
            type="text"
            fullWidth
            variant="standard"
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="unite"
            name="unite"
            label="Unite"
            type="text"
            fullWidth
            variant="standard"
          />

          <TextField
            focused
            required
            margin="dense"
            id="lesson_file"
            name="lesson_file"
            label="lesson file"
            type="file"
            variant="standard"
          />

          <TextField
            focused
            required
            margin="dense"
            id="peda_file"
            name="peda_file"
            label="pedagogique file"
            type="file"
            variant="standard"
          />

          <TextField
            focused
            required
            margin="dense"
            id="exo_file"
            name="exo_file"
            label="Exercice file"
            type="file"
            variant="standard"
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
