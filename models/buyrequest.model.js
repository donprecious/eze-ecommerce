const mongoose = require('mongoose');

const buySchema = mongoose.Schema({
  product: { type: String, requried: true },
  storage: { type: String, required: true },
  condition: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, required: true },
});

const buyRequest = 'BuyRequest';

const buyModel = mongoose.model(buyRequest, buySchema);
module.exports = buyModel; 
