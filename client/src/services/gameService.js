import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/",
  withCredentials: true,
});

export const createGame = async (userid) => {
  const res = await api.post("/game/new", { userid });
  console.log("createGame response " + JSON.stringify(res));
  return res.data;
};
