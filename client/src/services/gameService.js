import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/",
  withCredentials: true,
});

export const createGame = async (username) => {
  const res = await api.post("/game/new", username);
  return res.data.game;
};
