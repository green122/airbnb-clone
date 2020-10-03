import axios, { AxiosInstance } from "axios";
import cookie from "js-cookie";
import { refreshRoute } from "../constants/apiRoutes";
// import config from 'config';
// import { defaultAxiosTimeOut } from '../constants/constants';

let axiosClient: AxiosInstance;
let token: string;

export function setJwtToken(accessToken: string, refreshToken?: string) {
  token = accessToken;
  cookie.set('x-access-token', accessToken);
  if (refreshToken) {
    localStorage.setItem("refresh-token", refreshToken);
  }
}

export async function requestRefreshToken(client: AxiosInstance) {
  const refreshToken = localStorage.getItem("refresh-token");
  if (!refreshToken) {
    throw Error("unauthorised");
  }
  const result = await client.post(refreshRoute, { refreshToken });
  setJwtToken(result.data.accessToken, result.data.refreshToken);
}

export function apiClient() {
  if (axiosClient) {
    return axiosClient;
  }
  const instance = axios.create();

  instance.interceptors.request.use(
    (conf) => {
      if (token) {
        conf.headers["x-access-token"] = token;
      }

      return conf;
    },
    (error) => {
      if (error.status === 401 && error.message === "token expired") {
        console.log(error);
        // const result = await requestRefreshToken(instance);
        // console.log(result);
      }
      Promise.reject(error);
    }
  );

  instance.interceptors.response.use(undefined, async (error) => {
    if (
      error.response.status === 401 &&
      error.response.data.message === "token expired"
    ) {
      await requestRefreshToken(instance);
      return instance(error.response.config);
    }
    return Promise.reject(error);
  });
  axiosClient = instance;
  return instance;
}
