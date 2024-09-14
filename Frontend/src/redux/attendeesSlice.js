import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define initial state
const initialState = {
  attendees: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Thunk to fetch attendees for a specific event
export const fetchAttendees = createAsyncThunk(
  'attendees/fetchAttendees',
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/events/${eventId}/attendees`);
      return response.data; // Assuming the response contains an array of attendees
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to add a new attendee to an event
export const addAttendee = createAsyncThunk(
  'attendees/addAttendee',
  async ({ eventId, attendee }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/events/${eventId}/rsvp`, attendee);
      return response.data; // Assuming the response contains the updated list of attendees
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create slice
const attendeesSlice = createSlice({
  name: 'attendees',
  initialState,
  reducers: {
    clearAttendees: (state) => {
      state.attendees = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttendees.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAttendees.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.attendees = action.payload;
      })
      .addCase(fetchAttendees.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addAttendee.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addAttendee.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.attendees = action.payload; // Update attendees list
      })
      .addCase(addAttendee.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { clearAttendees } = attendeesSlice.actions;
export default attendeesSlice.reducer;
