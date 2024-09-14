const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Event schema
const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    attendees: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    guests: [{ name: String, email: String }], // field for guests
  },
  { timestamps: true }
); // This will add createdAt and updatedAt fields

// Create the Event model
const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
