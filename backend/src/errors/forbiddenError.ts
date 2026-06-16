import CustomError from "./customError.js";

class ForbiddenError extends CustomError {
  constructor(message = "Permission denied") {
    super({ message, statusCode: 403 });
  }
}
export default ForbiddenError;
