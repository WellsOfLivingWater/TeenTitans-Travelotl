/**
 * @file Renders the second page of the form.
 * Allows the user to input the start date and end date of the trip.
 * 
 * @module Page2
 * @returns {JSX.Element} The rendered second page of the form.
 */
// Package dependencies
import { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Redux actions
import { updateStartDate, updateEndDate, updateStep, updateTransitionDirection } from '../../../reducers/tripReducer';

const Page2 = forwardRef((props, ref) => {
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
      dispatch(updateStartDate(value));
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
    <div ref={ref} className="bg-gray-300 rounded border-4 border-black">
      <div>
        <label className='text-2xl' htmlFor="startDate">
          Start Date:
        </label>
        <input className='typed-input' 
          type="date"
          name="startDate"
          value={startDate}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div>
        <label className='text-2xl' htmlFor="endDate">
          End Date:
        </label>
        <input className='typed-input'
          type="date"
          name="endDate"
          value={endDate}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
});

export default Page2;