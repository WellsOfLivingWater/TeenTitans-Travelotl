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

  // console.log('this is the itinerary object in google ->>>', itern.itinerary);
  for (const date in itern.itinerary) {
    // console.log(`DATE --->>>> ${date}`);
    for (const dayTime in itern.itinerary[date]) {
      // console.log(`Time Of The Day --->>>> ${dayTime}`);
      const act =
        itern.itinerary[date][dayTime].activity +
        // ' ' +
        // itern.itinerary[date][dayTime].address +
        ' ' +
        res.locals.destination;
      // console.log('sending this to google to get PLACE ID ->', act);
      const actDetails = await getPlaceInfo(act);
      const photoInfo = actDetails.photos;
      // console.log('photo name', actDetails.photos[0].name);
      const photoUri = photoUriBuilder(photoInfo);
      itern.itinerary[date][dayTime].details = actDetails;
      itern.itinerary[date][dayTime].photo = photoUri;
      itern.itinerary[date][dayTime].placeId = actDetails.id;
    }
  }
  res.locals.detailedTtinerary = itern;
  return next();
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
  if (response.ok || data != '') {
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
//lh3.googleusercontent.com/places/ANXAkqE63k0Z7VuST-ujt26bkJEgDPodYThKiCf6va-6tJ_1GJ-Ckxa836pzWlTJ7ARYkur8tamcZamVxL9BZO4heoVsbRrG-eJLkBA=s4800-w1058-h718

https: function photoUriBuilder(photoObj) {
  let photoList = [];

  //get photos that are vertical only
  photoObj.forEach((photo) => {
    if (photo.heightPx > photo.widthPx) {
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
