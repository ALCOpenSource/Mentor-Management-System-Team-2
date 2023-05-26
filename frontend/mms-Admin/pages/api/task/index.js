import http from "services/axios";
import { apiService } from "../axios";
import { toast } from "react-hot-toast";

export const fetchTask = async (id) => {
  const url = "/task/" + id;
  return await http.get(url);
};

export const fetchTasks = async (query) => {
  const url = "/tasks";
  const response = await http.get(url);
  return response.data.data;
};

export const updateTask = async (id, payload) => {
  const url = "/task/" + id;
  return await http.put(url, payload);
};

export const deleteTask = async (taskId) => {
  const url = "/task/delete/" + taskId;
  return await http.delete(url);
};

export const createTask = async (data) => {
  try {
    const response = await apiService("/tasks", "POST", data);
    return response.data;
  } catch (e) {
    toast.error("Couldn't create task because an error occured.", {
      toastId: "network-error-toast",
    });
  }
};
