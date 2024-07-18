import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { Container, TextField, Button, Typography, CircularProgress, Grid } from '@mui/material';

const Login = ({ setIsLogged }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;

  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message, token } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isSuccess && token) {
      setIsLogged(true);
    }
  }, [isSuccess, token, setIsLogged]);

  return (
    <Container maxWidth="xs">
      <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Login'}
            </Button>
          </Grid>
          {isError && (
            <Grid item xs={12}>
              <Typography color="error">{message}</Typography>
            </Grid>
          )}
          {isSuccess && (
            <Grid item xs={12}>
              <Typography color="primary">Login successful</Typography>
            </Grid>
          )}
        </Grid>
      </form>
    </Container>
  );
};

export default Login;