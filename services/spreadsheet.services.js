
const {google} = require('googleapis');

class Spreadsheet {

  static formatRecord(values = [[]]){
    const newValues = [];
    // clean up record to remove empty array and unwanted array  
    values.forEach((item, index, arr)=> {
      // remove empty array
      if(item.length <1){
        arr.splice(index, 1);
      }
      // remote array with Buy Request
      if(item.length === 1 ){
        const requestcol = item[index];
        
        if(requestcol === 'Buy Request' || requestcol ==='Sell Requests' ){
          arr.splice(index, 1);
          return;
        } 
      }
       newValues.push(item);
    });
    let obj = [];
    // object to store each record in a format like { title: "title", record: [ [.....], [......] , .....]}
    let rec = {};
    //array to store inner records format like [ [......], [.....], [.....] ] 
    let items = [];
    newValues.forEach((item)=>{
      if(item.length === 1){
        if(items.length >0){
          rec.record = items; 
          items = []
          obj.push(rec);
          rec = {}
        }
       rec.title = item[0];
       return;
      }
      items.push(item)
    });
    // remove the first array from obj.record which are the headers  
    obj.forEach((item)=> { 
      item.record.splice(0,1);
    });
    return obj;
  }

 static async fetchExcelSheet() {
   
    const sheets = google.sheets({version: 'v4', auth: "AIzaSyAiUb0bt93bShA1DVFfUhfLIG4C5pXEMUI"});
    const buyrequest = await sheets.spreadsheets.values.get({
      spreadsheetId: '1F6BvjBRKMf6cVTzrb3O-4uORjnhHN0I6DC9jkuxQibo',
      range: 'IPHONES!A:J',
      valueRenderOption: 'UNFORMATTED_VALUE'
    });

    const sellrequest =  await sheets.spreadsheets.values.get({
      spreadsheetId: '1F6BvjBRKMf6cVTzrb3O-4uORjnhHN0I6DC9jkuxQibo',
      range: 'IPHONES!L:T',
      valueRenderOption: 'UNFORMATTED_VALUE'

    });

    const formatedbuyReq = this.formatRecord(buyrequest.data.values);
    const formatedSellReq = this.formatRecord(sellrequest.data.values);

    console.log(sellrequest.data.values);
    const processedObject = { 
      buyrequest: formatedbuyReq,
      sellrequest: formatedSellReq,
    }
    return processedObject;
    
  }



  

}

module.exports = Spreadsheet;