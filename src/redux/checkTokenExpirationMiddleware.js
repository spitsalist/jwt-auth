import jwtDecode from 'jwt-decode';
import { logout } from './../features/auth/authSlice';
const checkTokenExpirationMiddleware = (store) => (next) => (action) => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const expirationTime = decodedToken.exp;
      if (expirationTime * 1000 < Date.now()) {
        store.dispatch(logout());
      }
    }
    return next(action);
  };
  
  export default checkTokenExpirationMiddleware;