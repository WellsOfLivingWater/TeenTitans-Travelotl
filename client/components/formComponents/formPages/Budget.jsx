/**
 * @file Renders the fourth page of the form.
 * Allows the user to input their budget.
 * 
 * @module Budget
 * @returns {JSX.Element} The rendered fourth page of the form.
 */
// Package dependencies
import { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Redux actions
import { updateBudget, updateStep, updateTransitionDirection } from '../../../components/formComponents/tripReducer';

const Budget = forwardRef((props, ref) => {
  const { budget, step, transitionDirection } = useSelector(state => state.trip);
  
  const dispatch = useDispatch();

  /**
   * Handles the input change event and dispatches an action to update the budget.
   * 
   * @param {Event} e - The input change event object.
   */
  const handleInputChange = e => {
    const { value } = e.target;
    dispatch(updateBudget(value));
  }

  /**
   * Handles the key down event and navigates to the next page if the Enter key is pressed.
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
      <label ref={ref} className='text-2xl'>
        Budget:
        <input className='typed-input'
          type="number"
          name="budget"
          value={budget}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </label>
    // </div>
  );
});

export default Budget;