/**
 * @file Renders the first page of the form.
 * Allows the user to input their destination.
 * 
 * @module Page1
 * @returns {JSX.Element} The rendered first page of the form.
 */
// Package dependencies
import { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Redux actions
import { updateDestination, updateStep, updateTransitionDirection } from '../../../reducers/tripReducer';

const Page1 = forwardRef((props, ref) => {
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
    <div ref={ref} className="bg-gray-300 rounded border-4 border-black">
      <label className='text-2xl' htmlFor="destination">
        Destination:
      </label>
      <input className='typed-input'
        type="text"
        name="destination"
        value={destination}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
});

export default Page1;