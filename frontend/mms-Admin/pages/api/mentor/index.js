import http from "services/axios";

export const getAllmentor = async () => {
  const url = "/mentor";
  return await http.get(url);
};

export const deleteMentor = async (mentorId) => {
  const url = "/profile/delete/" + mentorId;
  return await http.put(url);
};

