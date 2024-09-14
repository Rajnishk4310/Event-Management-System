
# Event Management System

## Project Overview

The Event Management System is a web application designed for managing events efficiently. It includes user authentication, event creation, and profile management. This project consists of a frontend and a backend component.

## Features

- **User Authentication**: Register, log in, and manage user profiles.
- **Event Management**: Create, view, and manage events.
- **Responsive Design**: Optimized for various devices and screen sizes.

## Technologies Used

- **Frontend**:
  - React.js
  - Tailwind CSS
  - Redux Toolkit
  - React Router DOM
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (Mongoose)
  - JWT for authentication
- **Development Tools**:
  - Axios for HTTP requests
  - Nodemon for auto-reloading during development

## Installation

### Prerequisites

Ensure you have Node.js and npm installed on your machine. You can download and install them from [Node.js](https://nodejs.org/).

### Frontend Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Rajnishk4310/Event-Management-System.git
2. **Navigate to the frontend directory**:
   ```bash
   npm install
3. **Install dependencies**:
   ```bash
   npm install
4. **Start the frontend development server**:
   ```bash
   npm start

The React application will be available at http://localhost:5000.

### Backend Setup

1. **Navigate to the backend directory**:
   ```bash
   cd ../server
2. **Install dependencies**:
   ```bash
   npm install
3. **Set up environment variables**:
  Create a .env file in the server directory with the following content :
   ```bash
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret

4. **Start the backend server**:
   ```bash
   npm start or npm run dev

The React application will be available at http://localhost:5173/.


## Usage

- **Register**: Navigate to the register page on the frontend, enter your details, and submit the form to create a new account.
- **Login**: Go to the login page, enter your credentials, and log in to access the application.
- **Create Event**: Once logged in, navigate to the "Create Event" page to add new events.
- **View Events**: Access the "Events" page to view and manage events.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or issues, please contact [rajnisharyankumar@gmail.com](mailto:your-email@example.com).

