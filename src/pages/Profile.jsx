import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import { Container, Grid, Typography, Button, CssBaseline } from '@mui/material';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Profile Page
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleLogout}>
              Logout
            </Button>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Profile;