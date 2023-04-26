import getConfig from "next/config";
import { fetchWrapper } from "../lib/fetch-wrapper";

const { publicRuntimeConfig } = getConfig();

const baseUrl = `${publicRuntimeConfig.apiUrl}`;

function send(message, token) {
  return fetchWrapper
    .post(`${baseUrl}/broadcast}`, token, message)
    .then((message) => message);
}

function sent(token) {
    return fetchWrapper.get(`${baseUrl}/broadcast/sent`, token).then((messages) => messages)
}

function received(token) {
    return fetchWrapper.get(`${baseUrl}/broadcast/received`, token).then((messages) => messages)
}


export const broadcastService = { send, sent, received}
