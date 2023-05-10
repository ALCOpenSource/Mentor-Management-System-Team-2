import http from "services/axios";

export const fetchPrograms = async () => {
  const url = "/programs";
  return await http.get(url);
};

export  const getUserProgram = async () => {
  const url = "/programs" + id;
  return await http.get(url);
}
