// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import eventReducer from './eventSlice';
import attendeesReducer from './attendeesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventReducer,
    attendees: attendeesReducer,
  },
});
