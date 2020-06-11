const mongoose = require('mongoose');

const sellSchema = mongoose.Schema({
  product: { type: String, requried: true },
  storage: { type: String, required: true },
  condition: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, required: true },

  
});
const sellRequest = "SellRequest";
const sellModel = mongoose.model(sellRequest, sellSchema);


module.exports =sellModel;
