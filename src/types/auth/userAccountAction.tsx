import { API_ACTIONS } from "../../redux/actions/apiActions";
import {
  GET_ALL_USER_ACCOUNTS,
  GET_USER_ACCOUNT_BY_ID
} from "../../redux/constants/authUsers";
import { ApiResponse } from "../api/apiResponses";
import { UserAccountModel } from "./userAccount";

export interface FetchAllUserAccountsRequestActionType {
  type: `${API_ACTIONS.FETCH_START}${typeof GET_ALL_USER_ACCOUNTS}`;
}

export interface FetchAllUserAccountsSuccessActionType {
  type: `${API_ACTIONS.FETCH_SUCCESS}${typeof GET_ALL_USER_ACCOUNTS}`;
  payload?: ApiResponse<Array<UserAccountModel>>;
}

export interface FetchAllUserAccountsFailedActionType {
  type: `${API_ACTIONS.FETCH_FAILURE}${typeof GET_ALL_USER_ACCOUNTS}`;
  payload?: any;
}

export interface FetchUserAccountByIdRequestActionType {
  type: `${API_ACTIONS.FETCH_START}${typeof GET_USER_ACCOUNT_BY_ID}`;
}

export interface FetchUserAccountByIdSuccessActionType {
  type: `${API_ACTIONS.FETCH_SUCCESS}${typeof GET_USER_ACCOUNT_BY_ID}`;
  payload?: ApiResponse<UserAccountModel>;
}

export interface FetchUserAccountByIdFailedActionType {
  type: `${API_ACTIONS.FETCH_FAILURE}${typeof GET_USER_ACCOUNT_BY_ID}`;
  payload?: any;
}
