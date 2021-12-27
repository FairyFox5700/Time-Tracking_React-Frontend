import { AxiosResponse } from "axios";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import client from "../../api/clients/client";
import { PagedRequest } from "../../types/api/apiRequests";
import { ApiPagedResponse, ApiResponse } from "../../types/api/apiResponses";
import {
  ProjectDetailsModel,
  ProjectModel
} from "../../types/projects/project";
import {
  CreateProjectFailedActionType, CreateProjectSuccessActionType, FetchAllProjectsFailedActionType,
  FetchAllProjectsRequestActionType, FetchAllProjectsSuccessActionType, FetchProjectByIdFailedActionType, FetchProjectByIdRequestActionType, FetchProjectByIdSuccessActionType
} from "../../types/projects/projectActions";
import { ThunkResult } from "./issuesActions";

//all projects
export const fetchProjects = (
  request: PagedRequest
): ThunkResult<void> => async (dispatch) => {
  handleFetchProjects(dispatch);
  try {
    const response: AxiosResponse<
      ApiPagedResponse<ProjectDetailsModel>
    > = await client.get(
      `/project?page=${request.page}&pageSize=${request.pageSize}`
    );
    handleFetchProjectsSuccess(dispatch, response.data);
  } catch (e) {
    handleFetchProjectsFail(dispatch);
  }
};

export const handleFetchProjects = (
  dispatch: Dispatch<FetchAllProjectsRequestActionType>
) => {
  dispatch({
    type: "FETCH_START_GET_ALL_PROJETCS_ASYNC",
  });
};

export const handleFetchProjectsSuccess = (
  dispatch: Dispatch<FetchAllProjectsSuccessActionType>,
  response: ApiPagedResponse<ProjectDetailsModel>
) => {
  dispatch({
    type: "FETCH_SUCCESS_GET_ALL_PROJETCS_ASYNC",
    payload: response,
  });
};

export const handleFetchProjectsFail = (
  dispatch: Dispatch<FetchAllProjectsFailedActionType>
) => {
  dispatch({
    type: "FETCH_FAILURE_GET_ALL_PROJETCS_ASYNC",
  });
};

//add project
export const addProject = (model: ProjectModel): ThunkResult<void> => async (
  dispatch: Dispatch<AnyAction>
) => {
  try {
    const response: AxiosResponse<
      ApiResponse<ProjectModel>
    > = await client.post("/project/create", model);
    handleAddProject(dispatch, response.data);
  } catch (e) {
    handleAddProjectFail(dispatch);
  }
};

export const handleAddProject = (
  dispatch: Dispatch<CreateProjectSuccessActionType>,
  response: ApiResponse<ProjectModel>
) => {
  dispatch({
    type: "FETCH_SUCCESS_CREATE_PROJECT",
    payload: response,
  });
};

export const handleAddProjectFail = (
  dispatch: Dispatch<CreateProjectFailedActionType>
) => {
  dispatch({
    type: "FETCH_FAILURE_CREATE_PROJECT",
  });
};

//fetch project by id
export const fetchProjectById = (
  projectId: string
): ThunkResult<void> => async (dispatch) => {
  handleFetchProjectById(dispatch);
  try {
    const response: AxiosResponse<
      ApiPagedResponse<ProjectDetailsModel>
    > = await client.post(`/project/${projectId}`);
    handleFetchProjectByIdSuccess(dispatch, response.data);
  } catch (e) {
    handleFetchProjectByIdFail(dispatch);
  }
};

export const handleFetchProjectById = (
  dispatch: Dispatch<FetchProjectByIdRequestActionType>
) => {
  dispatch({
    type: "FETCH_START_FETCH_PROJECT_BY_ID",
  });
};
export const handleFetchProjectByIdSuccess = (
  dispatch: Dispatch<FetchProjectByIdSuccessActionType>,
  response: ApiPagedResponse<ProjectDetailsModel>
) => {
  dispatch({
    type: "FETCH_SUCCESS_FETCH_PROJECT_BY_ID",
    payload: response,
  });
};

export const handleFetchProjectByIdFail = (
  dispatch: Dispatch<FetchProjectByIdFailedActionType>
) => {
  dispatch({
    type: "FETCH_FAILURE_FETCH_PROJECT_BY_ID",
  });
};
