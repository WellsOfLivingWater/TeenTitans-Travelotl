import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  itinerary: {},
  loading: false,
};

const itinerarySlice = createSlice({
  name: 'itinerary',
  initialState,
  reducers: {
    updateItinerary(state, action) {
      state.itinerary = action.payload;
    },
    updateLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { actions, reducer } = itinerarySlice;
export const { updateItinerary, updateLoading } = actions;
export default reducer;