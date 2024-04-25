/**
 * @file Renders the second page of the form.
 * Allows the user to input the start date and end date of the trip
 * and navigate to the previous and next pages.
 * 
 * @module Page2
 * @returns {JSX.Element} The rendered second page of the form.
 */
// Package dependencies
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

// Redux actions
import { updateStartDate, updateEndDate } from '../../reducers/tripReducer';

const Page2 = () => {
  const { startDate, endDate } = useSelector(state => state.trip);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      navigate('/form/page3');
    }
  };

  return (
    <div className="bg-gray-300 rounded border-4 border-black">
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

      {/* Navigation buttons */}
      <div>

        {/* Back button */}
        <Link to='/form'>
          <button className='m-4 underline text-blue-600' type='button'>Back</button>
        </Link>

        {/* Next button */}
        <Link to='/form/page3'>
          <button className='m-4 underline text-blue-600' type='button'>Next</button>
        </Link>
      </div>
    </div>
  );
};

export default Page2;