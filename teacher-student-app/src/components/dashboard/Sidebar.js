import React, { useContext } from "react";
import { Button, Drawer, List, ListItem } from "@mui/material";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import QuizRoundedIcon from "@mui/icons-material/QuizRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { LogoutRounded } from "@mui/icons-material";
import { AuthContext } from "../context/AuthContext";

import { Link } from "react-router-dom";
function Sidebar() {
  const { logout } = useContext(AuthContext);
  return (
    <Drawer
      variant="permanent"
      sx={{
        "& .MuiDrawer-paper": {
          borderRadius: "40px",
          marginLeft: "5px",
          backgroundColor: "background.paper",
          width: 90,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <List sx={{ width: "100%" }}>
        <ListItem sx={{ height: 80 }}>
          <Button
            component={Link}
            to="/dashboard"
            sx={{
              width: "100%",
              height: "100%",
              color: "primary",
              alignItems: "center",
            }}
          >
            <DashboardCustomizeRoundedIcon sx={{ fontSize: 40 }} />
          </Button>
        </ListItem>

        <ListItem sx={{ height: 80 }}>
          <Button
            component={Link}
            to="courses"
            sx={{
              width: "100%",
              height: "100%",
              color: "primary",
              alignItems: "center",
            }}
          >
            <MenuBookRoundedIcon sx={{ fontSize: 40 }} />
          </Button>
        </ListItem>

        <ListItem sx={{ height: 80 }}>
          <Button
            component={Link}
            to="quizzes"
            sx={{
              width: "100%",
              height: "100%",
              color: "primary",
              alignItems: "center",
            }}
          >
            <QuizRoundedIcon sx={{ fontSize: 40 }} />
          </Button>
        </ListItem>

        <ListItem sx={{ height: 80 }}>
          <Button
            component={Link}
            to="progression"
            sx={{
              width: "100%",
              height: "100%",
              color: "primary",
              alignItems: "center",
            }}
          >
            <PeopleAltRoundedIcon sx={{ fontSize: 40 }} />
          </Button>
        </ListItem>

        <ListItem sx={{ height: 80 }}>
          <Button
            component={Link}
            to="settings"
            sx={{
              width: "100%",
              height: "100%",
              color: "primary",
              alignItems: "center",
            }}
          >
            <SettingsRoundedIcon sx={{ fontSize: 40 }} />
          </Button>
        </ListItem>

        <ListItem sx={{ height: 80,  }}>
          <Button
            sx={{
              width: "100%",
              height: "100%",
              color: "primary",
              alignItems: "center",
            }}
            onClick={logout}
          >
            <LogoutRounded sx={{ fontSize: 40 }} />
          </Button>
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;
