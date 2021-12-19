import { Reducer } from "redux";
import jwt from "jwt-decode";
export const getExpirationDate = (jwtToken?: string): number | null => {
  if (!jwtToken) {
    return null;
  }
  const jwt = JSON.parse(atob(jwtToken.split(".")[1]));
  // multiply by 1000 to convert seconds into milliseconds
  return (jwt && jwt.exp && jwt.exp * 1000) || null;
};

export const getUserId = (): string | null => {
  const accessToken = localStorage.getItem("ACESS_TOKEN");
  if (accessToken) {
    const jwt = JSON.parse(atob(accessToken.split(".")[1]));
    console.log(jwt.id.toString());
    return jwt.id.toString();
  }
  return null;
};

export const isExpired = (exp?: number) => {
  if (!exp) {
    return false;
  }
  return Date.now() > exp;
};

export const SetAccessToken = (token: string) => {
  localStorage.setItem("ACESS_TOKEN", JSON.stringify(token));
};

export const RemoveAccessToken = () => {
  localStorage.removeItem("ACESS_TOKEN");
};

export const SetRefreshToken = (refreshToken: string) => {
  localStorage.setItem("REFRESH_TOKEN", JSON.stringify(refreshToken));
};

export const RemoveRefreshToken = () => {
  localStorage.removeItem("REFRESH_TOKEN");
};

export const resetBoardTypeToSettings = (boardType: string) => {
  localStorage.removeItem("BOARD_TYPE");
  localStorage.setItem("BOARD_TYPE", boardType);
};

export const getBoardType = () :string=> {
  console.log("boardType", localStorage.getItem("BOARD_TYPE"));
  return localStorage.getItem("BOARD_TYPE")??"";
};

export const isUserLoggedIn = () => {
  console.log("isloggedIn", localStorage.getItem("ACESS_TOKEN") != null);
  return localStorage.getItem("ACESS_TOKEN") != null;
};

const isUserInRole = (role: string): boolean => {
  const accessToken = localStorage.getItem("ACESS_TOKEN");
  if (accessToken) {
    const jwt = JSON.parse(atob(accessToken.split(".")[1]));
    console.log(jwt.roles.toString());
    if (Array.isArray(jwt.roles)) {
      return jwt.role.includes(role);
    } else {
      return jwt.roles === role;
    }
  }
  return false;
};

export const isUserEngineer = (): boolean => {
  return isUserInRole("Engineer");
};

export const isUserTeamLead = (): boolean => {
  return isUserInRole("TeamLead");
};

export const isUserProjectManager = (): boolean => {
  return isUserInRole("ProjectManager");
};
