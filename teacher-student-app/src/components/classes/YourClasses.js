import { Typography, Box, Button } from "@mui/material";
import React from "react";
import { FaSchoolFlag } from "react-icons/fa6";


/***************************************
 * YourClasses: Your Classes component
 * classes: list Of Classes
 *
 * return : list of btn of classes
*/
function YourClasses({ classes }) {

  return (
    <Box sx={{ ml: 5, p: 2 }}>

      <Typography
        variant="h4"
        component="h4"
        sx={{ fontWeight: "bold", mb: 2 }}
      >
        Your Classes
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", flexWrap: 'wrap' }}>
        {classes.map((item) => {
          return (
            <Button
              variant='contained'
              sx={{
                display: "flex",
                width: "10%",
                padding: "10px",
                margin: '10px',
                alignItems: "center",
                justifyContent: "space-around",
                bgcolor: 'primary.main'
              }}
            >
              <FaSchoolFlag />
              <Box>{item.name}</Box>
            </Button>
          );
        })}
      </Box>
    </Box>
  );
}

export default YourClasses;
