import { AxiosResponse } from "axios";
import { Dispatch } from "react";
import {
  FetchAllUserAccountsRequestActionType,
  FetchAllUserAccountsFailedActionType,
  FetchAllUserAccountsSuccessActionType,
  FetchUserAccountByIdFailedActionType,
  FetchUserAccountByIdRequestActionType,
  FetchUserAccountByIdSuccessActionType,
} from "../../types/auth/userAccountAction";
import client from "../../api/clients/authClinet";
import { ApiResponse } from "../../types/api/apiResponses";

import { UserModel } from "../../types/roles/roles";

import { ThunkResult } from "./issuesActions";

//fetch all users
export const fetchAllUsers = (): ThunkResult<void> => async (dispatch) => {
  handleFetchAllUsers(dispatch);
  try {
    const response: AxiosResponse<
      ApiResponse<Array<UserModel>>
    > = await client.get("user/all-users");
    handleFetchAllUsersSuccess(dispatch, response.data);
  } catch (e) {
    handleFetchAllUsersFail(dispatch);
  }
};

export const handleFetchAllUsers = (
  dispatch: Dispatch<FetchAllUserAccountsRequestActionType>
) => {
  dispatch({
    type: "FETCH_START_GET_ALL_USER_ACCOUNTS",
  });
};

export const handleFetchAllUsersSuccess = (
  dispatch: Dispatch<FetchAllUserAccountsSuccessActionType>,
  response: ApiResponse<Array<UserModel>>
) => {
  dispatch({
    type: "FETCH_SUCCESS_GET_ALL_USER_ACCOUNTS",
    payload: response,
  });
};

export const handleFetchAllUsersFail = (
  dispatch: Dispatch<FetchAllUserAccountsFailedActionType>
) => {
  dispatch({
    type: "FETCH_FAILURE_GET_ALL_USER_ACCOUNTS",
  });
};

//get user account by id
export const fetchUserAccountById = (): ThunkResult<void> => async (
  dispatch
) => {
  handleFetchUserAccountById(dispatch);
  try {
    const response: AxiosResponse<ApiResponse<UserModel>> = await client.get(
      "/all-users"
    );
    handleFetchUserAccountByIdSuccess(dispatch, response.data);
  } catch (e) {
    handleFetchUserAccountByIdFail(dispatch);
  }
};

export const handleFetchUserAccountById = (
  dispatch: Dispatch<FetchUserAccountByIdRequestActionType>
) => {
  dispatch({
    type: "FETCH_START_GET_USER_ACCOUNT_BY_ID",
  });
};

export const handleFetchUserAccountByIdSuccess = (
  dispatch: Dispatch<FetchUserAccountByIdSuccessActionType>,
  response: ApiResponse<UserModel>
) => {
  dispatch({
    type: "FETCH_SUCCESS_GET_USER_ACCOUNT_BY_ID",
    payload: response,
  });
};

export const handleFetchUserAccountByIdFail = (
  dispatch: Dispatch<FetchUserAccountByIdFailedActionType>
) => {
  dispatch({
    type: "FETCH_FAILURE_GET_USER_ACCOUNT_BY_ID",
  });
};
