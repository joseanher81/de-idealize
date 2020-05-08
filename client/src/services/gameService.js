import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  withCredentials: true,
});

export const createGame = async (userid) => {
  const res = await api.post("/game/new", { userid });
  return res.data;
};

export const getGame = async (userid) => {
  const res = await api.get("/game/get");
  console.log("getgame response " + JSON.stringify(res));
  return res.data.game;
};

export const addQuestionToGame = async (gameid, questionid) => {
  const res = await api.post("/game/addquestion", { gameid, questionid });
  console.log("addQuestion response " + JSON.stringify(res));
  return res.data;
};

export const addMessageToGame = async (gameid, message, userid) => {
  const res = await api.post("/game/addmessage", { gameid, message, userid });
  console.log("addMessage response " + JSON.stringify(res));
  return res.data;
};

export const getMessages = async (gameid) => {
  const res = await api.get("/game/messages/" + gameid );
  console.log("getmessages response " + JSON.stringify(res));
  return res.data.messages;
};

export const saveStatus = async (gameid, status) => {
  const res = await api.post("/game/setstatus", { gameid, status });
  console.log("addMessage response " + JSON.stringify(res));
  return res.data;
};

export const saveMatch = async (gameid, match) => {
  const res = await api.post("/game/setmatch", { gameid, match });
  console.log("addMessage response " + JSON.stringify(res));
  return res.data;
};
