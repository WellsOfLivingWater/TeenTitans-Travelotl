// Package dependencies
import { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { Slide } from '@mui/material';

// Components
import Destination from './formPages/Destination';
import Dates from './formPages/Dates';
import Activities from './formPages/Activities';
import Budget from './formPages/Budget';
import Group from './formPages/Group';



const Pages = forwardRef((props, ref) => {
  const { step, transitionDirection } = useSelector((state) => state.trip);

  let page;
  switch (step) {
    case 0:
      page = <Destination ref={ref} />; break;
    case 1:
      page = <Dates ref={ref} />; break;
    case 2:
      page = <Activities ref={ref} />; break;
    case 3:
      page = <Budget ref={ref} />; break;
    case 4:
    case 5:
      page = <Group ref={ref} />; break;
    default:
      page = <Destination ref={ref} />;
  }

  return (
    <div className="rounded border-4 border-black trip-bg-img trip-bg-dims">
      <Slide direction={transitionDirection} in={true} mountOnEnter unmountOnExit>
        {page}
      </Slide>
    </div>
  );
});

export default Pages;