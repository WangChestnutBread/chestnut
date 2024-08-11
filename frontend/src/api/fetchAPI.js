import axios from "axios";
import useAuthStore from "../stores/authStore";


const baseApi = axios.create({
  baseURL: "https://i11d107.p.ssafy.io/chestnutApi",
});

baseApi.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers['access'] = accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default baseApi;
