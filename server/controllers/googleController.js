const googleController = {};
const apikey = process.env.GOOGLE_API_KEY;

const getDetailsFields =
  'formattedAddress,location,nationalPhoneNumber,rating,googleMapsUri,websiteUri,regularOpeningHours,reviews,accessibilityOptions,photos';
const getPlaceIdheaders = {
  'Content-Type': 'application/json',
  'X-Goog-Api-Key': `${apikey}`, // Replace API_KEY with your actual API key
  'X-Goog-FieldMask':
    'places.id,places.name,places.displayName,places.formattedAddress,places.priceLevel',
};

googleController.getPlaceId = async (req, res, next) => {
  const textQuery = JSON.stringify(req.body);
  const requestOptions = {
    method: 'POST',
    headers: getPlaceIdheaders,
    body: textQuery,
  };

  try {
    const response = await fetch(
      'https://places.googleapis.com/v1/places:searchText?languageCode=en',
      requestOptions
    );
    const data = await response.json();
    // console.log('this is coming back --->', data.places[0].id);
    res.locals.placeId = data.places[0].id;
    return next();
  } catch (err) {
    throw new Error('Error fetching Place ID: ' + err.message);
  }
};

googleController.getPlaceDetails = async (req, res, next) => {
  //   const { placeId } = req.params;
  const placeId = res.locals.placeId;
  const placeDetialURL = `https://places.googleapis.com/v1/places/${placeId}?languageCode=en&fields=${getDetailsFields}&key=${apikey}`;
  try {
    const response = await fetch(placeDetialURL);
    const placeDetailResponse = await response.json();
    console.log(placeDetailResponse);
    res.locals.details = placeDetailResponse;
    return next();
  } catch (err) {
    throw new Error('Error fetching Place Details: ' + err.message);
  }
};

googleController.getPlaceDetailsByText = async (req, res, next) => {
  const itern = res.locals.itinerary;
  // console.log('this is the internary in google ->>>', itern);
  // console.log('this is the itinerary object in google ->>>', itern.itinerary);
  for (const date in itern.itinerary) {
    // console.log(`DAY --->>>> ${date}: ${itern.itinerary[date]}`);
    for (const dayTime in itern.itinerary[date]) {
      // console.log(`day time --->>>> ${dayTime}: ${itern[date]}`);
      const act =
        itern.itinerary[date][dayTime].activity +
        ' ' +
        itern.itinerary[date][dayTime].address +
        ' ' +
        res.locals.destination;
      const actDetails = await getPlaceInfo(act);
      // console.log('----- - - - - - ------ --- - - - - -');
      // console.log(`activity  --->>>> ${itern.itinerary[date][dayTime]}`);
      // console.log('activity details --> ', actDetails);
      itern.itinerary[date][dayTime].details = actDetails;
      // console.log(
      //   `activity with details --->>>> ${itern.itinerary[date][dayTime].details.nationalPhoneNumber}`
      // );
      // console.log('----- - - - - - ------ --- - - - - -');
    }
  }
  res.locals.detailedTtinerary = itern;
  return next();
};

async function getPlaceInfo(text) {
  const textQuery = JSON.stringify({ textQuery: `${text}` });
  const requestOptions = {
    method: 'POST',
    headers: getPlaceIdheaders,
    body: textQuery,
  };

  try {
    const response = await fetch(
      'https://places.googleapis.com/v1/places:searchText?languageCode=en',
      requestOptions
    );
    const data = await response.json();
    const placeId = data.places[0].id;

    //getting all place details
    const placeDetialURL = `https://places.googleapis.com/v1/places/${placeId}?languageCode=en&fields=${getDetailsFields}&key=${apikey}`;
    const responseDetails = await fetch(placeDetialURL);
    const placeDetailResponse = await responseDetails.json();
    // console.log(placeDetailResponse);
    return placeDetailResponse;
  } catch (err) {
    throw new Error(' getPlaceInfo Error fetching Place ID: ' + err.message);
  }
}

module.exports = googleController;
