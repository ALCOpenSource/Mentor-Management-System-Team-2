import Http from "../axios/axiosClient";

export const fetchArchive = async (query) => {
  const url = "/archive" + query;
  return await Http.get(url);
};
