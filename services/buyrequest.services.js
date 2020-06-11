const buyModel = require("../models/buyrequest.model");

class BuyRequestService {
  static async create(record = []) {
    let uniqueRecord = record.filter(async (data) => {
      try {
        const hasValue = await buyModel.exists(data);

        return !hasValue;
      } catch (error) {
        console.log(error);
        return false;
      }
    });
    uniqueRecord = await Promise.all(uniqueRecord);
    const result = buyModel.insertMany(uniqueRecord);
    // const result =  buy.save();
    return result;
  }

  static getAll() {
    const record = buyModel.find();
    return record;
  }

  static filter(term = "", min = 1, max = 10000) {
    const termArr = term.split(",");
    const anyItem = termArr.map((item) => new RegExp(item, "i"));
    const record = buyModel
      .find()
      .where("price")
      .gte(min)
      .lte(max)
      .or([
        { product: { $in: anyItem } },
        { storage: { $in: anyItem } },
        { condition: { $in: anyItem } },
      ])
      .sort({ price: "asc", storage: -1 });
    return record;
  }
  static buy() {
    return buyModel;
  }
}

module.exports = BuyRequestService;
