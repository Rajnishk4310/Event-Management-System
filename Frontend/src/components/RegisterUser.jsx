import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import axios from 'axios';

const RegisterUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate(); // Initialize navigate function

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/api/users', { 
        name, 
        email, 
        phoneNumber, 
        address, 
        password, 
        confirmPassword 
      });
      alert('User registered successfully');
      setName('');
      setEmail('');
      setPhoneNumber('');
      setAddress('');
      setPassword('');
      setConfirmPassword('');
      navigate('/login'); // Navigate to the login page after successful registration
    } catch (error) {
      console.error('Error registering user:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Register User</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <button
        onClick={handleRegister}
        className="bg-blue-500 text-white p-2 rounded mb-4"
      >
        Register
      </button>
      <button
        onClick={() => navigate('/login')} // Button to manually move to login page
        className="bg-gray-500 text-white p-2 rounded"
      >
        Go to Login
      </button>
    </div>
  );
};

export default RegisterUser;
