import http from "services/axios";
import { apiService } from "../../api/axios";
import { toast } from "react-hot-toast";

export const fetchPrograms = async () => {
  const response = await http.get("/programs");
  return response.data;
};

export const fetchProgram = async (id) => {
  try {
    const response = await apiService(`/programs/${id}`, "GET");
    return response.data;
  } catch (e) {
    toast.error("Couldn't fetch program because an error occured.", {
      toastId: "network-error-toast",
    });
  }
};

export const getUserProgram = async (id, query) => {
  const response = await http.get(`/programs/user-programs/${id}` + query);
  return response.data;
};

export const createProgram = async (data) => {
  try {
    const response = await apiService("/programs", "POST", data);
    return response.data;
  } catch (e) {
    toast.error("Couldn't create program because an error occured.", {
      toastId: "network-error-toast",
    });
  }
};

export const editProgram = async (id, data) => {
  try {
    const response = await apiService(`/programs/${id}`, "PUT", data);
    return response.data;
  } catch (e) {
    toast.error("Couldn't edit program because an error occured.", {
      toastId: "network-error-toast",
    });
  }
};
