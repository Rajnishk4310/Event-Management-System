import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchEventById } from "../redux/eventSlice";
import { Link } from "react-router-dom";
import { selectIsAuthenticated } from "../redux/authSlice"; // Corrected import

const EventDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { event, status, error } = useSelector((state) => state.events);
  const isAuthenticated = useSelector(selectIsAuthenticated); // Use the selector to check if the user is logged in
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [guestInfo, setGuestInfo] = useState({ name: "", email: "" });

  useEffect(() => {
    if (id) {
      dispatch(fetchEventById(id));
    }
  }, [dispatch, id]);

  const handleRSVPClick = () => {
    if (isAuthenticated) {
      // Logic to RSVP as a logged-in user
      alert("RSVP submitted as logged-in user");
    } else {
      setShowLoginModal(true);
    }
  };

  const handleGuestSubmit = () => {
    // Logic to RSVP as a guest
    alert(`RSVP submitted for guest: ${guestInfo.name} (${guestInfo.email})`);
    setShowLoginModal(false);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  if (!event) {
    return <div>No event details available</div>;
  }

  const { guests = [] } = event;

  return (
    <div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
      <p className="text-lg mb-2">{event.description}</p>
      <p className="text-sm text-gray-600 mb-2">
        <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
      </p>
      <p className="text-sm text-gray-600 mb-4">
        <strong>Location:</strong> {event.location}
      </p>

      <h2 className="text-2xl font-semibold mb-2">Registered Attendees:</h2>
      {guests.length > 0 ? (
        <ul className="list-disc list-inside pl-5">
          {guests.map((guest, index) => (
            <li key={index} className="mb-1 flex justify-between items-center">
              <span className="font-semibold">
                {guest.name} ({guest.email})
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No attendees registered yet.</p>
      )}

      {/* RSVP Button */}
      <button
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        onClick={handleRSVPClick}
      >
        Register to the Event
      </button>

      {/* Modal for Login or Guest */}
      {showLoginModal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-4">
              RSVP to {event.title}
            </h2>
            <p className="mb-4">
              You must log in or register as a guest to RSVP.
            </p>

            {/* Option to Log In */}
            <Link
              to="/login"
              className="bg-green-500 text-white px-4 py-2 rounded-md mb-4 w-full hover:bg-green-600 transition duration-300"
            >
              Log in with Account
            </Link>

            <p className="text-center font-semibold mb-4">- OR -</p>

            {/* Guest Information Form */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Name:</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={guestInfo.name}
                onChange={(e) =>
                  setGuestInfo({ ...guestInfo, name: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Email:</label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={guestInfo.email}
                onChange={(e) =>
                  setGuestInfo({ ...guestInfo, email: e.target.value })
                }
              />
            </div>

            {/* Submit Guest RSVP */}
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600 transition duration-300"
              onClick={handleGuestSubmit}
            >
              RSVP as Guest
            </button>

            <button
              className="mt-4 bg-gray-400 text-white px-4 py-2 rounded-md w-full hover:bg-gray-500 transition duration-300"
              onClick={() => setShowLoginModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
