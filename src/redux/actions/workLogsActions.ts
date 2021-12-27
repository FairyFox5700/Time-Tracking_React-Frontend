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
  CrateWorklogFailedActionType,
  CrateWorklogSuccessActionType,
  DeleteWorklogFailedActionType,
  DeleteWorklogSuccessActionType,
  FetchAllWorklogsFailedActionType,
  FetchAllWorklogsRequestActionType,
  FetchAllWorklogsSuccessActionType,
  FetchWorklogByIdFailedActionType,
  FetchWorklogByIdRequestActionType,
  FetchWorklogByIdSuccessActionType,
  GetAllActivitiesForUserFailedActionType,
  GetAllActivitiesForUserRequestActionType,
  GetAllActivitiesForUserSuccessActionType,
  UpdateWorklogFailedActionType,
  UpdateWorklogStatusFailedActionType,
  UpdateWorklogStatusSuccessActionType,
  UpdateWorklogSuccessActionType
} from "../../types/worklogs/worklogActions";
import {
  ActivitiesRequest,
  UpdateWorkLogRequest,
  UpdateWorkLogStatusRequest,
  UserActivityWorklogs,
  WorkLogDetails,
  WorkLogModel
} from "../../types/worklogs/worklogs";
import { ThunkResult } from "./issuesActions";

//fetch all worklogs
export const fetchAllWorkLogs = (
  request: PagedRequest
): ThunkResult<void> => async (dispatch) => {
  handleFetchWorklogs(dispatch);
  try {
    const response: AxiosResponse<
      ApiPagedResponse<WorkLogDetails>
    > = await client.get(
      `/workLog?page=${request.page}&pageSize=${request.pageSize}`
    );
    handleFetchWorklogsSuccess(dispatch, response.data);
  } catch (e) {
    handleFetchWorklogsFail(dispatch);
  }
};

export const handleFetchWorklogs = (
  dispatch: Dispatch<FetchAllWorklogsRequestActionType>
) => {
  dispatch({
    type: "FETCH_START_GET_ALL_WORKLOGS_PAGED",
  });
};

export const handleFetchWorklogsSuccess = (
  dispatch: Dispatch<FetchAllWorklogsSuccessActionType>,
  response: ApiPagedResponse<WorkLogDetails>
) => {
  dispatch({
    type: "FETCH_SUCCESS_GET_ALL_WORKLOGS_PAGED",
    payload: response,
  });
};

export const handleFetchWorklogsFail = (
  dispatch: Dispatch<FetchAllWorklogsFailedActionType>
) => {
  dispatch({
    type: "FETCH_FAILURE_GET_ALL_WORKLOGS_PAGED",
  });
};

//fetch all worklogs to user
export const fetchWorklogsByUser = (
  request: ActivitiesRequest
): ThunkResult<void> => async (dispatch) => {
  handleFetchWorklogsByUser(dispatch);
  try {
    const response: AxiosResponse<
      ApiResponse<UserActivityWorklogs>
    > = await client.post(`/workLog/get-user-activities`, request);
    handleFetchWorklogsByUserSuccess(dispatch, response.data);
  } catch (e) {
    handleFetchWorklogsByUserFail(dispatch);
  }
};

export const handleFetchWorklogsByUser = (
  dispatch: Dispatch<GetAllActivitiesForUserRequestActionType>
) => {
  dispatch({
    type: "FETCH_START_GET_ALL_ACTIVITIES_FOR_USER",
  });
};

export const handleFetchWorklogsByUserSuccess = (
  dispatch: Dispatch<GetAllActivitiesForUserSuccessActionType>,
  response: ApiResponse<UserActivityWorklogs>
) => {
  dispatch({
    type: "FETCH_SUCCESS_GET_ALL_ACTIVITIES_FOR_USER",
    payload: response,
  });
};

export const handleFetchWorklogsByUserFail = (
  dispatch: Dispatch<GetAllActivitiesForUserFailedActionType>
) => {
  dispatch({
    type: "FETCH_FAILURE_GET_ALL_ACTIVITIES_FOR_USER",
  });
};

//fetch worklog by id
export const fetchWorklogById = (
  workLogId: string
): ThunkResult<void> => async (dispatch) => {
  handleFetchWorklogById(dispatch);
  try {
    const response: AxiosResponse<
      ApiResponse<WorkLogModel>
    > = await client.post(`/workLog/${workLogId}`);
    handleFetchWorklogByIdSuccess(dispatch, response.data);
  } catch (e) {
    handleFetchWorklogByIdFail(dispatch);
  }
};

export const handleFetchWorklogById = (
  dispatch: Dispatch<FetchWorklogByIdRequestActionType>
) => {
  dispatch({
    type: "FETCH_START_FETCH_WORKLOG_BY_ID",
  });
};

export const handleFetchWorklogByIdSuccess = (
  dispatch: Dispatch<FetchWorklogByIdSuccessActionType>,
  response: ApiResponse<WorkLogModel>
) => {
  dispatch({
    type: "FETCH_SUCCESS_FETCH_WORKLOG_BY_ID",
    payload: response,
  });
};

export const handleFetchWorklogByIdFail = (
  dispatch: Dispatch<FetchWorklogByIdFailedActionType>
) => {
  dispatch({
    type: "FETCH_FAILURE_FETCH_WORKLOG_BY_ID",
  });
};

//create worklog
export const createWorklog = (model: WorkLogModel): ThunkResult<void> => async (
  dispatch
) => {
  try {
    const response: AxiosResponse<
      ApiResponse<WorkLogModel>
    > = await client.post(`/workLog/create`, model);
    handleCreateWorklogSuccess(dispatch, response.data);
  } catch (e) {
    handleCreateWorklogFail(dispatch);
  }
};

export const handleCreateWorklogSuccess = (
  dispatch: Dispatch<CrateWorklogSuccessActionType>,
  response: ApiResponse<WorkLogModel>
) => {
  dispatch({
    type: "FETCH_SUCCESS_CREATE_WORKLOG",
    payload: response,
  });
};

export const handleCreateWorklogFail = (
  dispatch: Dispatch<CrateWorklogFailedActionType>
) => {
  dispatch({
    type: "FETCH_FAILURE_CREATE_WORKLOG",
  });
};

//update worklog
export const updateWorklog = (
  request: UpdateWorkLogRequest
): ThunkResult<void> => async (dispatch) => {
  try {
    const response: AxiosResponse<
      ApiResponse<WorkLogModel>
    > = await client.post(`/workLog/update`, request);
    handleUpdateWorklogSuccess(dispatch, response.data);
  } catch (e) {
    handleUpdateWorklogFail(dispatch);
  }
};

export const handleUpdateWorklogSuccess = (
  dispatch: Dispatch<UpdateWorklogSuccessActionType>,
  response: ApiResponse<WorkLogModel>
) => {
  dispatch({
    type: "FETCH_SUCCESS_UPDATE_WORKLOG",
    payload: response,
  });
};

export const handleUpdateWorklogFail = (
  dispatch: Dispatch<UpdateWorklogFailedActionType>
) => {
  dispatch({
    type: "FETCH_FAILURE_UPDATE_WORKLOG",
  });
};

//update status of worklog
export const updateStatusWorklog = (
  request: UpdateWorkLogStatusRequest
): ThunkResult<void> => async (dispatch) => {
  try {
    const response: AxiosResponse<
      ApiResponse<WorkLogModel>
    > = await client.post(`/workLog/update-status`, request);
    handleUpdateWorklogStatusSuccess(dispatch, response.data);
  } catch (e) {
    handleUpdateWorklogStatusFail(dispatch);
  }
};

export const handleUpdateWorklogStatusSuccess = (
  dispatch: Dispatch<UpdateWorklogStatusSuccessActionType>,
  response: ApiResponse<WorkLogModel>
) => {
  dispatch({
    type: "FETCH_SUCCESS_UPDATE_WORKLOG_STATUS",
    payload: response,
  });
};

export const handleUpdateWorklogStatusFail = (
  dispatch: Dispatch<UpdateWorklogStatusFailedActionType>
) => {
  dispatch({
    type: "FETCH_FAILURE_UPDATE_WORKLOG_STATUS",
  });
};

//delete worklog
export const deleteWorklog = (workLogId: string): ThunkResult<void> => async (
  dispatch
) => {
  try {
    const response: AxiosResponse<ApiResponse<WorkLogModel>> = await client.get(
      `/workLog/${workLogId}`
    );
    handleDeleteWorklogStatusSuccess(dispatch, response.data);
  } catch (e) {
    handleDeleteWorklogStatusFail(dispatch);
  }
};

export const handleDeleteWorklogStatusSuccess = (
  dispatch: Dispatch<DeleteWorklogSuccessActionType>,
  response: ApiEmptyResponse
) => {
  dispatch({
    type: "FETCH_SUCCESS_DELETE_WORKLOG",
    payload: response,
  });
};

export const handleDeleteWorklogStatusFail = (
  dispatch: Dispatch<DeleteWorklogFailedActionType>
) => {
  dispatch({
    type: "FETCH_FAILURE_DELETE_WORKLOG",
  });
};
