const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  title: String,
  rating: Number,
  feature: String,
  category: String,
  image: String,
  aboutImage: String,
  description: String,
  systemRequirements: {
    minimum: [String],
    recommended: [String]
  },
  logo: String,
  price: Number,
});

module.exports = mongoose.model('games', gameSchema);
