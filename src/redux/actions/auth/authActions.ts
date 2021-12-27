import { AxiosResponse } from "axios";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import client from "../../../api/clients/authClinet";
import {
  AuthResponse,
  EmailConfirmationRequest,
  ForgotPasswordRequest,
  LoginRequest,
  RefreshTokenRequest,
  RegistrationRequest,
  ResendEmailConfirmationRequest,
  ResetPasswordRequest,
  RevokeTokenRequest
} from "../../../types/auth/auth";
import {
  EmailConfirmationFailedActionType,
  EmailConfirmationSuccessActionType,
  ForgotPasswordFailedActionType,
  ForgotPasswordSuccessActionType,
  LoginRequestFailedActionType,
  LoginRequestSuccessActionType,
  RefreshTokenFailedActionType,
  RefreshTokenSuccessActionType,
  RegistrationFailedActionType,
  RegistrationSuccessActionType,
  ResendVerificationEmailFailedActionType,
  ResendVerificationEmailSuccessActionType,
  ResetPasswordFailedActionType,
  ResetPasswordSuccessActionType,
  RevokeTokenFailedActionType,
  RevokeTokenSuccessActionType
} from "../../../types/auth/authActions";
import { RemoveAccessToken, RemoveRefreshToken } from "../../../utils/jwtUtils";
import { ThunkResult } from "../issuesActions";
//login request
export const loginRequest =
  (request: LoginRequest): ThunkResult<void> =>
  async (dispatch: Dispatch<AnyAction>) => {
    console.log(JSON.stringify(request));
    try {
      const response: AxiosResponse<AuthResponse> = await client.post(
        "/auth/token",
        request
      );
      handleLoginSuccess(dispatch, response.data);
    } catch (e) {
      handleLoginFail(dispatch);
    }
  };

export const handleLoginSuccess = (
  dispatch: Dispatch<LoginRequestSuccessActionType>,
  response: AuthResponse
) => {
  dispatch({
    type: "FETCH_SUCCESS_CREATE_TOKEN",
    payload: response,
  });
};

export const handleLoginFail = (
  dispatch: Dispatch<LoginRequestFailedActionType>
) => {
  dispatch({
    type: "FETCH_FAILURE_CREATE_TOKEN",
  });
};

//forgot password
export const forgotPassword =
  (request: ForgotPasswordRequest): ThunkResult<void> =>
  async (dispatch) => {
    try {
      const response: AxiosResponse<AuthResponse> = await client.post(
        "/auth/forgot-password",
        request
      );
      handleForgotSuccess(dispatch, response.data);
    } catch (e) {
      handleForgotFail(dispatch);
    }
  };

export const handleForgotSuccess = (
  dispatch: Dispatch<ForgotPasswordSuccessActionType>,
  response: AuthResponse
) => {
  dispatch({
    type: "FETCH_SUCCESS_FORGOT_PASSWORD",
    payload: response,
  });
};

export const handleForgotFail = (
  dispatch: Dispatch<ForgotPasswordFailedActionType>
) => {
  dispatch({
    type: "FETCH_FAILURE_FORGOT_PASSWORD",
  });
};

///refresh token
export const refreshToken =
  (request: RefreshTokenRequest): ThunkResult<void> =>
  async (dispatch: Dispatch<AnyAction>) => {
    try {
      console.log("start refresh");
      const response: AxiosResponse<AuthResponse> = await client.post(
        "/auth/refresh",
        request
      );
      handleRefreshTokenSuccess(dispatch, response.data);
    } catch (e) {
      handleRefreshTokenFail(dispatch);
    }
  };

export const handleRefreshTokenSuccess = (
  dispatch: Dispatch<RefreshTokenSuccessActionType>,
  response: AuthResponse
) => {
  if (response.refreshToken) {
    localStorage.removeItem("REFRESH_TOKEN");
    localStorage.setItem(
      "REFRESH_TOKEN",
      JSON.stringify(response.refreshToken)
    );
  }
  dispatch({
    type: "FETCH_SUCCESS_REFRESH_TOKEN",
    payload: response,
  });
};

export const handleRefreshTokenFail = (
  dispatch: Dispatch<RefreshTokenFailedActionType>
) => {
  dispatch({
    type: "FETCH_FAILURE_REFRESH_TOKEN",
  });
};

//registration
export const registration =
  (request: RegistrationRequest): ThunkResult<void> =>
  async (dispatch: Dispatch<AnyAction>) => {
    try {
      console.log(JSON.stringify(request));
      const response: AxiosResponse<AuthResponse> = await client.post(
        "/auth/register",
        request
      );
      console.log(JSON.stringify(request));
      handleRegistrationSuccess(dispatch, response.data);
    } catch (e) {
      handleRegistrationFail(dispatch);
    }
  };

export const handleRegistrationSuccess = (
  dispatch: Dispatch<RegistrationSuccessActionType>,
  response: AuthResponse
) => {
  console.log(JSON.stringify(response));
  dispatch({
    type: "FETCH_SUCCESS_REGISTER",
    payload: response,
  });
};

export const handleRegistrationFail = (
  dispatch: Dispatch<RegistrationFailedActionType>
) => {
  console.log(JSON.stringify("FAIL"));
  dispatch({
    type: "FETCH_FAILURE_REGISTER",
  });
};

//resend verification email
export const resendVerificationEmail =
  (request: ResendEmailConfirmationRequest): ThunkResult<void> =>
  async (dispatch) => {
    try {
      const response: AxiosResponse<AuthResponse> = await client.post(
        "/auth/resend-email-verification-code",
        request
      );
      handleResendVerificationSuccess(dispatch, response.data);
    } catch (e) {
      handleResendVerificationFail(dispatch);
    }
  };

export const handleResendVerificationSuccess = (
  dispatch: Dispatch<ResendVerificationEmailSuccessActionType>,
  response: AuthResponse
) => {
  dispatch({
    type: "FETCH_SUCCESS_RESEND_VERIFICATION_EMAIL",
    payload: response,
  });
};

export const handleResendVerificationFail = (
  dispatch: Dispatch<ResendVerificationEmailFailedActionType>
) => {
  dispatch({
    type: "FETCH_FAILURE_RESEND_VERIFICATION_EMAIL",
  });
};

//reset password
export const resetPassword =
  (request: ResetPasswordRequest): ThunkResult<void> =>
  async (dispatch) => {
    try {
      const response: AxiosResponse<AuthResponse> = await client.post(
        "/auth/reset-password",
        request
      );
      handleResetPasswordSuccess(dispatch, response.data);
    } catch (e) {
      handleResetPasswordFail(dispatch);
    }
  };

export const handleResetPasswordSuccess = (
  dispatch: Dispatch<ResetPasswordSuccessActionType>,
  response: AuthResponse
) => {
  dispatch({
    type: "FETCH_SUCCESS_RESET_PASSWORD",
    payload: response,
  });
};

export const handleResetPasswordFail = (
  dispatch: Dispatch<ResetPasswordFailedActionType>
) => {
  dispatch({
    type: "FETCH_FAILURE_RESET_PASSWORD",
  });
};

//revoke token
export const revokeToken =
  (request: RevokeTokenRequest): ThunkResult<void> =>
  async (dispatch) => {
    try {
      const response: AxiosResponse<AuthResponse> = await client.post(
        "/auth/revoke-token",
        request
      );
      handleRevokeTokenSuccess(dispatch, response.data);
    } catch (e) {
      handleRevokeTokenFail(dispatch);
    }
  };

export const handleRevokeTokenSuccess = (
  dispatch: Dispatch<RevokeTokenSuccessActionType>,
  response: AuthResponse
) => {
  if (response.token) {
    RemoveAccessToken();
  }
  if (response.refreshToken) {
    RemoveRefreshToken();
  }
  dispatch({
    type: "FETCH_SUCCESS_REVOKE_TOKEN",
    payload: response,
  });
};

export const handleRevokeTokenFail = (
  dispatch: Dispatch<RevokeTokenFailedActionType>
) => {
  dispatch({
    type: "FETCH_FAILURE_REVOKE_TOKEN",
  });
};

//confirm email
export const confirmEmail =
  (request: EmailConfirmationRequest): ThunkResult<void> =>
  async (dispatch) => {
    try {
      const response: AxiosResponse<AuthResponse> = await client.post(
        "auth/confirm-email",
        request
      );
      handleСonfirmEmailSuccess(dispatch, response.data);
    } catch (e) {
      handleСonfirmEmailFail(dispatch);
    }
  };

export const handleСonfirmEmailSuccess = (
  dispatch: Dispatch<EmailConfirmationSuccessActionType>,
  response: AuthResponse
) => {
  console.log("confirm email");
  dispatch({
    type: "FETCH_SUCCESS_CONFIRM_EMAIL",
    payload: response,
  });
};

export const handleСonfirmEmailFail = (
  dispatch: Dispatch<EmailConfirmationFailedActionType>
) => {
  console.log("confirm fail");
  dispatch({
    type: "FETCH_FAILURE_CONFIRM_EMAIL",
  });
};
