const SpreadSheet = require("../services/spreadsheet.services");
const buyService = require("../services/buyrequest.services");
const sellService = require("../services/sellrequest.services");
const Responses = require("../shared/responses");

// const sheetValues = require("../sheetRecord");
class SpreadSheetController {
  async get(req, res, next) {
    try {
      const data = await SpreadSheet.fetchExcelSheet();
      const buyRecord = [];
      const sellRecord = [];
      for (const i of data.buyrequest) {
        for (const record of i.record) {
          const newRec = {
            product: i.title,
            storage: record[1],
            price: record[2],
            condition: "new",
            status: "unlocked",
          };
          const a1Rec = {
            product: i.title,
            storage: record[1],
            price: record[3],
            condition: "a1",
            status: "unlocked",
          };
          const a2Rec = {
            product: i.title,
            storage: record[1],
            price: record[4],
            condition: "a2",
            status: "unlocked",
          };
          const b1Rec = {
            product: i.title,
            storage: record[1],
            price: record[5],
            condition: "b1",
            status: "unlocked",
          };
          const b2Rec = {
            product: i.title,
            storage: record[1],
            price: record[6],
            condition: "b2",
            status: "unlocked",
          };
          const cRec = {
            product: i.title,
            storage: record[1],
            price: record[7],
            condition: "c",
            status: "unlocked",
          };
          const cbRec = {
            product: i.title,
            storage: record[1],
            price: record[8],
            condition: "c/b",
            status: "unlocked",
          };
          const cdRec = {
            product: i.title,
            storage: record[1],
            price: record[9],
            condition: "c/d",
            status: "unlocked",
          };
          buyRecord.push(
            newRec,
            a1Rec,
            a2Rec,
            b1Rec,
            b2Rec,
            cRec,
            cbRec,
            cdRec
          );
        }
      }

      for (const i of data.sellrequest) {
        for (const record of i.record) {
          const newRec = {
            product: i.title,
            storage: record[1],
            price: record[2],
            condition: "new",
            status: "unlocked",
          };
          const a1Rec = {
            product: i.title,
            storage: record[1],
            price: record[3],
            condition: "a1",
            status: "unlocked",
          };
          const a2Rec = {
            product: i.title,
            storage: record[1],
            price: record[4],
            condition: "a2",
            status: "unlocked",
          };
          const b1Rec = {
            product: i.title,
            storage: record[1],
            price: record[5],
            condition: "b1",
            status: "unlocked",
          };
          const b2Rec = {
            product: i.title,
            storage: record[1],
            price: record[6],
            condition: "b2",
            status: "unlocked",
          };
          const cRec = {
            product: i.title,
            storage: record[1],
            price: record[7],
            condition: "c",
            status: "unlocked",
          };
          const cbRec = {
            product: i.title,
            storage: record[1],
            price: record[8],
            condition: "c/b",
            status: "unlocked",
          };

          sellRecord.push(newRec, a1Rec, a2Rec, b1Rec, b2Rec, cRec, cbRec);
        }
      }
      const savedbuyRecord = await buyService.create(buyRecord);
      const savedsellRecord = await sellService.create(sellRecord);

      const obj = { savedbuyRecord, savedsellRecord };
      res.status(201).json(Responses.successResponse(obj));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SpreadSheetController;
