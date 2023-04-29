import Http from "../axios/axiosClient";

export const fetchTasks = async (query) => {
  const url = "/task" + query;
  return await Http.get(url);
};
