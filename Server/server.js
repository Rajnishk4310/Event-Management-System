const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();

const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(cors()); 
app.use(bodyParser.json());

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', eventRoutes);
app.use('/api', userRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
