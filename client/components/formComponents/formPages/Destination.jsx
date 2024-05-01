/**
 * @file Renders the first page of the form.
 * Allows the user to input their destination.
 * 
 * @module Destination
 * @returns {JSX.Element} The rendered first page of the form.
 */
// Package dependencies
import { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Redux actions
import { updateDestination, updateStep, updateTransitionDirection } from '../../../reducers/tripReducer';

const Destination = forwardRef((props, ref) => {
  const { destination, step, transitionDirection } = useSelector(state => state.trip);
  
  const dispatch = useDispatch();

  /**
   * Updates the destination value in the Redux store when the input changes.
   * 
   * @param {Event} e - The input change event object.
   */
  const handleInputChange = e => {
    const { value } = e.target; // Accessing the value of the input field
    dispatch(updateDestination(value));
  }

  /**
   * Handles the keydown event and navigates to the next page if the Enter key is pressed.
   * 
   * @param {Event} e - The event object.
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
      <label ref={ref} className='text-2xl'>
        Destination:
        <input className='typed-input'
          type="text"
          name="destination"
          value={destination}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </label>
    // </div>
  )
});

export default Destination;