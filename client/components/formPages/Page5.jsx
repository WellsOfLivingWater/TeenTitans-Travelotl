/**
 * @file Renders the fifth page of the form.
 * Allows the user to input the number of travelers
 * and navigate to the previous and next pages.
 * 
 * @module Page5
 * @returns {JSX.Element} The rendered fifth page of the form.
 */
// Package dependencies
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// Redux actions
import { updateTravelers } from "../../reducers/tripReducer";

const Page5 = () => {
  const { travelers } = useSelector((state) => state.trip);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
   * Handles the key down event.
   * Navigates to the next page if the Enter key is pressed.
   * 
   * @param {Event} e - The key down event object.
   */
  const handleKeyDown = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      navigate("/form/page6");
    }
  };

  return (
    <div className="bg-gray-300 rounded border-4 border-black">
      <label className="text-2xl" htmlFor="travelers">
        No. of Travelers:
      </label>
      <input
        className="typed-input"
        type="number"
        name="travelers"
        value={travelers}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />

      {/* Navigation buttons */}
      <div>

        {/* Back button */}
        <Link to="/form/page4">
          <button className="m-4 underline text-blue-600" type="button">
            Back
          </button>
        </Link>

        {/* Next button */}
        <Link to="/form/page6">
          <button className="m-4 underline text-blue-600" type="button">
            Next
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Page5;