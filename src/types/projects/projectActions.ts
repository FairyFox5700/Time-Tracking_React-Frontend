import {
  CREATE_PROJECT,
  GET_ALL_PROJETCS_ASYNC,
  FETCH_PROJECT_BY_ID,
} from "../../redux/constants/project";

import { ProjectDetailsModel, ProjectModel } from "./project";
import { ApiPagedResponse, ApiResponse } from "../api/apiResponses";
import { API_ACTIONS } from "../../redux/actions/apiActions";

export interface FetchAllProjectsRequestActionType {
  type: `${API_ACTIONS.FETCH_START}${typeof GET_ALL_PROJETCS_ASYNC}`;
}

export interface FetchAllProjectsSuccessActionType {
  type: `${API_ACTIONS.FETCH_SUCCESS}${typeof GET_ALL_PROJETCS_ASYNC}`;
  payload?: ApiPagedResponse<ProjectDetailsModel>;
}

export interface FetchAllProjectsFailedActionType {
  type: `${API_ACTIONS.FETCH_FAILURE}${typeof GET_ALL_PROJETCS_ASYNC}`;
}

export interface CreateProjectSuccessActionType {
  type: `${API_ACTIONS.FETCH_SUCCESS}${typeof CREATE_PROJECT}`;
  payload?: ApiResponse<ProjectModel>;
}

export interface CreateProjectFailedActionType {
  type: `${API_ACTIONS.FETCH_FAILURE}${typeof CREATE_PROJECT}`;
}

export interface FetchProjectByIdSuccessActionType {
  type: `${API_ACTIONS.FETCH_SUCCESS}${typeof FETCH_PROJECT_BY_ID}`;
  payload?: ApiPagedResponse<ProjectDetailsModel>;
}

export interface FetchProjectByIdRequestActionType {
  type: `${API_ACTIONS.FETCH_START}${typeof FETCH_PROJECT_BY_ID}`;
}

export interface FetchProjectByIdFailedActionType {
  type: `${API_ACTIONS.FETCH_FAILURE}${typeof FETCH_PROJECT_BY_ID}`;
}

export type ProjectActionTypes =
  | FetchProjectByIdFailedActionType
  | FetchProjectByIdRequestActionType
  | FetchProjectByIdSuccessActionType
  | CreateProjectFailedActionType
  | CreateProjectSuccessActionType
  | FetchAllProjectsFailedActionType
  | FetchAllProjectsSuccessActionType
  | FetchAllProjectsRequestActionType;
