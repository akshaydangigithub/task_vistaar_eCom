import axios from "axios";

export const BaseURL = "http://localhost:8080/";

const instance = axios.create({
  baseURL: BaseURL,
  withCredentials: true,
});

export default instance;
