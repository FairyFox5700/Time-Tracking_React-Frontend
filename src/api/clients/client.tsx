import axios from "axios";
import { RemoveAccessToken, RemoveRefreshToken } from "../../utils/jwtUtils";
import { Redirect } from "react-router-dom";
import {apiUrls} from "./config"

const client = axios.create({
  baseURL:
    apiUrls.timeTrackingApi,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
});

//localhost:57732/api/project/create
// Request interceptor for API calls
client.interceptors.request.use(
  async (config) => {
    const value = localStorage.getItem("ACESS_TOKEN") ?? "";
    const keys = JSON.parse(value);
    config.headers = {
      Authorization: `Bearer ${keys}`,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

client.interceptors.response.use(
  function (response) {
    console.log("response", response);
    // Do something with response data
    return response;
  },
  function (error) {
    console.log("response", error.response.status);
    // Do something with response error
    if (error.response.status === 403) {
      RemoveRefreshToken();
      RemoveAccessToken();
      console.log("response", error.response.status);
      return <Redirect to="/403" />;
    }

    // Trow errr again (may be need for some other catch)
    return Promise.reject(error);
  }
);
export default client;
