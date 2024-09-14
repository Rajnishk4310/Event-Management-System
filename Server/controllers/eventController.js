const Event = require('../models/Event');
const User = require('../models/User');

// Create a new event
exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, location } = req.body;
    const event = new Event({ title, description, date, location });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: 'Error creating event' });
  }
};

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('attendees');
    res.json(events);  // Ensure this is an array
  } catch (error) {
    res.status(500).json({ error: 'Error fetching events' });
  }
};


// Get a specific event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('attendees');
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching event' });
  }
};

// Update an event
exports.updateEvent = async (req, res) => {
  try {
    const { title, description, date, location } = req.body;
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { title, description, date, location },
      { new: true }
    );
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Error updating event' });
  }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting event' });
  }
};

// RSVP to an event
exports.rsvpEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const { userId, name, email } = req.body;

    const event = await Event.findById(eventId);
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (userId) {
      // Handle logged-in user RSVP
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      event.attendees.push(user._id);
      user.registeredEvents.push(event._id);

      await user.save();
    } else if (name && email) {
      // Handle guest RSVP
      event.guests.push({ name, email });
    } else {
      return res.status(400).json({ error: 'Guest information required' });
    }

    await event.save();

    res.status(200).json({ message: 'RSVP successful' });
  } catch (error) {
    res.status(500).json({ error: 'Error RSVPing to event' });
  }
};


// Get all attendees for a specific event
exports.getEventAttendees = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('attendees');
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event.attendees);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching attendees' });
  }
};
