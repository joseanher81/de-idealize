import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/",
  withCredentials: true,
});

export const changeAvatar = async (imageFile) => {
  const data = new FormData();
  data.append("image", imageFile);
  const res = await api.post("/profilepic", data);
  return res.data.file;
};

export const getUser = async (userid) => {
  const res = await api.get("/user/get/" + userid);
  return res.data.user;
};

export const saveSocketId = async (userid, socketid) => {
  const res = await api.post("/user/saveSocketId", { userid, socketid });
  return res.data;
};
