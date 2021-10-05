import config from "./serverConfig.js";
const BACKEND_BASE_URl_HOME = config.api_url_home;
const BACKEND_BASE_URl_OFFICE = config.api_url_office;

const BACKEND_API = {
  BASE_API_URL_HOME: `${BACKEND_BASE_URl_HOME}`,
  BASE_API_URL_OFFICE: `${BACKEND_BASE_URl_OFFICE}`,
  LOGIN: "/login",
  REGISTER: "/register"
};

export default BACKEND_API;
