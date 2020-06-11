const sellModel = require("../models/sellrequest.model");

class BuyRequestService {
  static async create(record = []) {
    const result = sellModel.insertMany(record);
    // const result =  sell.save();
    return result;
  }

  static async getAll() {
    const record = sellModel.find();
    return record;
  }

  static async filter(term) {
    const anyItem = new RegExp("^" + term + "$", "i");
    const record = sellModel
      .find()
      .or([
        { product: anyItem },
        { storage: anyItem },
        { condition: anyItem },
        { price: anyItem },
      ])
      .sort({ price: "asc", storage: -1 });
    return record;
  }
}

module.exports = BuyRequestService;
