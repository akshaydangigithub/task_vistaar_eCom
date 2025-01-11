import axios from "axios";

// export const BaseURL = "http://localhost:8080/";
export const BaseURL = "https://task-vistaar-e-com-backend.vercel.app/";

const instance = axios.create({
  baseURL: BaseURL,
  withCredentials: true,
});

export default instance;
