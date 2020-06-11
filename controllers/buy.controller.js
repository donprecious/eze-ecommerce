const BuyRequestService = require("../services/buyrequest.services");
const paginate = require("express-paginate");
class BuyController {
  constructor() {}

  async create(req, res, next) {
    try {
      const record = req.body;
      const data = {
        product: record.product,
        storage: record.storage,
        new: record.new,
        a1: record.a1,
        a2: record.a2,
        b1: record.b1,
        b2: record.b2,
        c: record.c,
        cb: record.cd,
        cd: record.cd,
      };

      const result = await BuyRequestService.create(data);

      res.status(201).json({
        message: "buy request create successfully!",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async get(req, res, next) {
    try {
      let record = [];
      let itemCount = 0;
      const term = req.query.search ? req.query.search : "";
      const min = req.query.min ? parseFloat(req.query.min) : 1;
      const max = req.query.max ? parseFloat(req.query.max) : 99999999;

      if (term || min || max) {
        record = await BuyRequestService.filter(term, min, max)
          .limit(req.query.limit)
          .skip(req.skip)
          .lean();
        itemCount = await BuyRequestService.filter(term, min, max).count();
        console.log("record", record);
      } else {
        record = await BuyRequestService.getAll()
          .limit(req.query.limit)
          .skip(req.skip)
          .lean();
        itemCount = await BuyRequestService.buy().count();
      }

      const pageCount = Math.ceil(itemCount / req.query.limit);
      const hasNext = paginate.hasNextPages(req)(pageCount);
      res.status(200).json({
        message: "success",
        data: {
          record: record,
          pageCount: pageCount,
          hasNext: hasNext,
          itemCount: itemCount,
          currentPage: req.query.page,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BuyController;
