# Eze Ecommerce Api

To Run the App
Install Latest Node js  
run  
//install dependences
npm install
//to run the app
node server

Api supplies endpoint for the fellowing

1. creare buy request
2. Get buy request
   1. Pagination
   2. Search by item name, storage capacity or codition
   3. Filter by min and max or price
3. Fetch Record from google sheet api

**Production Base Url : [https://eze-ecommerce.herokuapp.com/api/v1](https://eze-ecommerce.herokuapp.com/api/v1)
Development base url: [https://http://localhost:3200/api/v1](https://eze-ecommerce.herokuapp.com/api/v1)**

## **Speadsheet**

Endpoint to pull new record from excel sheet, may take long depending on the size of the record , only new record are inserted to database
Get
/api/v1/spreadsheet
Sample Response

    {
      "status": "success",
      "data": {
        "savedbuyRecord": [    {
            "_id": "5ee286202c87f95cb4aae23c",
            "product": "iPhone XS Max",
            "storage": "64GB",
            "price": 545,
            "condition": "b1",
            "status": "unlocked",
            "__v": 0
          },
          {
            "_id": "5ee286202c87f95cb4aae23d",
            "product": "iPhone XS Max",
            "storage": "64GB",
            "price": 540,
            "condition": "b2",
            "status": "unlocked",
            "__v": 0
          } .......],
        "savedsellRecord": [    {
            "_id": "5ee286202c87f95cb4aae23c",
            "product": "iPhone XS Max",
            "storage": "64GB",
            "price": 545,
            "condition": "b1",
            "status": "unlocked",
            "__v": 0
          },
          {
            "_id": "5ee286202c87f95cb4aae23d",
            "product": "iPhone XS Max",
            "storage": "64GB",
            "price": 540,
            "condition": "b2",
            "status": "unlocked",
            "__v": 0
          }, ......]
      },
      "message": ""
    }

## **Buy Request Endpoints**

Post  
Accept body of array of product to add
/api/v1/buy
body  
 -- sample body
[{
"product": "Iphone x",
"storage": "64Gb",
"price": 103,
"condition": "a1",
"status": "unlocked"
},
{
"product": "Iphone c",
"storage": "64Gb",
"price": 103,
"condition": "a1",
"status": "unlocked"
}
]

-- Response

    {
      "status": "success",
      "data": [
        {
          "_id": "5ee28ce2d155b85d706c67c1",
          "product": "Iphone x",
          "storage": "128Gb",
          "price": 105,
          "condition": "a1",
          "status": "unlocked",
          "__v": 0
        },
        {
          "_id": "5ee28ce2d155b85d706c67c2",
          "product": "Iphone c",
          "storage": "128Gb",
          "price": 104,
          "condition": "a1",
          "status": "unlocked",
          "__v": 0
        }
      ],
      "message": ""
    }

Get Buy Request
/api/v1/buy/
/api/v1/buy/?page=1&search=&min=1&max=999999
Queries
page = current page of records, default : 1
limit , items to display perpage default 10
search= search term for finding items, comma (,) seperated default is empty string
min = minium price of items to find, default : 1
max = maximum price of items to find, default : 999999

-Sample Response

    {
      "message": "success",
      "data": {
        "record": [
          {
            "_id": "5ee1349a1030c35404ccee36",
            "product": "iPhone 6 Plus",
            "storage": "16GB",
            "price": 25,
            "condition": "c/d",
            "status": "unlocked",
            "__v": 0
          },
          {
            "_id": "5ee1349a1030c35404ccee4e",
            "product": "iPhone 6",
            "storage": "16GB",
            "price": 25,
            "condition": "c/d",
            "status": "unlocked",
            "__v": 0
          } ...
        ],
        "pageCount": 28,
        "hasNext": true,
        "itemCount": 280,
        "currentPage": 1
      }
    }

## **Sell Request Endpoints**

Post  
Accept body of array of product to add
/api/v1/buy
body  
 -- sample body
[{
"product": "Iphone x",
"storage": "64Gb",
"price": 103,
"condition": "a1",
"status": "unlocked"
},
{
"product": "Iphone c",
"storage": "64Gb",
"price": 103,
"condition": "a1",
"status": "unlocked"
}
]

-- Response

    {
      "status": "success",
      "data": [
        {
          "_id": "5ee28ce2d155b85d706c67c1",
          "product": "Iphone x",
          "storage": "128Gb",
          "price": 105,
          "condition": "a1",
          "status": "unlocked",
          "__v": 0
        },
        {
          "_id": "5ee28ce2d155b85d706c67c2",
          "product": "Iphone c",
          "storage": "128Gb",
          "price": 104,
          "condition": "a1",
          "status": "unlocked",
          "__v": 0
        }
      ],
      "message": ""
    }

    Get Sell Request
    /api/v1/sell/
    /api/v1/sell/?page=1&search=&min=1&max=999999
    Queries
    page = current page of records,  default  : 1
    limit , items to display perpage default 10
    search= search term for finding items, comma (,) seperated  default is empty string
    min = minium price of items to find, default : 1
    max = maximum price of items to find, default : 999999

    -Sample Response
    {
      "message": "success",
      "data": {
        "record": [
          {
            "_id": "5ee1349a1030c35404ccee36",
            "product": "iPhone 6 Plus",
            "storage": "16GB",
            "price": 25,
            "condition": "c/d",
            "status": "unlocked",
            "__v": 0
          },
          {
            "_id": "5ee1349a1030c35404ccee4e",
            "product": "iPhone 6",
            "storage": "16GB",
            "price": 25,
            "condition": "c/d",
            "status": "unlocked",
            "__v": 0
          } ...
        ],
        "pageCount": 28,
        "hasNext": true,
        "itemCount": 280,
        "currentPage": 1
      }
    }
