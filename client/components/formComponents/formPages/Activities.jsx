/**
 * @file Renders the third page of the form.
 * Allows the user to select activities they are interested in.
 * 
 * @module Activities
 * @returns {JSX.Element} The rendered third page of the form.
 */
// Package dependencies
import { forwardRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Redux actions
import { updateActivities, updateStep, updateTransitionDirection } from '../../../components/formComponents/tripReducer';

const Activities = forwardRef((props, ref) => {
  const { activities, step, transitionDirection } = useSelector(state => state.trip);
  const [selected, setSelected] = useState(activities);
  const [activitiesList, setActivitiesList] = useState([]);
  const [activityCards, setActivityCards] = useState([]);
  const [allActivities, setAllActivities] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch('/activities');
        console.log('response ===>', res);
        const data = await res.json();
        console.log('data ===>', data);
        setActivitiesList(data.activities);
        setAllActivities(data.activities);
      } catch (err) {
        console.error('Error fetching activities:', err);
      }
    };
    fetchActivities();
  }, []);

  useEffect(() => {
    if (activitiesList && activitiesList.length > 0) {
      setActivityCards(activitiesList.map((activity, i) => <ActivityCard key={i} activity={activity} />));
    }
  }, [selected, activitiesList])

  /**
   * Handles the change event of the activities checkboxes.
   * Updates the selected activities and dispatches an action to update the state.
   * 
   * @param {Event} e - The event object.
   */
  const handleActivitiesChange = e => {
    const { value, checked } = e.target;
    if (checked) {
      setSelected([...selected, value]);
      dispatch(updateActivities([...selected, value]));
    } else {
      const index = selected.indexOf(value);
      setSelected(selected.toSpliced(index, 1));
      dispatch(updateActivities(selected.toSpliced(index, 1)));
    }
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

  const ActivityCard = ({ activity, key }) => {
    return (
      <div className='activities-container'> 
        <li key={key} className='activity-card'>
        <label>
          <input
            type="checkbox"
            value={activity}
            onChange={handleActivitiesChange}
            checked={activities.includes(activity)}
            onKeyDown={handleKeyDown}
          />
          <span> {activity}</span>
        </label>
      </li>
      </div>
    );
  };

  const NewActivities = () => {
    return (
      <button className='activity-btn'
        onClick={() => {
          const fetchMoreActivities = async () => {
            try {
              const res = await fetch('/activities', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ activities: allActivities }),
              });
              const data = await res.json();
              setActivitiesList(data.activities);
              setAllActivities([...allActivities, ...data.activities]);
            } catch (err) {
              console.error('Error fetching more activities:', err);
            }
          };
          fetchMoreActivities();
        }}
      >
        <p>More Activities</p>
      </button>
    );
  };

  const ResetActivities = () => {
    return (
      <button className='activity-link'
        onClick={() => {
          dispatch(updateActivities([]));
          setSelected([]);
        }}
      >
        <p>Start Over</p>
      </button>
    );
  }
        
  // const activityCards = list.map((activity) => <ActivityCard activity={activity} />);

  return (
    <div ref={ref} /* className="bg-gray-300 rounded border-4 border-black" */>
      <p className='text-2xl text-center'>Select activities you are interested in...</p>
      <ul className="activities">
        {activityCards}
      </ul>
     <div className='activity-btns'>
     <NewActivities />
      <ResetActivities />
     </div>
    </div>
  );
});

export default Activities;