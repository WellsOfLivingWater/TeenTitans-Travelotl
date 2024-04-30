import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';

import { updateStep, updateTransitionDirection } from '../../reducers/tripReducer';
import { updateItinerary, updateLoading } from '../../reducers/itineraryReducer';

import Pages from './Pages';

export default function Navigation() {
  const { step, transitionDirection } = useSelector((state) => state.trip);
  const { destination, startDate, endDate, activities, budget, travelers, groupDescription } = useSelector((state) => state.trip);
  const formData = { destination, startDate, endDate, activities, budget, travelers, groupDescription };
  const loading = useSelector((state) => state.itinerary.loading);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBack = () => {
    if (transitionDirection === 'left') dispatch(updateTransitionDirection('right'));
    dispatch(updateStep(step - 1));
  };

  const handleNext = async () => {
    if (transitionDirection === 'right') dispatch(updateTransitionDirection('left'));
    dispatch(updateStep(step + 1));
  };

  /**
   * Handles the click event and sends the form data to the back end server.
   * Navigates to the itinerary page if the response is successful.
   * 
   * @async
   * @param {Event} e - The event object.
   */
  const submitForm = async () => {
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
      console.log('build tripId ===>', parsedData._id);
      
      const parsedTrip = JSON.parse(parsedData.trip);
      
      const payload = {
        destination: parsedData.destination,
        itinerary: parsedTrip.itinerary,
        itineraryID: parsedData._id,
      };

      if (response.ok) {
        dispatch(updateItinerary(payload));
        navigate('/itinerary');
      } else {
        throw new Error('failed to retrieve data');
      }
    } catch (error) {
      console.error('Error with request:', error);
    }
  }

  useEffect(() => {
    if (step === 5) submitForm();
  }, [step]);

  return (
    <div style={{ width: '67%', display: 'flex', justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
      <Button disabled={step === 0} onClick={handleBack} hidden={loading}>
        Back
      </Button>
      <div style={{ width: '100%', display: 'flex' }}>
        <Pages />
      </div>
      <Button variant="contained" onClick={handleNext} hidden={loading}>
        {step === 4 ? 'Finish' : 'Next'}
      </Button>
    </div>
  )
};