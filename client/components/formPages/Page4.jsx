/**
 * @file Renders the fourth page of the form.
 * Allows the user to input their budget and navigate to the previous and next pages.
 * 
 * @module Page4
 * @returns {JSX.Element} The rendered fourth page of the form.
 */
// Package dependencies
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

// Redux actions
import { updateBudget } from '../../reducers/tripReducer';

const Page4 = () => {
  const { budget } = useSelector(state => state.trip);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      navigate('/form/page5');
    }
  };

  return (
    <div className="bg-gray-300 rounded border-4 border-black">
      <label className='text-2xl' htmlFor="budget">
        Budget:
      </label>
      <input className='typed-input'
        type="number"
        name="budget"
        value={budget}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />

      {/* Navigation buttons */}
      <div>

        {/* Back button */}
        <Link to='/form/page3'>
          <button className='m-4 underline text-blue-600' type='button'>Back</button>
        </Link>

        {/* Next button */}
        <Link to='/form/page5'>
          <button className='m-4 underline text-blue-600' type='button'>Next</button>
        </Link>
      </div>
    </div>
  );
};

export default Page4;