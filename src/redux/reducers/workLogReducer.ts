import { Reducer } from "redux";
import { ApiResponse, ApiPagedResponse } from "../../types/api/apiResponses";
import { WorkLogDetails, WorkLogModel } from "../../types/worklogs/worklogs";
import {
  CREATE_WORKLOG,
  DELETE_WORKLOG,
  FETCH_WORKLOG_BY_ID,
  GET_ALL_ACTIVITIES_FOR_USER,
  GET_ALL_WORKLOGS_PAGED,
  UPDATE_WORKLOG,
  UPDATE_WORKLOG_STATUS,
} from "../constants/worklogs";
import { API_ACTIONS } from "../actions/apiActions";
import { getErrorMessage } from "../../utils/actionErrorsUtils";

export interface WorklogReducerType {
  workLogs: ApiPagedResponse<WorkLogDetails>;
  workLog: ApiResponse<WorkLogModel> | undefined;
  loading: boolean;
  error?: string;
}

const worklogsData: ApiPagedResponse<WorkLogDetails> = {
  currentPage: 1,
  resultsPerPage: 3,
  totalPages: 1,
  isSuccess: true,
  responseException: null,
  statusCode: 200,
  data: [],
  totalResults: 3,
};

const defaultState: WorklogReducerType = {
  workLogs: worklogsData,
  workLog: undefined,
  loading: false,
  error: undefined,
};

export const workLogsReducer: Reducer<WorklogReducerType> = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case `${API_ACTIONS.FETCH_START}${GET_ALL_WORKLOGS_PAGED}`:
    case `${API_ACTIONS.FETCH_START}${FETCH_WORKLOG_BY_ID}`:
    case `${API_ACTIONS.FETCH_START}${GET_ALL_ACTIVITIES_FOR_USER}`:
      return { ...state, loading: true, error: undefined };

    case `${API_ACTIONS.FETCH_FAILURE}${GET_ALL_WORKLOGS_PAGED}`:
    case `${API_ACTIONS.FETCH_FAILURE}${FETCH_WORKLOG_BY_ID}`:
    case `${API_ACTIONS.FETCH_FAILURE}${CREATE_WORKLOG}`:
    case `${API_ACTIONS.FETCH_FAILURE}${GET_ALL_ACTIVITIES_FOR_USER}`:
    case `${API_ACTIONS.FETCH_FAILURE}${UPDATE_WORKLOG}`:
    case `${API_ACTIONS.FETCH_FAILURE}${UPDATE_WORKLOG_STATUS}`:
    case `${API_ACTIONS.FETCH_FAILURE}${DELETE_WORKLOG}`:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case `${API_ACTIONS.FETCH_SUCCESS}${GET_ALL_WORKLOGS_PAGED}`:
    case `${API_ACTIONS.FETCH_SUCCESS}${GET_ALL_ACTIVITIES_FOR_USER}`:
      console.log("action payload", action.payload);
      return {
        ...state,
        loading: false,
        workLogs: action.payload,
        error: getErrorMessage(action),
      };

    case `${API_ACTIONS.FETCH_SUCCESS}${FETCH_WORKLOG_BY_ID}`:
    case `${API_ACTIONS.FETCH_SUCCESS}${UPDATE_WORKLOG}`:
    case `${API_ACTIONS.FETCH_SUCCESS}${UPDATE_WORKLOG_STATUS}`:
      console.log("action payload", action.payload);
      return {
        ...state,
        loading: false,
        workLog: action.payload,
        error: getErrorMessage(action),
      };
    case `${API_ACTIONS.FETCH_SUCCESS}${CREATE_WORKLOG}`:
      console.log("action payload", action.payload);
      return {
        ...state,
        loading: false,
        error: getErrorMessage(action),
        workLogs: [...state.workLogs.data, action.payload],
      };
    case `${API_ACTIONS.FETCH_SUCCESS}${DELETE_WORKLOG}`:
      console.log("action payload", action.payload);
      return {
        ...state,
        loading: false,
        error: getErrorMessage(action),
        workLog: action.payload,
      };
    default:
      return state;
  }
};
