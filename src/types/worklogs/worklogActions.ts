import {
  GET_ALL_ACTIVITIES_FOR_USER,
  DELETE_WORKLOG,
  GET_ALL_WORKLOGS_PAGED,
  CREATE_WORKLOG,
  UPDATE_WORKLOG,
  UPDATE_WORKLOG_STATUS,
  FETCH_WORKLOG_BY_ID,
} from "../../redux/constants/worklogs";

import {
  WorkLogDetails,
  WorkLogModel,
  UpdateWorkLogRequest,
  ActivitiesRequest,
  UserActivityWorklogs,
} from "./worklogs";

import { PagedRequest } from "../api/apiRequests";
import { API_ACTIONS } from "../../redux/actions/apiActions";
import {
  ApiEmptyResponse,
  ApiPagedResponse,
  ApiResponse,
} from "../api/apiResponses";

export interface FetchAllWorklogsRequestActionType {
  type: `${API_ACTIONS.FETCH_START}${typeof GET_ALL_WORKLOGS_PAGED}`;
}

export interface FetchAllWorklogsSuccessActionType {
  type: `${API_ACTIONS.FETCH_SUCCESS}${typeof GET_ALL_WORKLOGS_PAGED}`;
  payload?: ApiPagedResponse<WorkLogDetails>;
}

export interface FetchAllWorklogsFailedActionType {
  type: `${API_ACTIONS.FETCH_FAILURE}${typeof GET_ALL_WORKLOGS_PAGED}`;
}
export interface GetAllActivitiesForUserRequestActionType {
  type: `${API_ACTIONS.FETCH_START}${typeof GET_ALL_ACTIVITIES_FOR_USER}`;
}
export interface GetAllActivitiesForUserSuccessActionType {
  type: `${API_ACTIONS.FETCH_SUCCESS}${typeof GET_ALL_ACTIVITIES_FOR_USER}`;
  payload?: ApiResponse<UserActivityWorklogs>;
}
export interface GetAllActivitiesForUserFailedActionType {
  type: `${API_ACTIONS.FETCH_FAILURE}${typeof GET_ALL_ACTIVITIES_FOR_USER}`;
}

export interface CrateWorklogSuccessActionType {
  type: `${API_ACTIONS.FETCH_SUCCESS}${typeof CREATE_WORKLOG}`;
  payload?: ApiResponse<WorkLogModel>;
}
export interface CrateWorklogFailedActionType {
  type: `${API_ACTIONS.FETCH_FAILURE}${typeof CREATE_WORKLOG}`;
}

export interface UpdateWorklogSuccessActionType {
  type: `${API_ACTIONS.FETCH_SUCCESS}${typeof UPDATE_WORKLOG}`;
  payload?: ApiResponse<WorkLogModel>;
}
export interface UpdateWorklogFailedActionType {
  type: `${API_ACTIONS.FETCH_FAILURE}${typeof UPDATE_WORKLOG}`;
}
export interface UpdateWorklogStatusSuccessActionType {
  type: `${API_ACTIONS.FETCH_SUCCESS}${typeof UPDATE_WORKLOG_STATUS}`;
  payload?: ApiResponse<WorkLogModel>;
}
export interface UpdateWorklogStatusFailedActionType {
  type: `${API_ACTIONS.FETCH_FAILURE}${typeof UPDATE_WORKLOG_STATUS}`;
}

export interface DeleteWorklogSuccessActionType {
  type: `${API_ACTIONS.FETCH_SUCCESS}${typeof DELETE_WORKLOG}`;
  payload?: ApiEmptyResponse;
}
export interface DeleteWorklogFailedActionType {
  type: `${API_ACTIONS.FETCH_FAILURE}${typeof DELETE_WORKLOG}`;
}

export interface FetchWorklogByIdRequestActionType {
  type: `${API_ACTIONS.FETCH_START}${typeof FETCH_WORKLOG_BY_ID}`;
}

export interface FetchWorklogByIdSuccessActionType {
  type: `${API_ACTIONS.FETCH_SUCCESS}${typeof FETCH_WORKLOG_BY_ID}`;
  payload?: ApiResponse<WorkLogModel>;
}

export interface FetchWorklogByIdFailedActionType {
  type: `${API_ACTIONS.FETCH_FAILURE}${typeof FETCH_WORKLOG_BY_ID}`;
}

export type UserActionTypes =
  | FetchWorklogByIdFailedActionType
  | FetchWorklogByIdSuccessActionType
  | FetchWorklogByIdRequestActionType
  | DeleteWorklogFailedActionType
  | DeleteWorklogSuccessActionType
  | UpdateWorklogStatusFailedActionType
  | UpdateWorklogStatusSuccessActionType
  | UpdateWorklogSuccessActionType
  | UpdateWorklogFailedActionType
  | CrateWorklogFailedActionType
  | CrateWorklogSuccessActionType
  | DeleteWorklogFailedActionType
  | DeleteWorklogSuccessActionType
  | GetAllActivitiesForUserFailedActionType
  | GetAllActivitiesForUserSuccessActionType
  | FetchAllWorklogsFailedActionType
  | FetchAllWorklogsRequestActionType
  | FetchAllWorklogsSuccessActionType;
