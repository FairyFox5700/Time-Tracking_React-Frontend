import { API_ACTIONS } from "../../redux/actions/apiActions";
import { ADD_TO_ROLE } from "../../redux/constants/role";
import { ApiEmptyResponse } from "../api/apiResponses";

export interface AddToRoleSuccessActionType {
  type: `${API_ACTIONS.FETCH_SUCCESS}${typeof ADD_TO_ROLE}`;
  payload?: ApiEmptyResponse;
}

export interface AddToRoleFailedActionType {
  type: `${API_ACTIONS.FETCH_FAILURE}${typeof ADD_TO_ROLE}`;
}

export type ReportsActionTypes =
  | AddToRoleFailedActionType
  | AddToRoleSuccessActionType;
