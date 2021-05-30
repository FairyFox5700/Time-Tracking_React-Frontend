import axios from "axios";
let axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
};

//
//http://localhost:43396/api"
const apiUrl =
  "http://timetrackinglilo.australiasoutheast.cloudapp.azure.com:50054/api";
const authClient = axios.create({
  baseURL: apiUrl,
  headers: axiosConfig,
});

/*authClient.interceptors.request.use(
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
);*/

/*axios.interceptors.response.use(function (response) {
        // Do something with response data
        return response;
      }, function (error) {
        // Do something with response error
        if(error.response.status === 403) { that.handle403() }

        // Trow errr again (may be need for some other catch)
        return Promise.reject(error);
    });

  }

  handle403(){
    this.props.history.push('/login');
  }*/
export default authClient;
