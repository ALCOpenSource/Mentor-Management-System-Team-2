import http from "services/axios";

export const getAllChat = async (channelName, payload) => {
  const url = "/chat/" + channelName + "/" + payload;
  return await http.get(url);
};

export const authChatChannel = async () => {
  const url = "/chat/channel";
  return await http.post(url);
};

export const authChatUser = async () => {
  const url = "/chat/";
  return await http.post(url);
};

export const saveChat = async (receiverId, payload) => {
  const url = "/chat/" + receiverId;
  return await http.post(url, payload);
};
