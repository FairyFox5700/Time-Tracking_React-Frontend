import { Reducer } from "redux";
import { ApiResponse, ApiPagedResponse } from "../../types/api/apiResponses";
import { TeamDetailsModel, TeamModel } from "../../types/teams/teams";
import { getErrorMessage } from "../../utils/actionErrorsUtils";
import { API_ACTIONS } from "../actions/apiActions";
import {
  CREATE_TEAM,
  FETCH_TEAM_BY_ID,
  GET_ALL_TEAMS_ASYNC,
} from "../constants/teams";

export interface TeamsReducerType {
  teams: ApiPagedResponse<TeamDetailsModel>;
  team: ApiResponse<TeamModel> | undefined;
  loading: boolean;
  error?: string;
}

const teamsData: ApiPagedResponse<TeamDetailsModel> = {
  currentPage: 1,
  resultsPerPage: 3,
  totalPages: 1,
  isSuccess: true,
  responseException: null,
  statusCode: 200,
  data: [],
  totalResults: 3,
};

const defaultState: TeamsReducerType = {
  teams: teamsData,
  team: undefined,
  loading: false,
  error: undefined,
};

export const teamsReducer: Reducer<TeamsReducerType> = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case `${API_ACTIONS.FETCH_START}${GET_ALL_TEAMS_ASYNC}`:
    case `${API_ACTIONS.FETCH_START}${FETCH_TEAM_BY_ID}`:
      return { ...state, loading: true, error: undefined };

    case `${API_ACTIONS.FETCH_FAILURE}${FETCH_TEAM_BY_ID}`:
    case `${API_ACTIONS.FETCH_FAILURE}${GET_ALL_TEAMS_ASYNC}`:
    case `${API_ACTIONS.FETCH_FAILURE}${CREATE_TEAM}`:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case `${API_ACTIONS.FETCH_SUCCESS}${GET_ALL_TEAMS_ASYNC}`:
      console.log("action payload", action.payload);
      return {
        ...state,
        loading: false,
        teams: action.payload,
        error: getErrorMessage(action),
      };

    case `${API_ACTIONS.FETCH_SUCCESS}${FETCH_TEAM_BY_ID}`:
      console.log("action payload", action.payload);
      return {
        ...state,
        loading: false,
        team: action.payload,
        error: getErrorMessage(action),
      };

    case `${API_ACTIONS.FETCH_SUCCESS}${CREATE_TEAM}`:
      console.log("action payload", action.payload);
      return {
        ...state,
        loading: false,
        error: getErrorMessage(action),
        teams: [...state.teams.data, action.payload],
      };

    default:
      return state;
  }
};
