/**
 * @file Renders the second page of the form.
 * Allows the user to input the start date and end date of the trip.
 * 
 * @module Dates
 * @returns {JSX.Element} The rendered second page of the form.
 */
// Package dependencies
import { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Redux actions
import { updateStartDate, updateEndDate, updateStep, updateTransitionDirection } from '../../../components/formComponents/tripReducer';

const Dates = forwardRef((props, ref) => {
  const { startDate, endDate, step, transitionDirection } = useSelector(state => state.trip);
  
  const dispatch = useDispatch();

  /**
   * Handles the input change event for the start date and end date inputs.
   * Updates the corresponding values in the Redux store.
   * 
   * @param {Event} e - The input change event object.
   */
  const handleInputChange = e => {
    const { name, value } = e.target;
    if (name === 'startDate') {
      const originalStartDate = new Date(startDate);
      const updatedStartDate = new Date(value);
      const dateDifference = updatedStartDate - originalStartDate;
      const updatedEndDate = new Date(new Date(endDate).getTime() + dateDifference);
      const formattedEndDate = updatedEndDate.toISOString().split('T')[0];
      
      dispatch(updateStartDate(value));
      dispatch(updateEndDate(formattedEndDate));
    } else {
      dispatch(updateEndDate(value));
    }
  }

  /**
   * Handles the key down event for the start date and end date inputs.
   * Navigates to the next page if the Enter key is pressed.
   * 
   * @param {Event} e - The key down event object.
   */
  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (transitionDirection === 'right') dispatch(updateTransitionDirection('left'));
      dispatch(updateStep(step + 1));
    }
  };

  return (
    // <div className="bg-gray-300 rounded border-4 border-black">
      <div ref={ref}>
        <label className='text-2xl'>
          Start Date:
          <input className='typed-input' 
            type="date"
            name="startDate"
            value={startDate}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </label>
        <label className='text-2xl' style={{ paddingLeft: 10 }}>
          End Date:
          <input className='typed-input'
            type="date"
            name="endDate"
            value={endDate}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </label>
      </div>
    // </div>
  );
});

export default Dates;