"use client"
import {Box, AppBar, Toolbar, IconButton, Typography, Button} from '@mui/material';
import Link from 'next/link';

export default function Home() {

  return(
    <Box 
      width={"100vw"} height={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      flexDirection={'column'}
      alignItems={"center"}
      sx={{backgroundImage: 'url(/bgcolor.jpg)', // Path relative to the public directory
        backgroundSize: 'cover', // Ensure the image covers the entire Box
        backgroundPosition: 'center', // Center the image 
        }}
    >
      {/* Navbar */}
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pantry Tracker System
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>

    <Box display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      flexGrow={500}
      sx={{ width: '100%', padding: '10px', textAlign: 'center' }}>

      <Box width="100%" height="40px" sx={{ marginBottom: '30px' }} 
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        padding={6}
      >
        <Typography variant="h1" component="div" sx={{ flexGrow: 1 }}>
            Pantry Tracker System
          </Typography>
      </Box>
      <Box width="100%" height="40px" sx={{ marginBottom: '20px' }} 
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        padding={12}
      >
        <Typography variant="h5" component="div" >
            Track your pantry with zero hassle
          </Typography>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}
      >
        <Link href="/pantry" passHref>
          <Button variant='contained' sx={{ margin: 3 }}>View Pantry</Button>
        </Link>


      </Box>
    </Box>
    </Box>
  );

}