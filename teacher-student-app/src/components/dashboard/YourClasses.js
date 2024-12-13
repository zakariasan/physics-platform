import {
  Typography,
  Box,
  Paper,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";

import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

/***************************************
 * YourClasses: Your Classes component
 * classes: list Of Classes
 * get_Update_Delete_
 *
 * return : list of btn of classes
 */
function YourClasses() {
  const { getClasses, classes } = useContext(AuthContext);

  const [newClassName, setNewClassName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  const addClass = async () => {
    if (newClassName.trim()) {
      try {
        const res = await axios.post(
          "http://localhost:5000/creat_class",
          {className: newClassName.trim()},
          {
            withCredentials: true,
          },
        );
        getClasses();
        setNewClassName("");
      } catch (error) {
        console.error("Create class failed", error);
      }
    }
  };

  const startEdit = (classItem) => {
    setEditingId(classItem.id);
    setEditingName(classItem.name);
  };

  const saveEdit = async () => {
    if (editingName.trim()) {
      try {
        const res = await axios.put(
          `http://localhost:5000/update_class/${editingId}`,
          {className: editingName.trim()},
          { withCredentials: true },
        );
        setEditingId(null);
        getClasses();
      } catch (error) {
        console.error("Updating class failed", error);
      }
    }
  };

  const deleteClass = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/delete_class/${id}`,
        { withCredentials: true },
      );
      getClasses();
    } catch (error) {
      console.log("Deleting Class failed", error);
    }
  };
  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        maxWidth: 400,
        margin: "auto",
        marginTop: 4,
        padding: 2,
      }}
    >
      <Typography variant="h6" component="div" sx={{ mb: 2 }}>
        Class Management
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          marginBottom: 2,
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          label="Add new class"
          value={newClassName}
          onChange={(e) => setNewClassName(e.target.value)}
          size="small"
        />
        <IconButton
          color="primary"
          onClick={addClass}
          disabled={!newClassName.trim()}
        >
          <AddIcon />
        </IconButton>
      </Box>

      <List>
        {classes.map((classItem) => (
          <ListItem
            key={classItem.id}
            secondaryAction={
              editingId === classItem.id ? (
                <>
                  <IconButton edge="end" onClick={saveEdit} sx={{ mr: 1 }}>
                    <SaveIcon color="success" />
                  </IconButton>
                  <IconButton edge="end" onClick={() => setEditingId(null)}>
                    <CloseIcon color="error" />
                  </IconButton>
                </>
              ) : (
                <>
                  <IconButton
                    edge="end"
                    onClick={() => startEdit(classItem)}
                    sx={{ mr: 1 }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    onClick={() => deleteClass(classItem.id)}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </>
              )
            }
          >
            {editingId === classItem.id ? (
              <TextField
                fullWidth
                variant="standard"
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                autoFocus
              />
            ) : (
              <ListItemText primary={classItem.name} />
            )}
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default YourClasses;
