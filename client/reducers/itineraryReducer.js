import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const itinerarySlice = createSlice({
  name: 'itinerary',
  initialState,
  reducers: {
    updateItinerary(state, action) {
      const { itinerary, itineraryID } = action.payload;
      state.itinerary = itinerary;
      state.itineraryID = itineraryID;
    },
  },
});

export const { actions, reducer } = itinerarySlice;
export const { updateItinerary } = actions;
export default reducer;