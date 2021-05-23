import { Reducer } from "redux";
import { ApiResponse, ApiPagedResponse } from "../../types/api/apiResponses";
import { UserModel } from "../../types/roles/roles";
import { UserDetailsModel } from "../../types/users/users";
import { getErrorMessage } from "../../utils/actionErrorsUtils";
import { API_ACTIONS } from "../actions/apiActions";
import { GET_ALL_USERS_ASYNC, GET_USER_BY_ID } from "../constants/users";

export interface UsersReducerType {
  users: ApiPagedResponse<UserDetailsModel>;
  user: ApiResponse<UserModel> | undefined;
  loading: boolean;
  error?: string;
}

const teamsData: ApiPagedResponse<UserDetailsModel> = {
  currentPage: 1,
  resultsPerPage: 3,
  totalPages: 1,
  isSuccess: true,
  responseException: null,
  statusCode: 200,
  data: [],
  totalResults: 3,
};

const defaultState: UsersReducerType = {
  users: teamsData,
  user: undefined,
  loading: false,
  error: undefined,
};

export const usersReducer: Reducer<UsersReducerType> = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case `${API_ACTIONS.FETCH_START}${GET_ALL_USERS_ASYNC}`:
    case `${API_ACTIONS.FETCH_START}${GET_USER_BY_ID}`:
      return { ...state, loading: true, error: undefined };

    case `${API_ACTIONS.FETCH_FAILURE}${GET_USER_BY_ID}`:
    case `${API_ACTIONS.FETCH_FAILURE}${GET_ALL_USERS_ASYNC}`:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case `${API_ACTIONS.FETCH_SUCCESS}${GET_ALL_USERS_ASYNC}`:
      console.log("action payload", action.payload);
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: getErrorMessage(action),
      };

    case `${API_ACTIONS.FETCH_SUCCESS}${GET_USER_BY_ID}`:
      console.log("action payload", action.payload);
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: getErrorMessage(action),
      };

    default:
      return state;
  }
};
