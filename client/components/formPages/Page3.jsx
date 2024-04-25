/**
 * @file Renders the third page of the form.
 * Allows the user to select activities they are interested in
 * and navigate to the previous and next pages.
 * 
 * @module Page3
 * @returns {JSX.Element} The rendered third page of the form.
 */
// Package dependencies
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

// Redux actions
import { updateActivities } from '../../reducers/tripReducer';

const Page3 = () => {
  const { activities } = useSelector(state => state.trip);

  const selected = new Array(...activities);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Handles the change event of the activities checkboxes.
   * Updates the selected activities and dispatches an action to update the state.
   * 
   * @param {Event} e - The event object.
   */
  const handleActivitiesChange = e => {
    const { value, checked } = e.target;
    if (checked) {
      selected.push(value);
    } else {
      const index = selected.indexOf(value);
      selected.splice(index, 1);
    }
    dispatch(updateActivities(selected));
  }

  /**
   * Handles the keydown event.
   * If the Enter key is pressed, prevents the default behavior and navigates to the next page.
   * 
   * @param {Event} e - The event object.
   */
  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      navigate('/form/page4');
    }
  };

  return (
    <div className="bg-gray-300 rounded border-4 border-black ">
      <p className='text-2xl text-center'>Select activities you are interested in...</p>

      {/* Activities checkboxes */}
      <ul className="activities">
        <li className='activity-card'>
          <label>
            <input
              type="checkbox"
              value="Hiking"
              onChange={handleActivitiesChange}
              checked={activities.includes('Hiking')}
              onKeyDown={handleKeyDown}
            />
            Hiking
          </label>
        </li>
        <li className='activity-card'>
          <label>
            <input
              type="checkbox"
              value="local events"
              onChange={handleActivitiesChange}
              checked={activities.includes('local events')}
              onKeyDown={handleKeyDown}
            />
            Local Events
          </label>
        </li>
        <li className='activity-card'>
          <label>
            <input
              type="checkbox"
              value="restaurants"
              onChange={handleActivitiesChange}
              checked={activities.includes('restaurants')}
              onKeyDown={handleKeyDown}
            />
            Restaurants
          </label>
        </li>
        <li className='activity-card'>
          <label>
            <input
              type="checkbox"
              value="danger"
              onChange={handleActivitiesChange}
              checked={activities.includes('danger')}
              onKeyDown={handleKeyDown}
            />
            Danger
          </label>
        </li>
        <li className='activity-card'>
          <label>
            <input
              type="checkbox"
              value="safety"
              onChange={handleActivitiesChange}
              checked={activities.includes('safety')}
              onKeyDown={handleKeyDown}
            />
            Safety
          </label>
        </li>
        <li className='activity-card'>
          <label>
            <input
              type="checkbox"
              value="museums"
              onChange={handleActivitiesChange}
              checked={activities.includes('museums')}
              onKeyDown={handleKeyDown}
            />
            Museums
          </label>
        </li>
      </ul>

      {/* Navigation buttons */}
      <div>

        {/* Back button */}
        <Link to='/form/page2'>
          <button className='m-4 underline text-blue-600' type='button'>Back</button>
        </Link>

        {/* Next button */}
        <Link to='/form/page4'>
          <button className='m-4 underline text-blue-600' type='button'>Next</button>
        </Link>
      </div>
    </div>
  );
};

export default Page3;