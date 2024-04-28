import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  itinerary: {},
  itineraryID: '',
  loading: false,
  itineraries: [],
};

const itinerarySlice = createSlice({
  name: 'itinerary',
  initialState,
  reducers: {
    updateItinerary(state, action) {
      const { itinerary, itineraryID } = action.payload;
      state.itinerary = itinerary;
      state.itineraryID = itineraryID;
    },
    updateLoading(state, action) {
      state.loading = action.payload;
    },
    updateItineraries(state, action) {
      state.itineraries = action.payload;
    },
  },
});

export const { actions, reducer } = itinerarySlice;
export const { updateItinerary, updateLoading, updateItineraries } = actions;
export default reducer;