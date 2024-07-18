import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Home from './Home';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const App = () => {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            My App
          </Typography>
          <Button color="inherit" component={NavLink} to="/">Home</Button>
          {!isLogged ? (
            <>
              <Button color="inherit" component={NavLink} to="/login">Login</Button>
              <Button color="inherit" component={NavLink} to="/register">Register</Button>
            </>
          ) : (
            <Button color="inherit" component={NavLink} to="/profile">Profile</Button>
          )}
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLogged={setIsLogged} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;