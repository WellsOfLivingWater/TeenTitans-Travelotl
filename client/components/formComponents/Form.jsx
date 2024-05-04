/**
 * @file Renders the form for user to input parameters for the trip.
 * Outlets to child routes for each page of the form.
 * Transitions between child routes are animated using react-spring.
 * 
 * @todo Perhaps add a background image using Google Images API based on the user's destination.
 * 
 * @module Form
 * @returns {JSX.Element} The rendered form component.
 */
// Package dependencies
import { useSelector } from 'react-redux';

// Components
import Stepper from './Stepper';
import Navigation from './Navigation';

const Form = () => {
  const loading = useSelector((state) => state.itinerary.loading);
  return (
    <>
      <div>
        <h2 className='text-center mainpage-text' hidden={loading}>Enter your travel details...</h2>
        <div className="form-container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Stepper />
          <Navigation />
        </div>
      </div>
    </>
  )
};

export default Form;