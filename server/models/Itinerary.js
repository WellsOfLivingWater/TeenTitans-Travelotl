const mongoose = require('mongoose');

const ItinerarySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  tripName: { type: String, required: true },
  destination: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  // email: { type: String, required: true },
  trip: { type: String, required: true },
  editors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  readers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
},{
  timestamps: true
});

module.exports = mongoose.model('itinerary', ItinerarySchema);