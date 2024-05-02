const googleController = {};
const apikey = process.env.GOOGLE_API_KEY;

const getDetailsFields =
  'name,id,formattedAddress,location,nationalPhoneNumber,rating,googleMapsUri,websiteUri,regularOpeningHours,reviews,accessibilityOptions,photos';
// 'name,formattedAddress,location';
const getPlaceIdheaders = {
  'Content-Type': 'application/json',
  'X-Goog-Api-Key': `${apikey}`, // Replace API_KEY with your actual API key
  'X-Goog-FieldMask':
    'places.id,places.name,places.displayName,places.formattedAddress,places.priceLevel',
};

googleController.getPlaceId = async (req, res, next) => {
  // console.log('Requesting Place ID for --->', req.body);

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
    // console.log('Place ID captured --->', data.places[0].id);
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

  // console.log('this is the itinerary object in google ->>>', itern.itinerary);
  for (const date in itern.itinerary) {
    // console.log(`DATE --->>>> ${date}`);
    for (const dayTime in itern.itinerary[date]) {
      // console.log(`Time Of The Day --->>>> ${dayTime}`);
      let actvity = itern.itinerary[date][dayTime].activity;
      // console.log('the activity ->', actvity);
      let words = actvity;
      // Split the sentence into an array of words
      if (actvity !== '') {
        words = actvity.split(' ');
      }
      // Check if the sentence has more than one word
      if (words.length > 1) {
        // Remove the first word by slicing the array from index 1 onwards
        actvity = words.slice(1).join(' ');
      }
      const act =
        actvity +
        ',' +
        itern.itinerary[date][dayTime].placeName +
        ' ' +
        res.locals.destination;
      // console.log('sending this to google to get PLACE ID ->', act);
      const actDetails = await getPlaceInfo(act);
      if (actDetails != '') {
        const photoInfo = actDetails.photos;
        // console.log('photo name', actDetails.photos[0].name);
        const photoUri = photoUriBuilder(photoInfo);
        itern.itinerary[date][dayTime].details = actDetails;
        itern.itinerary[date][dayTime].photo = photoUri;
        itern.itinerary[date][dayTime].placeId = actDetails.id;
      } else {
        itern.itinerary[date][dayTime].details = '';
        itern.itinerary[date][dayTime].photo = '';
        itern.itinerary[date][dayTime].placeId = '';
      }
    }
  }
  res.locals.detailedTtinerary = itern;
  return next();
};

googleController.getSuggestionDetailsByText = async (req, res, next) => {
  const suggestions = res.locals.suggestions;

  // console.log('this is suggesstions ->', suggestions);

  for (let i = 0; i < suggestions.activities.length; i++) {
    let country = '';
    let actvity = suggestions.activities[i].activity;
    let words = actvity;
    // Split the sentence into an array of words
    if (actvity !== '') {
      words = actvity.split(' ');
    }
    // Check if the sentence has more than one word
    if (words.length > 1) {
      // Remove the first word by slicing the array from index 1 onwards
      actvity = words.slice(1).join(' ');
    }
    if (suggestions.activities[i].address.includes(',')) {
      // Split the address string using commas as delimiters
      const parts = suggestions.activities[i].address.split(',');
      // Get the last part of the address (country)
      country = parts[parts.length - 1].trim();
    }
    const textParam =
      actvity + ',' + suggestions.activities[i].placeName + ' ' + country;
    const sugDetails = await getPlaceInfo(textParam);
    if (sugDetails != '') {
      const photoInfo = sugDetails.photos;
      // console.log('photo name', actDetails.photos[0].name);
      const photoUri = photoUriBuilder(photoInfo);
      suggestions.activities[i].details = sugDetails;
      suggestions.activities[i].photo = photoUri;
    } else {
      suggestions.activities[i].details = '';
      suggestions.activities[i].photo = '';
    }
  }
  res.locals.detailedSuggestions = suggestions;
  next();
};

async function getPlaceInfo(text) {
  const textQuery = JSON.stringify({ textQuery: `${text}` });
  console.log('get the ID for this ', textQuery);
  const requestOptions = {
    method: 'POST',
    headers: getPlaceIdheaders,
    body: textQuery,
  };

  const response = await fetch(
    'https://places.googleapis.com/v1/places:searchText?languageCode=en',
    requestOptions
  );
  const data = await response.json();

  if (
    data.places &&
    data.places.length > 0 &&
    data.places[0].id !== undefined
  ) {
    // console.log('this is data coming back --> ', data);
    const { id } = data.places[0];
    // console.log(`${text} --> ${id}`);

    // getting all place details
    const placeDetailURL = `https://places.googleapis.com/v1/places/${id}?languageCode=en&fields=${getDetailsFields}&key=${apikey}`;

    const responseDetails = await fetch(placeDetailURL);
    const placeDetailResponse = await responseDetails.json();
    // console.log(placeDetailResponse);
    return placeDetailResponse;
  } else {
    console.log('No data found');
    return (placeDetailResponse = '');
  }
}

function photoUriBuilder(photoObj) {
  let photoList = [];
  if (photoObj === undefined) return '';
  //get photos that are vertical only
  photoObj.forEach((photo) => {
    if (photo.heightPx < photo.widthPx) {
      photoList.push(photo);
    }
  });
  if (photoList.length < 1) photoList = photoObj;
  // console.log(photoObj);
  let { name, widthPx, heightPx } = photoList[0];
  //make sure that the photo has paramter passed for width and height
  widthPx = widthPx > 4800 || widthPx == null ? 400 : widthPx;
  heightPx = heightPx > 4800 || heightPx == null ? 400 : heightPx;
  const photoUri = `https://places.googleapis.com/v1/${name}/media?key=${apikey}&maxHeightPx=${heightPx}&maxWidthPx=${widthPx}`;
  // console.log(photoUri);
  return photoUri;
}

module.exports = googleController;
