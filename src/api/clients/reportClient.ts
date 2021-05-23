import axios from "axios";

const reportClient = axios.create({
  baseURL: "http://localhost:44593/api",
  responseType: "arraybuffer",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
});

//localhost:57732/api/project/create
// Request interceptor for API calls
reportClient.interceptors.request.use(
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
export default reportClient;
