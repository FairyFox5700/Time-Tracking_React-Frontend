import { AnyAction } from "redux";
import { ValidationError } from "../types/api/apiResponses";
export const getErrorMessage = (action: AnyAction) => {
  if (action.payload?.responseException?.errorMessage) {
    return action.payload.responseEyxception.errorMessage;
  }
  let validationErrors = action.payload?.responseException?.validationErrors;
  if (validationErrors) {
    const validationArray = validationErrors.map(
      (item: ValidationError) => item.errorMessage
    );
    return validationArray?.join("\n");
  } else {
    return null;
  }
};
