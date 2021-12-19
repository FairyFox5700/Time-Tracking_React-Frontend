import { Reducer } from "redux";
import {
  REGISTER,
  REFRESH_TOKEN,
  RESEND_VERIFICATION_EMAIL,
  RESET_PASSWORD,
  REVOKE_TOKEN,
  FORGOT_PASSWORD,
  CONFIRM_EMAIL,
  CREATE_TOKEN,
} from "../../redux/constants/auth";
import { API_ACTIONS } from "../actions/apiActions";

import { SetAccessToken, SetRefreshToken } from "../../utils/jwtUtils";
import { getErrorMessage } from "../../utils/actionErrorsUtils";

export interface AuthReducerType {
  isLogedIn: boolean | undefined;
  loading: boolean;
  error?: string;
}

const defaultState: AuthReducerType = {
  isLogedIn: undefined,
  loading: false,
  error: undefined,
};

export const authReducer: Reducer<AuthReducerType> = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case `${API_ACTIONS.FETCH_START}${REGISTER}`:
    case `${API_ACTIONS.FETCH_START}${REFRESH_TOKEN}`:
    case `${API_ACTIONS.FETCH_START}${RESEND_VERIFICATION_EMAIL}`:
    case `${API_ACTIONS.FETCH_START}${RESET_PASSWORD}`:
    case `${API_ACTIONS.FETCH_START}${REVOKE_TOKEN}`:
    case `${API_ACTIONS.FETCH_START}${FORGOT_PASSWORD}`:
    case `${API_ACTIONS.FETCH_START}${CONFIRM_EMAIL}`:
    case `${API_ACTIONS.FETCH_START}${CREATE_TOKEN}`:
      return { ...state, loading: true, error: undefined };

    case `${API_ACTIONS.FETCH_FAILURE}${REGISTER}`:
    case `${API_ACTIONS.FETCH_FAILURE}${REFRESH_TOKEN}`:
    case `${API_ACTIONS.FETCH_FAILURE}${RESEND_VERIFICATION_EMAIL}`:
    case `${API_ACTIONS.FETCH_FAILURE}${RESET_PASSWORD}`:
    case `${API_ACTIONS.FETCH_FAILURE}${REVOKE_TOKEN}`:
    case `${API_ACTIONS.FETCH_FAILURE}${FORGOT_PASSWORD}`:
    case `${API_ACTIONS.FETCH_FAILURE}${CONFIRM_EMAIL}`:
    case `${API_ACTIONS.FETCH_FAILURE}${CREATE_TOKEN}`:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case `${API_ACTIONS.FETCH_SUCCESS}${REGISTER}`:
    case `${API_ACTIONS.FETCH_SUCCESS}${REFRESH_TOKEN}`:
    case `${API_ACTIONS.FETCH_SUCCESS}${RESEND_VERIFICATION_EMAIL}`:
    case `${API_ACTIONS.FETCH_SUCCESS}${RESET_PASSWORD}`:
    case `${API_ACTIONS.FETCH_SUCCESS}${REVOKE_TOKEN}`:
    case `${API_ACTIONS.FETCH_SUCCESS}${FORGOT_PASSWORD}`:
    case `${API_ACTIONS.FETCH_SUCCESS}${CONFIRM_EMAIL}`:
      console.log("action payload", action.payload);
      return {
        ...state,
        isLogedIn: false,
        loading: false,
        error: getErrorMessage(action),
      };

    case `${API_ACTIONS.FETCH_SUCCESS}${CREATE_TOKEN}`:
      console.log("action payload", action.payload);
      if (action.payload?.message) {
        return {
          ...state,
          loading: false,
          error: action.payload.message,
        };
      } else {
        if (action.payload.token) {
          SetAccessToken(action.payload.token);
        }
        if (action.payload.refreshToken) {
          SetRefreshToken(action.payload.refreshToken);
        }
        const st = {
          ...state,
          isLogedIn: true,
          loading: false,
          error: undefined,
        };
        return st;
      }

    default:
      return state;
  }
};
