/**
 * @file Renders the first page of the form.
 * Allows the user to input their destination and navigate to the next page.
 * 
 * @module Page1
 * @returns {JSX.Element} The rendered first page of the form.
 */
// Package dependencies
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

// Redux actions
import { updateDestination } from '../../reducers/tripReducer';

const Page1 = () => {
  const { destination } = useSelector(state => state.trip);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      navigate('/form/page2');
    }
  };

  return (
    <div className="bg-gray-300 rounded border-4 border-black">
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

      {/* Next button to navigate to the next page */}
      <div>
        <Link to='/form/page2'>
          <button className='m-4 text-blue-600 underline' type='button'>Next</button>
        </Link>
      </div>
    </div>
  )
};

export default Page1;