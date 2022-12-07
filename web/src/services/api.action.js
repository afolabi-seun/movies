import axios from "axios";
import appConfig from "../config/appConfig.json";

const { dev, prod, isProduction, apiSettings } = appConfig;

/** DEFINED METHOD */
const isProductionUrl = (key) => {
  switch (key) {
    case true:
      return prod.baseURL;
    case false:
      return dev.baseURL;
  }
};
/** LIVE SERVICE */
export default axios.create({
  baseURL: isProductionUrl(isProduction),
});

/** HEADER */
export const headerOptions = {
  headers: apiSettings.headers,
};

/** APIS CONSTANT */
export const apis = {
  
  /** AUTH */
  Login: "login",
  AuthenticateUser: "authenticateUser",
  GetUser: "getUser",
  CreateUser: "createUser",
  GetMovie: "getMovie",
  CreateMovie: "createMovie",
  GetComment: "getComment",
  CreateComment: "createComment",
};
