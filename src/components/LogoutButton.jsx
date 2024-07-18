import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const LogoutButton = ({ setIsLogged }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    setIsLogged(false);
  };

  return <button onClick={handleLogout}>Log Out</button>;
};

export default LogoutButton;
