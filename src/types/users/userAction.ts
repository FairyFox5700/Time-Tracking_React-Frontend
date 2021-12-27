import { API_ACTIONS } from "../../redux/actions/apiActions";
import {
  ADD_USER_TO_TEAM,
  GET_ALL_USERS_ASYNC,
  GET_USER_BY_ID
} from "../../redux/constants/users";
import {
  ApiEmptyResponse,
  ApiPagedResponse,
  ApiResponse
} from "../api/apiResponses";
import { UserDetailsModel } from "./users";

export interface FetchAllUsersRequestActionType {
  type: `${API_ACTIONS.FETCH_START}${typeof GET_ALL_USERS_ASYNC}`;
}

export interface FetchAllUsersSuccessActionType {
  type: `${API_ACTIONS.FETCH_SUCCESS}${typeof GET_ALL_USERS_ASYNC}`;
  payload?: ApiPagedResponse<UserDetailsModel>;
}

export interface FetchAllUsersFailedActionType {
  type: `${API_ACTIONS.FETCH_FAILURE}${typeof GET_ALL_USERS_ASYNC}`;
}

export interface AddUserToTeamSuccessActionType {
  type: `${API_ACTIONS.FETCH_SUCCESS}${typeof ADD_USER_TO_TEAM}`;
  payload?: ApiEmptyResponse;
}

export interface AddUserToTeamFailedActionType {
  type: `${API_ACTIONS.FETCH_FAILURE}${typeof ADD_USER_TO_TEAM}`;
}

export interface FetchUserByIdRequestActionType {
  type: `${API_ACTIONS.FETCH_START}${typeof GET_USER_BY_ID}`;
}

export interface FetchUserByIdSuccessActionType {
  type: `${API_ACTIONS.FETCH_SUCCESS}${typeof GET_USER_BY_ID}`;
  payload?: ApiResponse<UserDetailsModel>;
}

export interface FetchUserByIdFailedActionType {
  type: `${API_ACTIONS.FETCH_FAILURE}${typeof GET_USER_BY_ID}`;
}

export type UserActionTypes =
  | FetchUserByIdFailedActionType
  | FetchUserByIdSuccessActionType
  | FetchUserByIdRequestActionType
  | AddUserToTeamFailedActionType
  | AddUserToTeamSuccessActionType
  | FetchAllUsersFailedActionType
  | FetchAllUsersSuccessActionType
  | FetchAllUsersRequestActionType;
