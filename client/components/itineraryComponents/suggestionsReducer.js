import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  suggestions: [],
  showModal: false,
  loading: false,
  selectedTime: {},
  oldActivity: {},
  newActivity: {},
};

const suggestionsSlice = createSlice({
  name: 'suggestions',
  initialState,
  reducers: {
    updateSuggestions(state, action) {
      const { suggestions } = action.payload;
      state.suggestions = suggestions;
    },
    updateLoading(state, action) {
      state.loading = action.payload;
    },
    selectOldActivity(state, action) {
      const { suggestion, time } = action.payload;
      state.oldActivity = suggestion;
      state.selectedTime = time;
    },
    selectNewActivity(state, action) {
      state.newActivity = action.payload;
    },
    setShowModal(state, action) {
      state.showModal = action.payload;
    }
  },
});

export const { actions, reducer } = suggestionsSlice;
export const { updateLoading, updateSuggestions, selectNewActivity, selectOldActivity, setShowModal } = actions;
export default reducer;