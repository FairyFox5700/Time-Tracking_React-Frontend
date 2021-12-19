import {
  CHANGE_ISSUE_STATUS,
  CREATE_ISSUE,
  FETCH_ISSUE_BY_ID,
  GET_ALL_ISSUES_ASYNC,
  ASSIGN_ISSUE_TO_USER_BY_ID,
  GET_ALL_ISSUES_FILTERED_ASYNC,
} from "../../redux/constants/issues";

import { IssueDetailedModel, IssueModel } from "./isues";

import { ApiPagedResponse, ApiResponse } from "../api/apiResponses";
import { API_ACTIONS } from "../../redux/actions/apiActions";

export interface FetchAllIssuesRequestActionType {
  type: `${API_ACTIONS.FETCH_START}${typeof GET_ALL_ISSUES_ASYNC}`;
}

export interface FetchAllIssuesSuccessActionType {
  type: `${API_ACTIONS.FETCH_SUCCESS}${typeof GET_ALL_ISSUES_ASYNC}`;
  payload?: ApiPagedResponse<IssueDetailedModel>;
}

export interface FetchIssuesFailedActionType {
  type: `${API_ACTIONS.FETCH_FAILURE}${typeof GET_ALL_ISSUES_ASYNC}`;
  payload?: any;
}

export interface FetchAllIssuesFilteredRequestActionType {
  type: `${API_ACTIONS.FETCH_START}${typeof GET_ALL_ISSUES_FILTERED_ASYNC}`;
}

export interface FetchAllIssuesFilteredSuccessActionType {
  type: `${API_ACTIONS.FETCH_SUCCESS}${typeof GET_ALL_ISSUES_FILTERED_ASYNC}`;
  payload?: ApiResponse<IssueDetailedModel[]>;
}

export interface FetchIssuesFilteredFailedActionType {
  type: `${API_ACTIONS.FETCH_FAILURE}${typeof GET_ALL_ISSUES_FILTERED_ASYNC}`;
  payload?: any;
}

export interface CreateIssueSucessActionType {
  type: `${API_ACTIONS.FETCH_SUCCESS}${typeof CREATE_ISSUE}`;
  payload: ApiResponse<IssueModel>;
}

export interface CreateIssueFailureActionType {
  type: `${API_ACTIONS.FETCH_FAILURE}${typeof CREATE_ISSUE}`;
}

export interface ChangeIssueStatusSucessActionType {
  type: `${API_ACTIONS.FETCH_SUCCESS}${typeof CHANGE_ISSUE_STATUS}`;
  payload: ApiResponse<IssueModel>;
}

export interface ChangeIssueStatusFailureActionType {
  type: `${API_ACTIONS.FETCH_FAILURE}${typeof CHANGE_ISSUE_STATUS}`;
}

export interface FetchIssueByIdRequestActionType {
  type: `${API_ACTIONS.FETCH_START}${typeof FETCH_ISSUE_BY_ID}`;
}

export interface FetchIssueByIdSucessActionType {
  type: `${API_ACTIONS.FETCH_SUCCESS}${typeof FETCH_ISSUE_BY_ID}`;
  payload: ApiResponse<IssueModel>;
}

export interface FetchIssueByIdFailureActionType {
  type: `${API_ACTIONS.FETCH_FAILURE}${typeof FETCH_ISSUE_BY_ID}`;
}

export interface AssignIssuesSucessActionType {
  type: `${API_ACTIONS.FETCH_SUCCESS}${typeof ASSIGN_ISSUE_TO_USER_BY_ID}`;
  payload: ApiResponse<IssueModel>;
}

export interface AssignIssuesFailureActionType {
  type: `${API_ACTIONS.FETCH_FAILURE}${typeof ASSIGN_ISSUE_TO_USER_BY_ID}`;
}

export type IssuesAction =
  | FetchAllIssuesRequestActionType
  | FetchAllIssuesSuccessActionType
  | FetchIssuesFailedActionType
  | CreateIssueSucessActionType
  | CreateIssueFailureActionType
  | ChangeIssueStatusSucessActionType
  | ChangeIssueStatusFailureActionType
  | AssignIssuesFailureActionType
  | AssignIssuesSucessActionType
  | FetchIssueByIdFailureActionType
  | FetchIssueByIdRequestActionType
  | FetchIssueByIdSucessActionType
  |FetchAllIssuesFilteredRequestActionType
  |FetchAllIssuesFilteredSuccessActionType
  |FetchIssuesFailedActionType
  |FetchIssuesFilteredFailedActionType
  | ChangeIssueStatusSucessActionType
  | ChangeIssueStatusFailureActionType;
