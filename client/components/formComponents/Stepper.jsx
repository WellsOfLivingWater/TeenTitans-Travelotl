import { useSelector } from 'react-redux';
import { Stepper, Step, StepLabel } from '@mui/material';

const steps = ['Destination', 'Dates', 'Activities', 'Budget', 'Group'];

export default function FormStepper() {
  const step = useSelector((state) => state.trip.step);
  const loading = useSelector((state) => state.itinerary.loading);

  return (
    <div className='invert' style={{ width: '80%' }} hidden={loading}>
      <Stepper activeStep={step} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};