import axios from "axios";

export const initInterceptor = (logout) => {

  // Add a request interceptor
  axios.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        let token = localStorage.getItem("token");

        config.headers = { ...config.headers, "x-auth-token": token };
        if (
          config.method === "put" ||
          config.method === "post" ||
          config.method === "patch"
        ) {
          if (
            config.url.includes("video") ||
            config.url.includes("speaker")
          ) {
            config.headers["Content-Type"] = "multipart/form-data";
          } else config.headers["Content-Type"] = "application/json";
        }
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axios.interceptors.response.use(
    function(response) {
      // Do something with response data
      return response;
    },
    function (error) {
      // Do something with response error

      //401 : logout if token is invalid or expired
      if (
        error.response.status === 401
      ) {
        logout();
      }
      return Promise.reject(error);
    }
  );
};
