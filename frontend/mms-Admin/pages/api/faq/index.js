import Http from "../axios/axiosClient";

export const fetchFaqs = async (query) => {
  const url = "/faq";
  return await Http.get(url);
};
