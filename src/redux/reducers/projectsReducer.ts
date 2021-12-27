import { Reducer } from "redux";
import { ApiPagedResponse, ApiResponse } from "../../types/api/apiResponses";
import {
  ProjectDetailsModel,
  ProjectModel
} from "../../types/projects/project";
import { getErrorMessage } from "../../utils/actionErrorsUtils";
import { API_ACTIONS } from "../actions/apiActions";
import {
  CREATE_PROJECT,
  FETCH_PROJECT_BY_ID,
  GET_ALL_PROJETCS_ASYNC
} from "../constants/project";

export interface ProjectReducerType {
  projects: ApiPagedResponse<ProjectDetailsModel>;
  project: ApiResponse<ProjectModel> | undefined;
  loading: boolean;
  error?: string;
}

const projectData: ApiPagedResponse<ProjectDetailsModel> = {
  currentPage: 1,
  resultsPerPage: 3,
  totalPages: 1,
  isSuccess: true,
  responseException: null,
  statusCode: 200,
  data: [],
  totalResults: 3,
};

const defaultState: ProjectReducerType = {
  projects: projectData,
  project: undefined,
  loading: false,
  error: undefined,
};

export const projectsReducer: Reducer<ProjectReducerType> = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case `${API_ACTIONS.FETCH_START}${GET_ALL_PROJETCS_ASYNC}`:
    case `${API_ACTIONS.FETCH_START}${FETCH_PROJECT_BY_ID}`:
      return { ...state, loading: true, error: undefined };

    case `${API_ACTIONS.FETCH_FAILURE}${FETCH_PROJECT_BY_ID}`:
    case `${API_ACTIONS.FETCH_FAILURE}${GET_ALL_PROJETCS_ASYNC}`:
    case `${API_ACTIONS.FETCH_FAILURE}${CREATE_PROJECT}`:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case `${API_ACTIONS.FETCH_SUCCESS}${GET_ALL_PROJETCS_ASYNC}`:
      console.log("action payload", action.payload);
      return {
        ...state,
        loading: false,
        projects: action.payload,
        error: getErrorMessage(action),
      };

    case `${API_ACTIONS.FETCH_SUCCESS}${FETCH_PROJECT_BY_ID}`:
      console.log("action payload", action.payload);
      return {
        ...state,
        loading: false,
        project: action.payload,
        error: getErrorMessage(action),
      };

    case `${API_ACTIONS.FETCH_SUCCESS}${CREATE_PROJECT}`:
      console.log("action payload", action.payload);
      return {
        ...state,
        loading: false,
        error: getErrorMessage(action),
        projects: [...state.projects.data, action.payload],
      };

    default:
      return state;
  }
};
