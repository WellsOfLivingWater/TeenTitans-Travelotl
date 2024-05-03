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
import '../../../stylesheets/formPages.css';

// ACTIVITIES ICON
import hiking from '../../../assets/Activities/hiking.png';
import restaurant from '../../../assets/Activities/restaurant.png';
import danger from '../../../assets/Activities/danger.png';
import museum from '../../../assets/Activities/museum.png';
import safety from '../../../assets/Activities/safety.png';
import events from '../../../assets/Activities/events.png';



import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


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

      <div className='activity-checkboxes'>
        <ul className="activities">
          <li className='activity'>
            <label>
              <input
                type="checkbox"
                value="Hiking"
                onChange={handleActivitiesChange}
                checked={activities.includes('Hiking')}
                onKeyDown={handleKeyDown}
              />
              <img src={hiking} alt="hiking-icon" />
              <p>Hiking</p>
            </label>
          </li>
          <li className='activity'>
            <label>
              <input
                type="checkbox"
                value="local events"
                onChange={handleActivitiesChange}
                checked={activities.includes('local events')}
                onKeyDown={handleKeyDown}
              />
              <img src={events} alt="events-icon" />
              <p>Local Events</p>
            </label>
          </li>
          <li className='activity'>
            <label>
              <input
                type="checkbox"
                value="restaurants"
                onChange={handleActivitiesChange}
                checked={activities.includes('restaurants')}
                onKeyDown={handleKeyDown}
              />
              <img src={restaurant} alt="restaurant-icon" />
              <p>Restaurants</p>
            </label>
          </li>
          <li className='activity'>
            <label>
              <input
                type="checkbox"
                value="danger"
                onChange={handleActivitiesChange}
                checked={activities.includes('danger')}
                onKeyDown={handleKeyDown}
              />
              <img src={danger} alt="danger-icon" />
              <p>Danger</p>
            </label>
          </li>
          <li className='activity'>
            <label>
              <input
                type="checkbox"
                value="safety"
                onChange={handleActivitiesChange}
                checked={activities.includes('safety')}
                onKeyDown={handleKeyDown}
              />
              <img src={safety} alt="safety-icon" />
              <p>Safety</p>
            </label>
          </li>
          <li className='activity'>
            <label>
              <input
                type="checkbox"
                value="museums"
                onChange={handleActivitiesChange}
                checked={activities.includes('museums')}
                onKeyDown={handleKeyDown}
              />
              <img src={museum} alt="museum-icon" />
              <p>Museums</p>
            </label>
          </li>
        </ul>
        </div>
    </div>
  );
});

export default Activities;


// <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">

// <div className='btn-hiking'>
// <input type="checkbox" className="btn-check" id="btncheck1" autocomplete="off"/>
//    <label className="btn btn-outline-primary" for="btncheck1">
//    <img src={hiking} alt="" />
//    Hiking
//    </label>
// </div>
// <div>
//  <input type="checkbox" className="btn-check" id="btncheck2" autocomplete="off"/>
//  <label class="btn btn-outline-primary" for="btncheck2">
//    <img src={restaurant} alt="" />
//    Restaurant
//  </label>
// </div>

 
// {/* 
//  <input type="checkbox" class="btn-check" id="btncheck2" autocomplete="off"/>
//  <label class="btn btn-outline-primary" for="btncheck2">Checkbox 2</label>

//  <input type="checkbox" class="btn-check" id="btncheck3" autocomplete="off"/>
//  <label class="btn btn-outline-primary" for="btncheck3">Checkbox 3</label> */}
// </div>