/**
 * @file Renders the sixth page of the form.
 * Allows the user to select the best description of their travel group,
 * navigate to the previous page, and submit the form to the back end server.
 * While waiting for a response from the server, a loader component is displayed.
 * 
 * @module Page6
 * @returns {JSX.Element} The rendered sixth page of the form.
 */
// Package dependencies
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

// Redux actions
import { updateGroupDescription } from '../../reducers/tripReducer';
import { updateItinerary, updateLoading } from '../../reducers/itineraryReducer';

// Components
import Loader from '../Loader';

const Page6 = () => {
  const formData = useSelector(state => state.trip);
  const { groupDescription } = formData;
  const { loading } = useSelector(state => state.itinerary);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Updates the group description value in the Redux store when the input changes.
   * 
   * @param {Event} e - The event object.
   */
  const handleDescriptionChange = e => {
    const { value, checked } = e.target;
    if (checked) {
      dispatch(updateGroupDescription(value));
    }
  };

  /**
   * Handles the click event and sends the form data to the back end server.
   * Navigates to the itinerary page if the response is successful.
   * 
   * @async
   * @param {Event} e - The event object.
   */
  const handleClick = async () => {
    dispatch(updateLoading(true));
    try {
      console.log('data sent to back end server to make API request');
      const response = await fetch('/api/trip/build', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
        },
        body: JSON.stringify(formData)
      });
      const parsedData = await response.json();
      if (response.ok) {
        dispatch(updateItinerary(parsedData.itinerary));
        navigate('/itinerary');
        dispatch(updateLoading(false));
      } else {
        throw new Error('failed to retrieve data');
      }
    } catch (error) {
      console.error('Error with request:', error);
    }
  }

  /**
   * Handles the key down event.
   * If the Enter key is pressed, calls the handleClick function.
   * @async
   * @param {Event} event - The event object.
   */ 
  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
      await handleClick();
    }
  };

  return (
    <div className="bg-gray-300 rounded border-4 border-black ">
      <div>
        { loading ?
          
          // Display the loader component if the loading state is true
          <div id='loader'>
            <Loader />
          </div> :

          // Display the form page if the loading state is false
          <>
            <p>What best describes your travel group...</p>

            {/* Radio buttons for selecting the group description */}
            <ul className="groups">
              <li>
                <label className='group-card'>
                  <input
                    type="radio"
                    name="groupDescription"
                    value="Solo traveler"
                    onChange={handleDescriptionChange}
                    checked={groupDescription === 'Solo traveler'}
                    onKeyDown={handleKeyDown}
                  />
                  Solo traveler
                </label>
              </li>
              <li>
                <label className='group-card'>
                  <input
                    type="radio"
                    name="groupDescription"
                    value="Family with young kids"
                    onChange={handleDescriptionChange}
                    checked={groupDescription === 'Family with young kids'}
                    onKeyDown={handleKeyDown}
                  />
                  Family (young kids)
                </label>
              </li>
              <li>
                <label className='group-card'>
                  <input
                    type="radio"
                    name="groupDescription"
                    value="Family of all ages"
                    onChange={handleDescriptionChange}
                    checked={groupDescription === 'Family of all ages'}
                    onKeyDown={handleKeyDown}
                  />
                  Family (all ages)
                </label>
              </li>
              <li>
                <label className='group-card'>
                  <input
                    type="radio"
                    name="groupDescription"
                    value="Family of adults"
                    onChange={handleDescriptionChange}
                    checked={groupDescription === 'Family of adults'}
                    onKeyDown={handleKeyDown}
                  />
                  Family (adults)
                </label>
              </li>
              <li>
                <label className='group-card'>
                  <input
                    type="radio"
                    name="groupDescription"
                    value="Friends"
                    onChange={handleDescriptionChange}
                    checked={groupDescription === 'Friends'}
                    onKeyDown={handleKeyDown}
                  />
                  Friends
                </label>
              </li>
            </ul>
              
            {/* Navigation buttons */}
            <div>

              {/* Back button */}
              <Link to='/form/page5'>
                <button className='m-4 underline text-blue-600' type='button'>Back</button>
              </Link>

              {/* Submit button */}
              <button className='m-4 underline text-blue-600' type='submit' onClick={handleClick}>Submit</button>
            </div>
          </>
        }
      </div>
    </div>
  );
};

export default Page6;