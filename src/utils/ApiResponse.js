import { v4 as uuidv4 } from "uuid"; // Import the uuidv4 function from the uuid package

class ApiResponse {
  constructor(
    statusCode,
    data,
    message = "Success",
    info,
    traceId,
    pagination,
    links
  ) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
    this.info = info; 
    this.pagination = pagination;
    this.links = links;
    this.traceId = uuidv4(); // Generate a unique traceId if not provided
  }
}

export default ApiResponse;