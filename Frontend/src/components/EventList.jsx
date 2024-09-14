import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../redux/eventSlice";
import { Link, useNavigate } from "react-router-dom";

const EventList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { events, status, error } = useSelector((state) => state.events);
  
  // Assuming user authentication is tracked in the state
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEvents());
    }
  }, [dispatch, status]);

  const handleCreateEvent = () => {
    if (isAuthenticated) {
      navigate("/create-event");
    } else {
      navigate("/login");  // Redirect to login page if not authenticated
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">No events available</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Event List</h1>
        
        {/* Button to create event, conditional redirect based on login */}
        <button 
          onClick={handleCreateEvent}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Create Event
        </button>
      </div>

      <ul className="space-y-4">
        {events.map((event) => (
          <li key={event._id} className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
            <Link
              to={`/events/${event._id}`}
              className="text-lg font-semibold text-blue-500 hover:underline"
            >
              {event.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
