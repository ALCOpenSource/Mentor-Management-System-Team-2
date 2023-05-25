import { toast } from "react-hot-toast";
import http from "services/axios";
import { apiService } from "../../api/axios";

export const getAllmentor = async (query) => {
  const url = "/mentor" + query;
  return await http.get(url);
};

export const getMentorsAssignedToATask = async (id) => {
  try {
    const response = await apiService(`/tasks/${id}/mentors`, "GET");
    return response.data;
  } catch (e) {
    toast.error("An error occured while fetching mentors by task", {
      toastId: "network-error-toast",
    });
  }
};

export const getMentorManagerssAssignedToATask = async (id) => {
  try {
    const response = await apiService(`/tasks/${id}/mentor-managers`, "GET");
    return response.data;
  } catch (e) {
    toast.error("An error occured while fetching mentor managers by task", {
      toastId: "network-error-toast",
    });
  }
};

export const getMentorsAssignedToAProgram = async (id) => {
  try {
    const response = await apiService(`/programs/${id}/mentors`, "GET");
    return response.data;
  } catch (e) {
    toast.error("An error occured while fetching mentors by program", {
      toastId: "network-error-toast",
    });
  }
};

export const getMentorManagerssAssignedToAProgram = async (id) => {
  try {
    const response = await apiService(`/programs/${id}/mentor-managers`, "GET");
    return response.data;
  } catch (e) {
    toast.error("An error occured while fetching mentor managers by program", {
      toastId: "network-error-toast",
    });
  }
};

export const deleteMentor = async (mentorId) => {
  const url = "/profile/delete/" + mentorId;
  return await http.put(url);
};
