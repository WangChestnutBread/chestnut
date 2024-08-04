import axios from "axios";
import useAuthStore from "../stores/authStore";

const accessToken = useAuthStore.getState().accessToken;

const baseApi = axios.create({
  baseURL: "https://i11d107.p.ssafy.io/chestnutApi",
  headers: { access: accessToken },
});

export default baseApi;
