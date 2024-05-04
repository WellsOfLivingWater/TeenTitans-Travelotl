/**
 * @file Renders the first page of the form.
 * Allows the user to input their destination.
 *
 * @module Destination
 * @returns {JSX.Element} The rendered first page of the form.
 */
// Package dependencies
import { forwardRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
// Redux actions
import {
  updateDestination,
  updateStep,
  updateTransitionDirection,
} from '../../../components/formComponents/tripReducer';

const Destination = forwardRef((props, ref) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const { destination, step, transitionDirection } = useSelector(
    (state) => state.trip
  );

  const dispatch = useDispatch();

  /**
   * Updates the destination value in the Redux store when the input changes.
   *
   * @param {Event} e - The input change event object.
   */
  const handleInputChange = async (e) => {
    const { value } = e.target; // Accessing the value of the input field
    setInputValue(value);
    // dispatch(updateDestination(value));
    const response = await fetch(`/api/google-api/autocomplete/${value}`);

    if (!response.ok) {
      throw new Error('error in emotion fetch');
    }
    const options = await response.json();
    console.log('list -> ', options);
    setFilteredOptions(options);
    console.log(filteredOptions.length);
  };

  const handleOptionClick = (option) => {
    setInputValue(option);
    dispatch(updateDestination(option.description));
    setFilteredOptions([]);
  };
  /**
   * Handles the keydown event and navigates to the next page if the Enter key is pressed.
   *
   * @param {Event} e - The event object.
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (transitionDirection === 'right')
        dispatch(updateTransitionDirection('left'));
      dispatch(updateStep(step + 1));
    }
  };

  return (
    // <div className="bg-gray-300 rounded border-4 border-black">
    <label ref={ref} className='text-2xl'>
      Destination:
      <div>
        <InputGroup size='lg' className='mb-3'>
          <Form.Control
            aria-label='Example text with button addon'
            aria-describedby='basic-addon1'
            type='text'
            value={inputValue?.description}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder='Type here...'
          />
        </InputGroup>
        {/* <input
          type='text'
          value={inputValue.description}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder='Type here...'
        /> */}
        {filteredOptions.length > 0 && (
          <ul className='dropdown-list'>
            {filteredOptions.map((option, index) => (
              <li key={index} onClick={() => handleOptionClick(option)}>
                {option.description}
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* <input
        className='typed-input'
        type='text'
        name='destination'
        value={destination}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      /> */}
    </label>
    // </div>
  );
});

export default Destination;
