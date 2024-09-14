import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import EventList from './components/EventList';
import EventDetails from './components/EventDetails';
import RegisterUser from './components/RegisterUser';
import UserList from './components/UserList';
import CreateEvent from "./components/CreateEvent"
import Login from './components/Login';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/createEvent" element={<CreateEvent />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </Router>
  );
};

export default App;
