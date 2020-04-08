import axios from "axios";
require("dotenv").config();

const service = axios.create({
  baseURL: "http://localhost:5000/",
  withCredentials: true,
});

// Sign Up
export const signup = async (formData) => {
  const {
    username,
    password,
    email,
    age,
    gender,
    location,
    lookingFor,
    minAge,
    maxAge,
  } = formData;

  try {
    const res = await service.post("/auth/signup", {
      username,
      password,
      email,
      age,
      gender,
      location,
      lookingFor,
      minAge,
      maxAge,
    });

    console.log("Signup user " + JSON.stringify(res));
    return res.data.user;
  } catch (error) {
    console.log(`Error ${error}`);
  }
};

// Log In
export const login = async (formData) => {
  const { username, password } = formData;

  try {
    const res = await service.post("auth/login", {
      username,
      password,
    });

    console.log("Logged user " + JSON.stringify(res));
    return res.data.user;
  } catch (error) {
    console.log(`Error ${error}`);
  }
};

// Upload file
/* export const upload = async (formData) => {
  const {file } = formData;

  try {
    const res = await service.post('auth/upload', {
      file
    });
  
    console.log("File uploaded " + res);
    return res.data;

  } catch (error) {
    console.log(`Error ${error}`);
  }
} */

// Edit
/* export const edit = async (formData) => {
  const {username, password, campus } = formData;

  try {
    const res = await service.post('auth/edit', {
      username, 
      password,
      campus
    });
  
    console.log("Profile edited " + res);
    return res.data;

  } catch (error) {
    console.log(`Error ${error}`);
  }
} */

// Log Out
export const logout = async () => {
  try {
    const res = await service.post("auth/logout");

    console.log("User logged out " + res);
    return res.data;
  } catch (error) {
    console.log(`Error ${error}`);
  }
};

// Logged In
export const loggedin = async () => {
  try {
    const res = await service.get("auth/loggedin");

    console.log("Check user loged in " + res);
    return res.data.user;
  } catch (error) {
    console.log(`Error ${error}`);
  }
};
