import http from "services/axios";
export const fetchMentors = async () => {
  const response = await http.get("/mentor");
  return response.data.mentors.data;
};

export const fetchMentorTasks = async (id, search) => {
  const response = await http.get(`/mentor/${id}/tasks` + search);
  return response.data.data;
};

export const fetchMentorManagers = async () => {
  const url = "/user/mentor-managers";
  return await http.get(url);
};

export const fetchUserProfile = async () => {
  const url = "/profile";
  return await http.get(url);
};

export const updateUserProfile = async (payload) => {
  const url = "/profile";
  return await http.put(url, payload);
};

export const fetchUsers = async (query) => {
  const url = "/user" + query;
  return await http.get(url);
};

export const inviteMentor = async (payload) => {
  const url = "/user/invite";
  return await http.post(url, payload);
};


