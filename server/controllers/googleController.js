const googleController = {};
const apikey = process.env.GOOGLE_API_KEY;

const fields =
  'formattedAddress,location,nationalPhoneNumber,rating,googleMapsUri,websiteUri,regularOpeningHours,reviews,accessibilityOptions,photos';

googleController.getPlaceId = async (req, res, next) => {
  const textQuery = JSON.stringify(req.body);

  const headers = {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': `${apikey}`, // Replace API_KEY with your actual API key
    'X-Goog-FieldMask':
      'places.id,places.name,places.displayName,places.formattedAddress,places.priceLevel',
  };

  const requestOptions = {
    method: 'POST',
    headers: headers,
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
  const placeDetialURL = `https://places.googleapis.com/v1/places/${placeId}?languageCode=en&fields=${fields}&key=${apikey}`;
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
module.exports = googleController;
