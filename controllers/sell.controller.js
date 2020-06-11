const sellrequestServices = require("../services/sellrequest.services");
const paginate = require("express-paginate");
const Responses = require("../shared/responses");
class BuyController {
  constructor() {}

  async create(req, res, next) {
    try {
      const record = req.body;

      const result = await sellrequestServices.create(record);

      res.status(201).json(Responses.successResponse(result));
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
        record = await sellrequestServices
          .filter(term, min, max)
          .limit(req.query.limit)
          .skip(req.skip)
          .lean();
        itemCount = await sellrequestServices.filter(term, min, max).count();
        console.log("record", record);
      } else {
        record = await sellrequestServices
          .getAll()
          .limit(req.query.limit)
          .skip(req.skip)
          .lean();
        itemCount = await sellrequestServices.sell().count();
      }

      const pageCount = Math.ceil(itemCount / req.query.limit);
      const hasNext = paginate.hasNextPages(req)(pageCount);
      res.status(200).json(
        Responses.successResponse({
          record: record,
          pageCount: pageCount,
          hasNext: hasNext,
          itemCount: itemCount,
          currentPage: req.query.page,
        })
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BuyController;
