// Package dependencies
import { forwardRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Slide } from '@mui/material';
import { Box } from '@mui/system';

// Components
import Destination from './formPages/Destination';
import Dates from './formPages/Dates';
import Activities from './formPages/Activities';
import Budget from './formPages/Budget';
import Group from './formPages/Group';
import placeholderImg from '../../assets/placeholder-img.jpg';
import '../../stylesheets/formPages.css'
const Pages = forwardRef((props, ref) => {
  const { step, transitionDirection } = useSelector((state) => state.trip);
  const [prevStep, setPrevStep] = useState(step);
  const [exitDirection, setExitDirection] = useState(transitionDirection);

  useEffect(() => {
    if (step !== prevStep) {
      setExitDirection(transitionDirection === 'left' ? 'right' : 'left');
    }
    setPrevStep(step);
  }, [step, transitionDirection]);

  const renderPage = (pageStep, Component) => (
    <Box position="absolute" width="100%">
      <Slide 
        direction={step === pageStep ? transitionDirection : exitDirection} 
        in={step === pageStep} 
        mountOnEnter 
        unmountOnExit
        onExited={() => setExitDirection(transitionDirection === 'left' ? 'right' : 'left')}
      >
        <Component ref={ref}  />       
      </Slide>
    </Box>
  );

  return (
    <div className='pages'>
      <Box className="placeholder-destination-img" position="relative">
      <div className='form-container'>
        {renderPage(0, Destination)}
        {renderPage(1, Dates)}
        {renderPage(2, Activities)}
        {renderPage(3, Budget)}
        {renderPage(4, Group)}
        {renderPage(5, Group)}
      </div>
      <img src={placeholderImg} alt="placeholder-img" />
    </Box>
  </div>
  );
});

export default Pages;