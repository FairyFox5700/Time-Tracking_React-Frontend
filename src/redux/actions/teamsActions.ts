import {
  FetchAllTeamsRequestActionType,
  FetchAllTeamsSuccessActionType,
  FetchAllTeamsFailedActionType,
  CreateTeamSuccessActionType,
  CreateTeamFailedActionType,
  FetchTeamByIdSuccessActionType,
  FetchTeamByIdFailedActionType,
  FetchTeamByIdRequestActionType,
} from "../../types/teams/teamActions";

import { PagedRequest } from "../../types/api/apiRequests";
import { TeamModel, TeamDetailsModel } from "../../types/teams/teams";
import { AxiosResponse } from "axios";
import { ProjectDetailsModel } from "../../types/projects/project";
import { ApiPagedResponse, ApiResponse } from "../../types/api/apiResponses";
import client from "../../api/clients/client";
import { Dispatch } from "react";
import { ThunkResult } from "./issuesActions";

//get all teams
export const fetchAllTeams = (
  request: PagedRequest
): ThunkResult<void> => async (dispatch) => {
  handleFetchTeamsIssues(dispatch);
  try {
    const response: AxiosResponse<
      ApiPagedResponse<ProjectDetailsModel>
    > = await client.get(
      `/team?page=${request.page}&pageSize=${request.pageSize}`
    );
    handleFetchTeamsSuccess(dispatch, response.data);
  } catch (e) {
    handleFetchTeamsFail(dispatch);
  }
};

export const handleFetchTeamsIssues = (
  dispatch: Dispatch<FetchAllTeamsRequestActionType>
) => {
  dispatch({
    type: "FETCH_START_GET_ALL_TEAMS_ASYNC",
  });
};

export const handleFetchTeamsSuccess = (
  dispatch: Dispatch<FetchAllTeamsSuccessActionType>,
  response: ApiPagedResponse<ProjectDetailsModel>
) => {
  dispatch({
    type: "FETCH_SUCCESS_GET_ALL_TEAMS_ASYNC",
    payload: response,
  });
};

export const handleFetchTeamsFail = (
  dispatch: Dispatch<FetchAllTeamsFailedActionType>
) => {
  dispatch({
    type: "FETCH_FAILURE_GET_ALL_TEAMS_ASYNC",
  });
};

//add team
export const addTeam = (team: TeamModel): ThunkResult<void> => async (
  dispatch
) => {
  handleFetchTeamsIssues(dispatch);
  try {
    const response: AxiosResponse<
      ApiResponse<TeamDetailsModel>
    > = await client.post("/team/create", team);
    handleAddTeamSuccess(dispatch, response.data);
  } catch (e) {
    handleAddTeamFail(dispatch);
  }
};

export const handleAddTeamSuccess = (
  dispatch: Dispatch<CreateTeamSuccessActionType>,
  response: ApiResponse<TeamDetailsModel>
) => {
  dispatch({
    type: "FETCH_SUCCESS_CREATE_TEAM",
    payload: response,
  });
};

export const handleAddTeamFail = (
  dispatch: Dispatch<CreateTeamFailedActionType>
) => {
  dispatch({
    type: "FETCH_FAILURE_CREATE_TEAM",
  });
};

// fetch project by id
export const fetchTeamById = (teamId: string): ThunkResult<void> => async (
  dispatch
) => {
  handleFetchTeamById(dispatch);
  try {
    const response: AxiosResponse<
      ApiResponse<TeamDetailsModel>
    > = await client.get(`/team?${teamId}`);
    handleFetchTeamByIdSuccess(dispatch, response.data);
  } catch (e) {
    handleFetchTeamByIdFail(dispatch);
  }
};

export const handleFetchTeamById = (
  dispatch: Dispatch<FetchTeamByIdRequestActionType>
) => {
  dispatch({
    type: "FETCH_START_FETCH_TEAM_BY_ID",
  });
};

export const handleFetchTeamByIdSuccess = (
  dispatch: Dispatch<FetchTeamByIdSuccessActionType>,
  response: ApiResponse<TeamDetailsModel>
) => {
  dispatch({
    type: "FETCH_SUCCESS_FETCH_TEAM_BY_ID",
    payload: response,
  });
};

export const handleFetchTeamByIdFail = (
  dispatch: Dispatch<FetchTeamByIdFailedActionType>
) => {
  dispatch({
    type: "FETCH_FAILURE_FETCH_TEAM_BY_ID",
  });
};
