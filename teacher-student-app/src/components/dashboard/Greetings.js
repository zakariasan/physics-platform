import React, { useContext, useState, useEffect } from "react";
import GreetingImg from "../../assets/GreetingImg.svg";
import {
  Button,
  Card,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import TodayDate from "./Calandar";
import YourClasses from "./YourClasses";

/***************************************
 * Greetings: function to welcome the Teacher and students
 *
 *
 *
 * return : box containe creat/get classes
 */

function Greetings() {
  const [open, setOpen] = useState(false);
  const { user, getClasses, classes } = useContext(AuthContext);

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
      getClasses();
    } catch (error) {
      console.error("Create class failed", error);
    }
    handleClose();
  };

  useEffect(() => {
    getClasses();
  }, []);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Card
          sx={{
            ml: 5,
            width: "50%",
            height: "10%",
            borderRadius: 5,
            bgcolor: "primary.main",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ p: 5 }}>
            <Typography
              variant="h3"
              component="h2"
              color="primary.contrastText"
            >
              Hello Teacher {user.username}
            </Typography>
            <Typography variant="h6" component="h2">
              A brief overview of recent activity
            </Typography>

            <Button
              sx={{ mt: 6, borderRadius: "20px", fontWeight: "bold" }}
              color="secondary"
              variant="contained"
              onClick={handleClickOpen}
            >
              <Typography variant="subtitle1">Creat a class</Typography>
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              PaperProps={{
                component: "form",
                onSubmit: (e) => handleSubmit(e),
              }}
            >
              <DialogTitle> Class Name </DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="classeName"
                  name="classe"
                  label="classe Name"
                  type="text"
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Submit</Button>
              </DialogActions>
            </Dialog>
          </Box>

          <img alt="Hello Teacher" width={300} src={GreetingImg} />
        </Card>

        <TodayDate />
      </Box>

      <YourClasses classes={classes} />
    </Box>
  );
}

export default Greetings;
