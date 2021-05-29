import axios from "axios";
import { RemoveAccessToken, RemoveRefreshToken } from "../../utils/jwtUtils";
import { Redirect } from "react-router-dom";
// "http://timetrackinglilo.australiasoutheast.cloudapp.azure.com:50052/api"
//
const client = axios.create({
  baseURL: "http://localhost:57732/api",
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

/*axious.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const access_token = localStorage.getItem("ACESS_TOKEN") ?? "";
      const refreshTokenValue =
              localStorage.getItem("REFRESH_TOKEN") ?? "";
      const request: RefreshTokenRequest = {
        refreshToken: refreshTokenValue,
      };
      const accessTokenResponse = await axios.post(
        "http://localhost:43396/api/auth/refresh",
        request
      );
      axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
      return axiosApiInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);
*/
/*client.interceptors.response.use(
  (response, dispatch: Dispatch<any>) => {
    console.log("response:", response);
    return response;
  },
  async function (error, dispatch: Dispatch<any>) {
    console.log("erorr:", error.response.status);
    console.log("erorrConfig:", error.confi);
    const originalRequest = error.config;
    if (error.response.status === 401) {
      console.log("401");
      const access_token = localStorage.getItem("ACESS_TOKEN") ?? "";
      console.log("Refreshtoken:", access_token);
      const refreshTokenValue = localStorage.getItem("REFRESH_TOKEN") ?? "";
      console.log("Refreshtoken:", refreshTokenValue);
      const request: RefreshTokenRequest = {
        refreshToken: refreshTokenValue,
      };
      
  axios
    .post("/auth/refresh", request)
    .then((response) => {
      if (response.refreshToken) {
        localStorage.removeItem("REFRESH_TOKEN");
        localStorage.setItem(
          "REFRESH_TOKEN",
          JSON.stringify(response.refreshToken)
        );
         axios.defaults.headers.common["Authorization"] =
           "Bearer " + access_token;
      }
    })
    .catch((err) => {
      console.log(err);
    });
     
      return client(originalRequest);
    }
    return Promise.reject(error);
  }
);*/
export default client;
