import { toast } from "react-hot-toast";
import { apiService } from "../../api/axios";

export const fetchTaskReports = async () => {
  try {
    const response = await apiService("/task-reports", "GET");
    return response.data.responseData;
  } catch (e) {
    toast.error("An error occured while fetching task reports", {
      toastId: "network-error-toast",
    });
  }
};

export const fetchProgramReports = async () => {
  try {
    const response = await apiService("/program-reports", "GET");
    return response.data.responseData;
  } catch (e) {
    toast.error("An error occured while fetching program reports", {
      toastId: "network-error-toast",
    });
  }
};
