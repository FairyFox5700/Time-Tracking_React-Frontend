import axios from "axios";
import logout from "../../pages/auth/logout";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  setupInterceptors: (store: any, history: any) => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          console.log("401");
        }

        if (error.response.status === 404) {
          console.log("not found");
          history.push("/not-found");
        }

        return Promise.reject(error);
      }
    );
  },
};


export const apiUrls = {
  timeTrackingApi: "http://localhost:57732/api",
  identityUrl: "http://localhost:43396",
  reportGenerationApi: "http://localhost:44593/api"
};

