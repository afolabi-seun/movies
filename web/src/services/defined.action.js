/**
 * @author Gedeon NdundeCode
 * @date 08/12/2021
 */
import Auth, { apis as api, headerOptions as options } from "./api.action";
import Notiflix from "notiflix";
import { cnt } from "./constant.action";
// import history from "../history";
import appLabel from "../config/appLabel";

/** BM (Block Of Methods) */
export const BOM = {
  FetchReqAction: async (body, apiUrl, callback) => {
    const headers = { ...options.headers, apisessionkey : body.token };
    try {
      const res = await Auth.post(apiUrl, body, { headers });

      const response = res.data.data;
      const status = response.status;

      switch (status.toLowerCase()) {
        case "ok":
          BOM.LoadTimeout();

          callback(null, response);
          break;
        case "forbidden":
          callback(response.message, null);
          // history.push("/sign-in");
          break;
        // case "bad_request":
        //   BOM.AlertMsg(
        //     cnt.DANGER,
        //     "Une mauvaise requête s'est produite. Veuillez contacter le support de l'équipe de développement du système!"
        //   );
        //   break;
        default:
          if (response.message.toLowerCase() === "invalid token") {
            // history.push("/sign-in");
          }
          callback(response.message, null);
          break;
      }
    } catch (error) {
      console.log("error: ", error);
      callback("Something went wrong with your request.", null);
    }
  },
  FetchReqAcWithReload: async (body, apiUrl, callback) => {
    const headers = { ...options.headers, apisessionkey : body.token };
    
    try {
      const res = await Auth.post(apiUrl, body, { headers });

      const response = res.data.data;
      const status = response.status;

      switch (status.toLowerCase()) {
        case "ok":
          Notiflix.Report.success(cnt.SUCCESS, response.message, "OK", () => {
            BOM.ReloadComponent();
          });

          callback(null, response);
          break;
        case "forbidden":
          callback(response.message, null);
          // history.push("/sign-in");
          break;
        // case "bad_request":
        //   BOM.AlertMsg(
        //     cnt.DANGER,
        //     "Une mauvaise requête s'est produite. Veuillez contacter le support de l'équipe de développement du système!"
        //   );
        //   break;
        default:
          if (response.message.toLowerCase() === "invalid token") {
            // history.push("/sign-in");
          }
          callback(response.message, null);
          break;
      }
    } catch (error) {
      console.log("error: ", error);
      callback("Something went wrong with your request.", null);
    }
  },
  SendReqAction: async (body, apiUrl, redirectUrl) => {
    const headers = { ...options.headers, apisessionkey : body.token };

    try {
      const res = await Auth.post(apiUrl, body, { headers });

      const response = res.data;
      switch (response.status.toLowerCase()) {
        case "ok":
          BOM.AlertMsg(cnt.SUCCESS, response.message);
          // history.push(redirectUrl);
          break;
        case "bad request":
          BOM.AlertMsg(
            cnt.DANGER,
            "A bad request occured. Please contact the dev support!"
          );
          break;
        case "failed":
          BOM.AlertMsg(cnt.WARNING, response.message);
          break;
        default:
          BOM.AlertMsg(cnt.WARNING, response.message);
          break;
      }
    } catch (error) {
      console.log("error: ", error);
      BOM.AlertMsg(cnt.DANGER, "Something went wrong with your request.");
    }
  },
  SendReqActWithReload: async (body, apiUrl) => {
    const headers = { ...options.headers, apisessionkey : body.token };

    try {
      const res = await Auth.post(apiUrl, body, { headers });

      const response = res.data;
      switch (response.status.toLowerCase()) {
        case "ok":
          Notiflix.Report.success(cnt.SUCCESS, response.message, "OK", () => {
            BOM.ReloadComponent();
          });
          break;
        case "bad request":
          BOM.AlertMsg(
            cnt.DANGER,
            "A bad request occured. Please contact the dev support!"
          );
          break;
        case "failed":
          BOM.AlertMsg(cnt.WARNING, response.message);
          break;
        default:
          BOM.AlertMsg(cnt.WARNING, response.message);
          break;
      }
    } catch (error) {
      console.log("error: ", error);
      BOM.AlertMsg(cnt.DANGER, "Something went wrong with your request.");
    }
  },
  SendPOReqAction: async (body, apiUrl, body2, apiUrl2, redirectUrl) => {
    const headers = { ...options.headers, apisessionkey : body.token };

    body.channel = "self service";
    body2.channel = "self service";

    try {
      const res = await Auth.post(apiUrl, body, { headers });

      const response = res.data.data;
      switch (response.status.toLowerCase()) {
        case "ok":
          body2.orderId = response.orderId;

          const res2 = await Auth.post(apiUrl2, body2, { headers });
          const response2 = res2.data.data;
          switch (response2.status.toLowerCase()) {
            case "ok":
              BOM.AlertMsg(cnt.SUCCESS, response.message);
              // history.push(redirectUrl);
              break;
            case "bad request":
              BOM.AlertMsg(
                cnt.DANGER,
                "A bad request occured. Please contact the dev support!"
              );
              break;
            case "failed":
              BOM.AlertMsg(cnt.DANGER, response2.message);
              break;
            default:
              BOM.AlertMsg(
                cnt.DANGER,
                "Something went wrong with your request."
              );
              break;
          }

          break;
        case "bad request":
          BOM.AlertMsg(
            cnt.DANGER,
            "A bad request occured. Please contact the dev support!"
          );
          break;
        case "failed":
          BOM.AlertMsg(cnt.DANGER, response.message);
          break;
        default:
          BOM.AlertMsg(cnt.DANGER, "Something went wrong with your request.");
          break;
      }
    } catch (error) {
      console.log("error: ", error);
      BOM.AlertMsg(cnt.DANGER, "Something went wrong with your request.");
    }
  },
  SessionLessReqAction: async (body, apiUrl, callback) => {
    const headers = { ...options.headers };
    // LoadAlert(cnt.LOAD, "Processing");

    try {
      const res = await Auth.post(apiUrl, body, { headers });

      const response = res.data;
      const status = res.data.status;

      // console.log(status);

      switch (status.toLowerCase()) {
        case "ok":
          BOM.LoadTimeout();
          callback(null, response);
          break;
        case "forbidden":
          callback(response.message, null);
          // history.push("/sign-in");
          break;
        default:
          callback(response.message, null);
          break;
      }
    } catch (error) {
      console.log("error: ", error);
      callback("Failed to load response data.", null);
    }
  },
  AlertMsg: (type, message) => {
    Notiflix.Loading.remove();
    try {
      switch (type) {
        case cnt.WARNING:
          return Notiflix.Report.warning("WARNING", message, "OK");
        case cnt.SUCCESS:
          return Notiflix.Report.success("SUCCESS", message, "OK");
        case cnt.DANGER:
          return Notiflix.Report.failure("ERROR", message, "OK");
        case cnt.INFO:
          return Notiflix.Report.info("INFO", message, "OK");
        case cnt.COPIED:
          return Notiflix.Report.success("COPIED", message, "OK");
        default:
          return Notiflix.Report.warning("WARNING", message, "OK");
      }
    } catch (error) {
      console.log("error wow: ", error);
    }
  },
  NotifyMsg: (type, message) => {
    Notiflix.Loading.remove();
    try {
      switch (type) {
        case cnt.WARNING:
          return Notiflix.Notify.warning(message);
        case cnt.SUCCESS:
          return Notiflix.Notify.success(message);
        case cnt.DANGER:
          return  Notiflix.Notify.failure(message);
        case cnt.INFO:
          return  Notiflix.Notify.info(message);
        default:
          return Notiflix.Notify.warning(message);
      }
    } catch (error) {
      console.log("error wow: ", error);
    }
  },
  LoadAlert: (type, message) => {
    try {
      switch (type.toLowerCase()) {
        case cnt.PROCESS:
          return Notiflix.Loading.pulse(message + "...");
        case cnt.LOAD:
          return Notiflix.Loading.pulse(message + "...");
        default:
          return Notiflix.Loading.pulse(message + "...");
      }
    } catch (error) {
      console.log("error on loadingAlert func: ", error);
    }
  },
  GetBrowserName: () => {
    if (
      (navigator.userAgent.indexOf("Opera") ||
        navigator.userAgent.indexOf("OPR")) !== -1
    ) {
      return "Opera";
    } else if (navigator.userAgent.indexOf("Chrome") !== -1) {
      return "Chrome";
    } else if (navigator.userAgent.indexOf("Safari") !== -1) {
      return "Safari";
    } else if (navigator.userAgent.indexOf("Firefox") !== -1) {
      return "Firefox";
    } else if (
      navigator.userAgent.indexOf("MSIE") !== -1 ||
      !document.documentMode == true
    ) {
      return "Internet Explorer";
    } else {
      return "Not sure!";
    }
  },
  GenerateTimestamp: () => {
    // get uniq time for a document sent;
    var now = new Date();
    var timestamp = now.getFullYear().toString();
    timestamp += (now.getMonth() + 1).toString();
    timestamp += now.getDate().toString() + "";
    timestamp += now.getHours().toString();
    timestamp += now.getMinutes().toString();
    timestamp += now.getSeconds().toString();
    timestamp += now.getMilliseconds().toString();
    return timestamp;
  },
  GetUnique: (arr, comp) => {
    // store the comparison  values in array
    const unique = arr
      .map((e) => e[comp])

      // store the indexes of the unique objects
      .map((e, i, final) => final.lastIndexOf(e) === i && i)

      // eliminate the false indexes & return unique objects
      .filter((e) => arr[e])
      .map((e) => arr[e]);

    return unique;
  },
  GetWindowData: (key, option = "") => {
    switch (key.toLowerCase()) {
      case "origin":
        return window.location.origin + option;
      case "host":
        return window.location.host;
      case "hostname":
        return window.location.hostname;
      case "href":
        return window.location.href;
      case "pathname":
        return window.location.pathname;
      case "port":
        return window.location.port;
      case "protocol":
        return window.location.protocol;
      default:
        return window.location.origin;
    }
  },
  Uwfirst: (str) => {
    return str.toLowerCase().replace(/^\w|\s\w/g, function (letter) {
      return letter.toUpperCase();
    });
  },
  GlobalApproveRejectAction: (
    body,
    reqUrl,
    redirectUrl,
    label = null,
    action
  ) => {
    // return async () => {

    // confirm
    Notiflix.Confirm.show(
      "Are you sure ?",
      action + label,

      "Yes",
      "No",
      function () {
        // Yes
        BOM.LoadAlert(cnt.LOAD, "Processing");
        BOM.SendReqAction(body, reqUrl, redirectUrl);
      },
      function () {
        // No button
      }
    );
    // };
  },
  SendReqWithConfirm: (body, reqUrl, action, label = "") => {
    // return async () => {

    // confirm
    Notiflix.Confirm.show(
      "Are you sure ?",
      action + label,

      "Yes",
      "No",
      function () {
        // Yes
        // BOM.LoadAlert(cnt.LOAD, "Processing");
        BOM.SendReqActWithReload(body, reqUrl);
      },
      function () {
        // No button
      }
    );
    // };
  },
  LoadTimeout: () => {
    Notiflix.Loading.remove();
  },
  SystemTimeout: (param) => {
    return setTimeout(() => {
      BOM.LoadTimeout();
      console.log(`timeout occured on: ${param.toUpperCase()} request API`);
      Notiflix.Report.warning(
        "WARNING",
        "The server encountered something unexpected that didn't allow it to complete the request. We apologize.",
        "OK"
      );
    }, 60000);
  },
  CurrentDate: () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    return (yyyy + "-" + mm + "-" + dd).toString();
  },
  handleFileRead: async (event, setState_param) => {
    const file = event.target.files[0];
    if (!file) {
      // if file is empty
      setState_param("");
      return;
    }

    const base64 = await BOM.convertBase64(file);
    let strB64 = base64.split("base64,")[1]; //.replace(/^data:image\/[a-z]+;base64,/, "");
    setState_param(strB64);
    // console.log(strB64);
  },
  convertBase64: (file) => {
    if (!file) {
      return;
    }
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  },
  DownloadAction: (base64File, fileName) => {
    fileName = BOM.ReplaceSpace(fileName, "_");
    let fileType = BOM.DetectMimeType(base64File);

    const source = "data:" + fileType + ";base64," + base64File;

    const downloadLink = document.createElement("a");

    downloadLink.href = source;
    downloadLink.download = fileName.replace(/ /g, ""); // rename your file
    downloadLink.click();
  },
  DetectMimeType: (b64) => {
    let signatures = {
      JVBERi0: "application/pdf",
      iVBORw0KGgo: "image/png",
      "/9j/4AAQSkZJRgABAQ": "image/jpeg",
    };
    for (var s in signatures) {
      if (b64.indexOf(s) === 0) {
        return signatures[s];
      }
    }
  },
  ReplaceSpace: (str, character) => {
    return str.replace(/ /g, character);
  },
  ReformatDate: (dateParam) => {
    dateParam = new Date(dateParam);
    let dd = dateParam.getDate();
    let mm = dateParam.getMonth() + 1;
    let yyyy = dateParam.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    return (yyyy + "-" + mm + "-" + dd).toString();
  },
  NumberGenerator: (startIndex = 0, length = 10) => {
    let arrData = [];
    for (let index = startIndex; index <= length; index++) {
      arrData.push(index);
    }

    return arrData;
  },
  RemoveItem: (index, state_param, setState_param) => {
    setState_param([
      ...state_param.slice(0, index),
      ...state_param.slice(index + 1),
    ]);
  },
  PrepareConfigData: (roleParam, coIdParam, coIdConfigParam) => {
    let coId = coIdParam;
    switch (roleParam.toLowerCase()) {
      case "sys":
        return (coId = coIdConfigParam);
      default:
        return coId;
    }
  },
  BackButton: () => {
    window.history.back();
  },
  ReloadComponent: () => {
    window.location.reload(false);
  },
  
  RedirectListObj:{
    title: appLabel.authorized,
    otherTitle: "",
    color: "warning",
    icon: "tag",
    criteria: "ACTIVATED",
  },
  SetItem:(itemKey, itemData)=>{
    return localStorage.setItem(itemKey, itemData)
  },
  GetItem:(itemKey)=>{
    return JSON.parse(localStorage.getItem(itemKey))
  }
};


/** initialise notiflix pop up */
export const notifInitialization = () => {
  Notiflix.Confirm.init({
    className: "notiflix-confirm",
    width: "300px",
    zindex: 4003,
    position: "center",
    distance: "10px",
    backgroundColor: "#f8f8f8",
    borderRadius: "25px",
    backOverlay: true,
    backOverlayColor: "rgba(0,0,0,0.5)",
    rtl: false,
    fontFamily: "Quicksand",
    cssAnimation: true,
    cssAnimationDuration: 300,
    cssAnimationStyle: "fade",
    plainText: true,
    titleColor: "#EC4E4F",
    titleFontSize: "16px",
    titleMaxLength: 34,
    messageColor: "#1e1e1e",
    messageFontSize: "14px",
    messageMaxLength: 200,
    buttonsFontSize: "15px",
    buttonsMaxLength: 34,
    okButtonColor: "#f8f8f8",
    okButtonBackground: "#EC4E4F",
    cancelButtonColor: "#f8f8f8",
    cancelButtonBackground: "#a9a9a9",
  });
};
