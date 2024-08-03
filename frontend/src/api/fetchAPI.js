import axios from "axios";

const baseApi = axios.create({
  baseURL: "https://i11d107.p.ssafy.io/chestnutApi",
});

export default baseApi;
