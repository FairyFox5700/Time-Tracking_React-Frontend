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

import { AuthResponse } from "./auth";

import { API_ACTIONS } from "../../redux/actions/apiActions";

export interface LoginRequestSuccessActionType {
  type: `${API_ACTIONS.FETCH_SUCCESS}${typeof CREATE_TOKEN}`;
  payload?: AuthResponse;
}

export interface LoginRequestFailedActionType {
  type: `${API_ACTIONS.FETCH_FAILURE}${typeof CREATE_TOKEN}`;
}

export interface ForgotPasswordSuccessActionType {
  type: `${API_ACTIONS.FETCH_SUCCESS}${typeof FORGOT_PASSWORD}`;
  payload: AuthResponse;
}

export interface ForgotPasswordFailedActionType {
  type: `${API_ACTIONS.FETCH_FAILURE}${typeof FORGOT_PASSWORD}`;
}

export interface RevokeTokenSuccessActionType {
  type: `${API_ACTIONS.FETCH_SUCCESS}${typeof REVOKE_TOKEN}`;
  payload?: AuthResponse;
}

export interface RevokeTokenFailedActionType {
  type: `${API_ACTIONS.FETCH_FAILURE}${typeof REVOKE_TOKEN}`;
}

export interface RegistrationSuccessActionType {
  type: `${API_ACTIONS.FETCH_SUCCESS}${typeof REGISTER}`;
  payload?: AuthResponse;
}

export interface RegistrationFailedActionType {
  type: `${API_ACTIONS.FETCH_FAILURE}${typeof REGISTER}`;
}

export interface RefreshTokenSuccessActionType {
  type: `${API_ACTIONS.FETCH_SUCCESS}${typeof REFRESH_TOKEN}`;
  payload?: AuthResponse;
}

export interface RefreshTokenFailedActionType {
  type: `${API_ACTIONS.FETCH_FAILURE}${typeof REFRESH_TOKEN}`;
}

export interface ResetPasswordSuccessActionType {
  type: `${API_ACTIONS.FETCH_SUCCESS}${typeof RESET_PASSWORD}`;
  payload?: AuthResponse;
}

export interface ResetPasswordFailedActionType {
  type: `${API_ACTIONS.FETCH_FAILURE}${typeof RESET_PASSWORD}`;
}

export interface EmailConfirmationSuccessActionType {
  type: `${API_ACTIONS.FETCH_SUCCESS}${typeof CONFIRM_EMAIL}`;
  payload?: AuthResponse;
}

export interface EmailConfirmationFailedActionType {
  type: `${API_ACTIONS.FETCH_FAILURE}${typeof CONFIRM_EMAIL}`;
}

export interface ResendVerificationEmailSuccessActionType {
  type: `${API_ACTIONS.FETCH_SUCCESS}${typeof RESEND_VERIFICATION_EMAIL}`;
  payload?: AuthResponse;
}

export interface ResendVerificationEmailFailedActionType {
  type: `${API_ACTIONS.FETCH_FAILURE}${typeof RESEND_VERIFICATION_EMAIL}`;
}
