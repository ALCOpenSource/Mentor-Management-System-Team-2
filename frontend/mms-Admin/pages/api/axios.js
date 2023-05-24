import axios from "axios";
import http from "../../services/axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const apiService = (url, method, data) => {
  return new Promise((resolve, reject) => {
    http({
      url,
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.log(error);
        if (error?.message === "Network Error") {
          reject(error.message);
        }
        reject(error.message);
      });
  });
};

export default instance;
