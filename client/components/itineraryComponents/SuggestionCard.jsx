import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import image from '../../assets/placeholder-image.jpg';
import { selectNewActivity } from '../../components/itineraryComponents/suggestionsReducer';

const SuggestionCard = ({ itineraryID, suggestion }) => {
  // console.log("suggestionCard rendered:", suggestion.activity);
  const dispatch = useDispatch();
  const [buttonVariant, setVariant] = useState('primary');
  const { newActivity } = useSelector((state) => state.suggestions);
  const [colorScheme, setColorScheme] = useState('light');

  useEffect(() => {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      setColorScheme(event.matches ? "dark" : "light");
    });
  }, []);

  useEffect(() => {
    suggestion.activity === newActivity.activity
      ? setVariant('success')
      : setVariant('primary');
  });

  const selectActivity = () => {
    dispatch(selectNewActivity(suggestion));
  };
  const photoSrc = suggestion.photo != '' ? suggestion.photo : image;
  //border={isSelected ? 'primary' : ''}
  return (
    <Card style={{ width: '18rem' }} bg={colorScheme}>
      <Card.Img variant='top' src={photoSrc} />
      <Card.Body>
        <Card.Title>{suggestion.activity}</Card.Title>
        <Card.Text>{suggestion.description}</Card.Text>
      </Card.Body>
      {/* <ListGroup className="list-group-flush">
        <ListGroup.Item>{suggestion.address}</ListGroup.Item> */}
      {/* <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item> */}
      {/* </ListGroup> */}
      <Card.Body>
        {buttonVariant === 'primary' ? (
          <Button variant='primary' onClick={selectActivity}>
            Select Activity
          </Button>
        ) : (
          <Button variant='success'>Selected</Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default SuggestionCard;
