import { AxiosResponse } from "axios";
import { Dispatch } from "react";
import client from "../../api/clients/client";
import { PagedRequest } from "../../types/api/apiRequests";
import {
  ApiEmptyResponse,
  ApiPagedResponse,
  ApiResponse
} from "../../types/api/apiResponses";
import {
  AddUserToTeamFailedActionType, AddUserToTeamSuccessActionType, FetchAllUsersFailedActionType, FetchAllUsersRequestActionType,
  FetchAllUsersSuccessActionType, FetchUserByIdFailedActionType, FetchUserByIdRequestActionType,
  FetchUserByIdSuccessActionType
} from "../../types/users/userAction";
import {
  AddUserToTeamRequest,
  UserDetailsModel
} from "../../types/users/users";
import { ThunkResult } from "./issuesActions";


//fetch all users
export const fetchAllUsers =
  (request: PagedRequest): ThunkResult<void> =>
  async (dispatch) => {
    handleFetchUsers(dispatch);
    try {
      console.log("fetch");
      const response: AxiosResponse<ApiPagedResponse<UserDetailsModel>> =
        await client.get(
          `/user/all-users?page=${request.page}&pageSize=${request.pageSize}`
        );
      handleFetchUsersSuccess(dispatch, response.data);
    } catch (e) {
      handleFetchUsersFail(dispatch);
    }
  };

export const handleFetchUsers = (
  dispatch: Dispatch<FetchAllUsersRequestActionType>
) => {
  dispatch({
    type: "FETCH_START_GET_ALL_USERS_ASYNC",
  });
};

export const handleFetchUsersSuccess = (
  dispatch: Dispatch<FetchAllUsersSuccessActionType>,
  response: ApiPagedResponse<UserDetailsModel>
) => {
  console.log("fetch user succes");
  dispatch({
    type: "FETCH_SUCCESS_GET_ALL_USERS_ASYNC",
    payload: response,
  });
};

export const handleFetchUsersFail = (
  dispatch: Dispatch<FetchAllUsersFailedActionType>
) => {
  console.log("fetch user failed");
  dispatch({
    type: "FETCH_FAILURE_GET_ALL_USERS_ASYNC",
  });
};

//add user to team
export const addUserToTeam =
  (request: AddUserToTeamRequest): ThunkResult<void> =>
  async (dispatch) => {
    try {
      const response: AxiosResponse<ApiEmptyResponse> = await client.post(
        `/user/add-to-team`,
        request
      );
      handleAddUserToTeamSuccess(dispatch, response.data);
    } catch (e) {
      handleAddUserToTeamFail(dispatch);
    }
  };

export const handleAddUserToTeamSuccess = (
  dispatch: Dispatch<AddUserToTeamSuccessActionType>,
  response: ApiEmptyResponse
) => {
  dispatch({
    type: "FETCH_SUCCESS_ADD_USER_TO_TEAM",
    payload: response,
  });
};

export const handleAddUserToTeamFail = (
  dispatch: Dispatch<AddUserToTeamFailedActionType>
) => {
  dispatch({
    type: "FETCH_FAILURE_ADD_USER_TO_TEAM",
  });
};

//fetch user by id
export const fetchUserById =
  (userId: string): ThunkResult<void> =>
  async (dispatch) => {
    handleFetchUserById(dispatch);
    try {
      const response: AxiosResponse<ApiResponse<UserDetailsModel>> =
        await client.post(`/user/${userId}`);
      handleFetchUserByIdSuccess(dispatch, response.data);
    } catch (e) {
      handleFetchUserByIdFail(dispatch);
    }
  };

export const handleFetchUserById = (
  dispatch: Dispatch<FetchUserByIdRequestActionType>
) => {
  dispatch({
    type: "FETCH_START_GET_USER_BY_ID",
  });
};

export const handleFetchUserByIdSuccess = (
  dispatch: Dispatch<FetchUserByIdSuccessActionType>,
  response: ApiResponse<UserDetailsModel>
) => {
  dispatch({
    type: "FETCH_SUCCESS_GET_USER_BY_ID",
    payload: response,
  });
};

export const handleFetchUserByIdFail = (
  dispatch: Dispatch<FetchUserByIdFailedActionType>
) => {
  dispatch({
    type: "FETCH_FAILURE_GET_USER_BY_ID",
  });
};
