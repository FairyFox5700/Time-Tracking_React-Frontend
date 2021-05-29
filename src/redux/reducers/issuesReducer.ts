import { Reducer } from "redux";
import { IssueDetailedModel, Status } from "../../types/issues/isues";
import {
  ApiResponse,
  ApiPagedResponse,
  ApiEmptyDataResponse,
} from "../../types/api/apiResponses";
import {
  CHANGE_ISSUE_STATUS,
  CREATE_ISSUE,
  FETCH_ISSUE_BY_ID,
  GET_ALL_ISSUES_ASYNC,
  ASSIGN_ISSUE_TO_USER_BY_ID,
} from "../../redux/constants/issues";
import { API_ACTIONS } from "../actions/apiActions";
import { getErrorMessage } from "../../utils/actionErrorsUtils";

export interface IssuesReducerType {
  issues: ApiPagedResponse<IssueDetailedModel>;
  issue: ApiEmptyDataResponse<IssueDetailedModel>;
  loading: boolean;
  error?: string;
}

const initialValues: IssueDetailedModel = {
  issueId: "",
  assignedUserFirstName: "",
  assignedUserLastName: "",
  reportedByUserFirstName: "",
  reportedByLastName: "",
  updatedAt: "",
  openedAt: "",
  closedAt: "",
  mileStoneName: "",
  totalRemainingTimeInSeconds: 0,
  totalSpentTimeInSeconds: 0,
  title: "",
  description: "",
  status: Status.Open,
  assignedToUserId: "",
  reportedByUserId: "",
  milestoneId: "",
  projectId: "",
};

const emptyIssuesData: ApiEmptyDataResponse<IssueDetailedModel> = {
  isSuccess: true,
  statusCode: 200,
  data: initialValues,
  responseException: undefined,
};

const issuesData: ApiPagedResponse<IssueDetailedModel> = {
  currentPage: 1,
  resultsPerPage: 3,
  totalPages: 1,
  isSuccess: true,
  responseException: null,
  statusCode: 200,
  data: [],
  totalResults: 3,
};

const defaultState: IssuesReducerType = {
  issues: issuesData,
  issue: emptyIssuesData,
  loading: false,
  error: undefined,
};

export const issuesReducer: Reducer<IssuesReducerType> = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case `${API_ACTIONS.FETCH_START}${GET_ALL_ISSUES_ASYNC}`:
    case `${API_ACTIONS.FETCH_START}${FETCH_ISSUE_BY_ID}`:
      return { ...state, loading: true, error: undefined };

    case `${API_ACTIONS.FETCH_FAILURE}${FETCH_ISSUE_BY_ID}`:
    case `${API_ACTIONS.FETCH_FAILURE}${GET_ALL_ISSUES_ASYNC}`:
    case `${API_ACTIONS.FETCH_FAILURE}${ASSIGN_ISSUE_TO_USER_BY_ID}`:
    case `${API_ACTIONS.FETCH_FAILURE}${CREATE_ISSUE}`:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case `${API_ACTIONS.FETCH_SUCCESS}${GET_ALL_ISSUES_ASYNC}`:
      console.log("action payload", action.payload);
      return {
        ...state,
        loading: false,
        issues: action.payload,
        error: getErrorMessage(action),
      };

    case `${API_ACTIONS.FETCH_SUCCESS}${FETCH_ISSUE_BY_ID}`:
      console.log("action payload fetch issue by id", action.payload);
      return {
        ...state,
        loading: false,
        issue: action.payload,
        error: getErrorMessage(action),
      };

    case `${API_ACTIONS.FETCH_SUCCESS}${ASSIGN_ISSUE_TO_USER_BY_ID}`:
      console.log("action payload", action.payload);
      return {
        ...state,
        loading: false,
        error: getErrorMessage(action),
        issues: [...state.issues.data, action.payload],
      };

    case `${API_ACTIONS.FETCH_SUCCESS}${CREATE_ISSUE}`:
      console.log("action payload", action.payload);
      return {
        ...state,
        loading: false,
        error: getErrorMessage(action),
        issues: [...state.issues.data, action.payload],
      };

    case `${API_ACTIONS.FETCH_SUCCESS}${CHANGE_ISSUE_STATUS}`:
      console.log("action payload", action.payload);
      return {
        ...state,
        loading: false,
        error: getErrorMessage(action),
        issues: [...state.issues.data, action.payload],
      };

    default:
      return state;
  }
};
