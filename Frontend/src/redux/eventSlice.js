import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to fetch all events
export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/api/events');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to fetch a single event by ID
export const fetchEventById = createAsyncThunk(
  'events/fetchEventById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/events/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    event: null,
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling fetchEvents actions
      .addCase(fetchEvents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Handling fetchEventById actions
      .addCase(fetchEventById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.event = action.payload;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export default eventsSlice.reducer;
