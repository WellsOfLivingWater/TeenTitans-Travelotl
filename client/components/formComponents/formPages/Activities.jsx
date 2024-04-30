/**
 * @file Renders the third page of the form.
 * Allows the user to select activities they are interested in.
 * 
 * @module Activities
 * @returns {JSX.Element} The rendered third page of the form.
 */
// Package dependencies
import { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Redux actions
import { updateActivities, updateStep, updateTransitionDirection } from '../../../reducers/tripReducer';

const Activities = forwardRef((props, ref) => {
  const { activities, step, transitionDirection } = useSelector(state => state.trip);

  const selected = new Array(...activities);
  
  const dispatch = useDispatch();

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
      if (transitionDirection === 'right') dispatch(updateTransitionDirection('left'));
      dispatch(updateStep(step + 1));
    }
  };

  return (
    <div ref={ref} /* className="bg-gray-300 rounded border-4 border-black" */>
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
    </div>
  );
});

export default Activities;