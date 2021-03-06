import axios from "axios";
import { apiUrls } from "./config";

//"http://localhost:44593/api"
//"http://timetrackinglilo.australiasoutheast.cloudapp.azure.com:50050/api"
const reportClient = axios.create({
  baseURL:
    apiUrls.reportGenerationApi,
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
