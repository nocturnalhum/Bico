import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  return localStorage.getItem('authToken') ? (
    // Render Component passed in from App() <Switch>:
    children
  ) : (
    // Redirect to Login if authorization token not found:
    <Navigate to='/login' />
  );
};

export default PrivateRoute;
