import { createSlice } from '@reduxjs/toolkit';

let startDate = new Date(Date.now());
let endDate = new Date(Date.now());
endDate.setDate(startDate.getDate() + 3);

const initialState = {
  destination: 'Las Vegas, NV',
  startDate: startDate.toISOString().slice(0, 10),
  endDate: endDate.toISOString().slice(0, 10),
  activities: [],
  budget: 500,
  travelers: 1,
  groupDescription: 'Solo traveler',
  step: 0,
  transitionDirection: 'left',
};

const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    updateDestination(state, action) {
      state.destination = action.payload;
    },
    updateStartDate(state, action) {
      state.startDate = action.payload;
    },
    updateEndDate(state, action) {
      state.endDate = action.payload;
    },
    updateActivities(state, action) {
      state.activities = action.payload;
    },
    updateBudget(state, action) {
      state.budget = action.payload;
    },
    updateTravelers(state, action) {
      state.travelers = action.payload;
    },
    updateGroupDescription(state, action) {
      state.groupDescription = action.payload;
    },
    updateStep(state, action) {
      state.step = action.payload;
    },
    updateTransitionDirection(state, action) {
      state.transitionDirection = action.payload;
    },
    resetTrip: () => initialState,
  },
});

export const { actions, reducer } = tripSlice;
export const { updateDestination, updateStartDate, updateEndDate, updateActivities, updateBudget, updateTravelers, updateGroupDescription, updateStep, updateTransitionDirection, resetTrip } = actions;
export default reducer;