import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, selectIsAuthenticated } from '../redux/authSlice'; // Import necessary functions from your authSlice

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/'); // Redirect to the home page after successful logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Event Management System</h1>
        <nav>
          {!isAuthenticated ? (
            <>
              <Link to="/" className="mr-4">Home</Link>
              <Link to="/events" className="mr-4">Events</Link>
              <Link to="/createEvent" className="mr-4">Create Events</Link>
              <Link to="/users" className="mr-4">Users</Link>
              <Link to="/register" className="mr-4">Register</Link>
              <Link to="/login" className="mr-4">Login</Link>
            </>
          ) : (
            <>
              <Link to="/" className="mr-4">Home</Link>
              <Link to="/events" className="mr-4">Events</Link>
              <Link to="/createEvent" className="mr-4">Create Events</Link>
              <Link to="/users" className="mr-4">Users</Link>
              <span className="mr-4">Welcome, {user?.name}</span>
              <button onClick={handleLogout} className="mr-4">Logout</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
