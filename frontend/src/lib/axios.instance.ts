
import axios from "axios";
import Cookies from "js-cookie";

const $axios = axios.create({
  baseURL:"http://localhost:4005", 

  // baseURL:"https://dhanashree-realstate.onrender.com/api", 
});

// Add a request interceptor
$axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  console.log("i reachered here")
  const accessToken=Cookies.get("accessToken")
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  // config.headers.Accept = "application/json";
  // config.headers["Content-Type"] = "multipart/form-data";
  console.log(`🔗 Final URL: ${config.baseURL}${config.url}`);
  console.log(`📜 Headers:`, config.headers)
  console.log("📦 Params:", config.params); // <-- This logs your page/size

  return config;
});

export default $axios;  