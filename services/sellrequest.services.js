const sellModel = require("../models/sellrequest.model");

class BuyRequestService {
  static async create(record = []) {
    let uniqueRecord = [];
    for (const data of record) {
      try {
        const hasValue = await sellModel.exists(data);

        if (hasValue === true) continue;
        else {
          uniqueRecord.push(data);
        }
      } catch (error) {
        console.log(error);
        continue;
      }
    }
    uniqueRecord = await Promise.all(uniqueRecord);
    const result = sellModel.insertMany(uniqueRecord);
    return result;
  }

  static async getAll() {
    const record = sellModel.find();
    return record;
  }

  static filter(term = "", min = 1, max = 10000) {
    const termArr = term.split(",");
    const anyItem = termArr.map((item) => new RegExp(item, "i"));
    const record = sellModel
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

  static sell() {
    return sellModel;
  }
}

module.exports = BuyRequestService;
