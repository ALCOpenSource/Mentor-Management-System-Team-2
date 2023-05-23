import http from "services/axios";

export const fetchPrograms = async () => {
  const response = await http.get("/programs");
  return response.data.data;
};

export const getUserProgram = async (id, query) => {
  const response = await http.get(`/programs/user-programs/${id}` + query);
  return response.data;
};
