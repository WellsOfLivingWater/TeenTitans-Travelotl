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
import random from '../../assets/random-img.jpg'

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
        <Component ref={ref} />
      </Slide>
    </Box>
  );

  return (
    <Box className="rounded border-4 border-black trip-bg-img trip-bg-dims" position="relative">
      {renderPage(0, Destination)}
      {renderPage(1, Dates)}
      {renderPage(2, Activities)}
      {renderPage(3, Budget)}
      {renderPage(4, Group)}
      {renderPage(5, Group)}
      <img src={random} alt="" />
    </Box>
  );
});

export default Pages;