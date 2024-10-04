import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';

import { useTheme } from '@mui/material/styles';
function TopBar() {
  const theme = useTheme();
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Physics Dashboard
                </Typography>
                <IconButton color="inherit">

                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default TopBar;
