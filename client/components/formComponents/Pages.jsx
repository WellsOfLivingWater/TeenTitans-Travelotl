// Package dependencies
import { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { Slide } from '@mui/material';

// Components
import Page1 from './formPages/Page1';
import Page2 from './formPages/Page2';
import Page3 from './formPages/Page3';
import Page4 from './formPages/Page4';
import Page5 from './formPages/Page5';



const Pages = forwardRef((props, ref) => {
  const { step, transitionDirection } = useSelector((state) => state.trip);

  let page;
  switch (step) {
    case 0:
      page = <Page1 ref={ref} />; break;
    case 1:
      page = <Page2 ref={ref} />; break;
    case 2:
      page = <Page3 ref={ref} />; break;
    case 3:
      page = <Page4 ref={ref} />; break;
    case 4:
    case 5:
      page = <Page5 ref={ref} />; break;
    default:
      page = <Page1 ref={ref} />;
  }

  return (
    <Slide direction={transitionDirection} in={true} mountOnEnter unmountOnExit>
      {page}
    </Slide>
  );
});

export default Pages;