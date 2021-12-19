import { Reducer } from "redux";

import { ApiResponse } from "../../types/api/apiResponses";
import { UserAccountModel } from "../../types/auth/userAccount";
import { getErrorMessage } from "../../utils/actionErrorsUtils";
import { API_ACTIONS } from "../actions/apiActions";
import {
  GET_ALL_USER_ACCOUNTS,
  GET_USER_ACCOUNT_BY_ID,
} from "../constants/authUsers";

export interface UserAccountReducerType {
  users: ApiResponse<UserAccountModel> | undefined;
  user: ApiResponse<UserAccountModel> | undefined;
  loading: boolean;
  error?: string;
}

const defaultState: UserAccountReducerType = {
  users: undefined,
  user: undefined,
  loading: false,
  error: undefined,
};

export const usersAccountReducer: Reducer<UserAccountReducerType> = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case `${API_ACTIONS.FETCH_START}${GET_ALL_USER_ACCOUNTS}`:
    case `${API_ACTIONS.FETCH_START}${GET_USER_ACCOUNT_BY_ID}`:
      return { ...state, loading: true, error: undefined };

    case `${API_ACTIONS.FETCH_FAILURE}${GET_USER_ACCOUNT_BY_ID}`:
    case `${API_ACTIONS.FETCH_FAILURE}${GET_ALL_USER_ACCOUNTS}`:
      return {
        ...state,
        loading: false,
        error: getErrorMessage(action),
      };

    case `${API_ACTIONS.FETCH_SUCCESS}${GET_ALL_USER_ACCOUNTS}`:
      console.log("action payload", action.payload);
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: getErrorMessage(action),
      };

    case `${API_ACTIONS.FETCH_SUCCESS}${GET_USER_ACCOUNT_BY_ID}`:
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
