/**
 * @file Renders the fifth page of the form.
 * Allows the user to input the number of travelers
 * and select a group description.
 * 
 * @module Group
 * @returns {JSX.Element} The rendered fifth page of the form.
 */
// Package dependencies
import { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux actions
import { updateTravelers, updateGroupDescription, updateStep, updateTransitionDirection } from "../../../reducers/tripReducer";

// Components
import Loader from "../../Loader";

const Group = forwardRef((props, ref) => {
  const { travelers, groupDescription, step, transitionDirection } = useSelector(state => state.trip);
  const { loading } = useSelector(state => state.itinerary);

  const dispatch = useDispatch();

  /**
   * Handles the input change event.
   * Updates the number of travelers in the Redux store.
   * 
   * @param {Event} e - The input change event object.
   */
  const handleInputChange = e => {
    const { value } = e.target;
    dispatch(updateTravelers(value));
  };

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
   * Handles the key down event.
   * If the Enter key is pressed, calls the handleClick function.
   * @async
   * @param {Event} event - The event object.
   */ 
  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
      if (transitionDirection === 'right') dispatch(updateTransitionDirection('left'));
      dispatch(updateStep(step + 1));
    }
  };

  return (
    <div ref={ref} /* className="bg-gray-300 rounded border-4 border-black" */>
      
      { loading ?
        
        // Display the loader component if the loading state is true
        <div id='loader'>
          <Loader />
        </div> :

        // Display the form page if the loading state is false
        <>
          <p>What best describes your travel group...</p>
          <label className="text-2xl">
            No. of Travelers:
            <input
              className="typed-input"
              type="number"
              name="travelers"
              value={travelers}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
          </label>

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
        </>
      }
    </div>
  );
});

export default Group;