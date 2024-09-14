const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the User schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  registeredEvents: [{
    type: Schema.Types.ObjectId,
    ref: 'Event'
  }]
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
