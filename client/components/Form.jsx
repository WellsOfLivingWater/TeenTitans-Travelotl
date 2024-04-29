/**
 * @file Renders the form for user to input parameters for the trip.
 * Outlets to child routes for each page of the form.
 * Transitions between child routes are animated using react-spring.
 * 
 * @todo Correct animation so that the previous page's components slide out to the left.
 * @todo Correct styling so that there is no moving background color and border.
 * @todo Move navigation buttons to the left and right of the form inputs.
 * 
 * @todo Perhaps add a background image using Google Images API based on the user's destination.
 * @todo Perhaps implement a Material UI stepper to show the user's progress through the form.
 * 
 * @module Form
 * @returns {JSX.Element} The rendered form component.
 */
// Package dependencies
import { useSelector } from 'react-redux';
// import { Outlet, useLocation, } from 'react-router-dom';
// import { useTransition, animated } from '@react-spring/web';

// Components
import Header from './Header';
import Stepper from './formComponents/Stepper';
import Navigation from './formComponents/Navigation';

/** 
 * Renders a component that animates the transition between child routes.
 * 
 * @returns {JSX.Element} The animated routes component.
 */
// const AnimatedRoutes = () => {
//   const location = useLocation();
//   const transitions = useTransition(location?.pathname, {
//     from: { position: 'absolute', width: '100%', opacity: 0, transform: 'translate3d(100%,0,0)' },
//     enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
//     leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
//   });

//   return transitions(style => (
//     <animated.div style={style}>
//       <Outlet />
//     </animated.div>
//   ));
// };

const Form = () => {
  const loading = useSelector((state) => state.itinerary.loading);
  return (
    <>
      <Header />
      <div>
        <h2 className='text-2xl text-center font-bold' hidden={loading}>Enter your travel details...</h2>
        <div className="form-container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Stepper />
          <Navigation />
        </div>
      </div>
      {/* <div style={{ position: 'relative' }}>
        <AnimatedRoutes />
      </div> */}
    </>
  )
};

export default Form;