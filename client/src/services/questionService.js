import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  withCredentials: true,
});

export const getQuestion = async (gameid) => {
  const res = await api.get("/question/get/" + gameid);
  console.log("Question received from serve " + res.data.question);
  return res.data.question;
};
