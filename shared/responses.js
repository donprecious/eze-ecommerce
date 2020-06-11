class Responses {
  static successResponse(data){
    const response = { 
      status: "success",
      data: data,
      message: "", 

    }; 
    return response;
  }

  static errorResponse(error){
    const response = { 
      status: "error", 
      error: error,
      message: "", 
    }; 
    return response;
  }

}
module.exports = Responses ;