import { Reducer } from "redux";
import {
  ApiResponse,
  ApiPagedResponse,
  ApiEmptyResponse,
} from "../../types/api/apiResponses";
import { TeamDetailsModel, TeamModel } from "../../types/teams/teams";
import { getErrorMessage } from "../../utils/actionErrorsUtils";
import { API_ACTIONS } from "../actions/apiActions";
import { ADD_TO_ROLE } from "../constants/role";

export interface RolesReducerType {
  response: ApiEmptyResponse;
  loading: boolean;
  error?: string;
}

const defaultReponse: ApiEmptyResponse = {
  isSuccess: true,
  responseException: undefined,
  statusCode: 200,
};
const defaultState: RolesReducerType = {
  response: defaultReponse,
  loading: false,
  error: undefined,
};

export const rolesReducer: Reducer<RolesReducerType> = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case `${API_ACTIONS.FETCH_FAILURE}${ADD_TO_ROLE}`:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case `${API_ACTIONS.FETCH_SUCCESS}${ADD_TO_ROLE}`:
      console.log("action payload", action.payload);
      return {
        ...state,
        response: action.payload,
        loading: false,
        error: getErrorMessage(action),
      };

    default:
      return state;
  }
};
