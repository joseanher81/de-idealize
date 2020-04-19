import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/",
  withCredentials: true,
});

export const getQuestion = async (gameid) => {
  console.log("GAME ID " + gameid);
  const res = await api.get("/question/get/" + gameid);
  console.log("Question received from serve " + res.data.question);
  return res.data.question;
};
