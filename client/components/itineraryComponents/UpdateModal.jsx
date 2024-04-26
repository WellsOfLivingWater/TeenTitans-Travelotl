import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ActivityCard from './ActivityCard';
import SuggestionCard from './SuggestionCard'

const UpdateModal = (props) => {
  // const date = new Date;
  // console.log(date, props.activity);
  const { suggestions } = props;
  // console.log("updateModal suggestions ===>", suggestions);
  const [isLoading, setLoading] = useState(false);
    

  const renderSuggestions = suggestions.map((suggestion, index) => {
    return (<SuggestionCard className='suggestion-card' key={index} suggestion={suggestion}/>)
  });

  return (
    <Modal
      {...props}
      size="lg"
      // dialogClassName="modal-1000w"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Select a new activity
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-start">
        {renderSuggestions}
        
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button onClick={props.onHide}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateModal;