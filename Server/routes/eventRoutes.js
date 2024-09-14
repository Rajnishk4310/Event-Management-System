const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Create a new event
router.post('/events', eventController.createEvent);

// Get all events
router.get('/events', eventController.getAllEvents);

// Get a specific event by ID
router.get('/events/:id', eventController.getEventById);

// Update an event by ID
router.put('/events/:id', eventController.updateEvent);

// Delete an event by ID
router.delete('/events/:id', eventController.deleteEvent);

// RSVP to an event
router.post('/events/:id/rsvp', eventController.rsvpEvent);

// Get all attendees for a specific event
router.get('/events/:id/attendees', eventController.getEventAttendees);

module.exports = router;
