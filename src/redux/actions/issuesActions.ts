import {
  AssignIssueToUserRequest,
  ChangeIssueStatusRequest,
  IssueDetailedModel,
  IssueModel,
} from "../../types/issues/isues";

import {
  AssignIssuesFailureActionType,
  AssignIssuesSucessActionType,
  ChangeIssueStatusFailureActionType,
  ChangeIssueStatusSucessActionType,
  CreateIssueFailureActionType,
  CreateIssueSucessActionType,
  FetchAllIssuesRequestActionType,
  FetchAllIssuesSuccessActionType,
  FetchIssueByIdFailureActionType,
  FetchIssueByIdRequestActionType,
  FetchIssueByIdSucessActionType,
  FetchIssuesFailedActionType,
} from "../../types/issues/issesActions";

import { PagedRequest } from "../../types/api/apiRequests";
import { ThunkAction } from "redux-thunk";
import { AxiosResponse } from "axios";
import client from "../../api/clients/client";
import { RootActions, RootState } from "../../store";
import { ApiPagedResponse, ApiResponse } from "../../types/api/apiResponses";
import { Dispatch } from "react";
export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootActions>;

//get all issues
export const fetchIssues = (request: PagedRequest): ThunkResult<void> => async (
  dispatch
) => {
  handleFetchIssues(dispatch);
  try {
    const response: AxiosResponse<
      ApiPagedResponse<IssueDetailedModel>
    > = await client.get(
      `/issue?page=${request.page}&pageSize=${request.pageSize}`
    );
    handleFetchIssuesSuccess(dispatch, response.data);
  } catch (e) {
    handleFetchIssuesFail(dispatch);
  }
};

export const handleFetchIssues = (
  dispatch: Dispatch<FetchAllIssuesRequestActionType>
) => {
  dispatch({
    type: "FETCH_START_GET_ALL_ISSUES_ASYNC",
  });
};

export const handleFetchIssuesSuccess = (
  dispatch: Dispatch<FetchAllIssuesSuccessActionType>,
  response: ApiPagedResponse<IssueDetailedModel>
) => {
  dispatch({
    type: "FETCH_SUCCESS_GET_ALL_ISSUES_ASYNC",
    payload: response,
  });
};

export const handleFetchIssuesFail = (
  dispatch: Dispatch<FetchIssuesFailedActionType>
) => {
  dispatch({
    type: "FETCH_FAILURE_GET_ALL_ISSUES_ASYNC",
  });
};

//fetch issue y id

export const fetchIssuesById = (issueId: string): ThunkResult<void> => async (
  dispatch
) => {
  handleFetchIssueById(dispatch);
  try {
    const response: AxiosResponse<ApiResponse<IssueModel>> = await client.get(
      `/issue?${issueId}`
    );
    handleFetchIssueByIdSuccess(dispatch, response.data);
  } catch (e) {
    handleFetchIssueByIdFailed(dispatch);
  }
};

export const handleFetchIssueById = (
  dispatch: Dispatch<FetchIssueByIdRequestActionType>
) => {
  dispatch({
    type: "FETCH_START_FETCH_ISSUE_BY_ID",
  });
};

export const handleFetchIssueByIdSuccess = (
  dispatch: Dispatch<FetchIssueByIdSucessActionType>,
  response: ApiResponse<IssueModel>
) => {
  dispatch({
    type: "FETCH_SUCCESS_FETCH_ISSUE_BY_ID",
    payload: response,
  });
};

export const handleFetchIssueByIdFailed = (
  dispatch: Dispatch<FetchIssueByIdFailureActionType>
) => {
  dispatch({
    type: "FETCH_FAILURE_FETCH_ISSUE_BY_ID",
  });
};

//create issue
export const createIssue = (issue: IssueModel): ThunkResult<void> => async (
  dispatch
) => {
  try {
    const response: AxiosResponse<ApiResponse<IssueModel>> = await client.post(
      "/issue/create-issue",
      issue
    );
    handleCreateIssue(dispatch, response.data);
  } catch (e) {
    handleCreateIssueFailed(dispatch);
  }
};

export const handleCreateIssue = (
  dispatch: Dispatch<CreateIssueSucessActionType>,
  response: ApiResponse<IssueModel>
) => {
  dispatch({
    type: "FETCH_SUCCESS_CREATE_ISSUE",
    payload: response,
  });
};

export const handleCreateIssueFailed = (
  dispatch: Dispatch<CreateIssueFailureActionType>
) => {
  dispatch({
    type: "FETCH_FAILURE_CREATE_ISSUE",
  });
};

//change issue status
export const changeIssueStatus = (
  request: ChangeIssueStatusRequest
): ThunkResult<void> => async (dispatch) => {
  try {
    const response: AxiosResponse<ApiResponse<IssueModel>> = await client.post(
      "/issue/change-status",
      request
    );
    handleChangeIssueStatus(dispatch, response.data);
  } catch (e) {
    handleChangeIssueStatusFailed(dispatch);
  }
};

export const handleChangeIssueStatus = (
  dispatch: Dispatch<ChangeIssueStatusSucessActionType>,
  response: ApiResponse<IssueModel>
) => {
  dispatch({
    type: "FETCH_SUCCESS_CHANGE_ISSUE_STATUS",
    payload: response,
  });
};

export const handleChangeIssueStatusFailed = (
  dispatch: Dispatch<ChangeIssueStatusFailureActionType>
) => {
  dispatch({
    type: "FETCH_FAILURE_CHANGE_ISSUE_STATUS",
  });
};

//assign issue to user

export const assignIssueToUser = (
  request: AssignIssueToUserRequest
): ThunkResult<void> => async (dispatch) => {
  try {
    const response: AxiosResponse<ApiResponse<IssueModel>> = await client.post(
      "/issue/assign-to-user",
      request
    );
    handleAssignIssueToUser(dispatch, response.data);
  } catch (e) {
    handleAssignIssueToUserFailed(dispatch);
  }
};

export const handleAssignIssueToUser = (
  dispatch: Dispatch<AssignIssuesSucessActionType>,
  response: ApiResponse<IssueModel>
) => {
  dispatch({
    type: "FETCH_SUCCESS_ASSIGN_ISSUE_TO_USER_BY_ID",
    payload: response,
  });
};

export const handleAssignIssueToUserFailed = (
  dispatch: Dispatch<AssignIssuesFailureActionType>
) => {
  dispatch({
    type: "FETCH_FAILURE_ASSIGN_ISSUE_TO_USER_BY_ID",
  });
};
