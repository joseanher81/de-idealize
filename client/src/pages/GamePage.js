import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "./../contexts/userContexts";
import { loggedin } from "./../services/authService";
import NavBar from "./../components/game/NavBar";

const GamePage = () => {
  const { user } = useContext(UserContext);

  console.log("GAME " + JSON.stringify(user));

  return (
    <>
      <NavBar />
      <h1>GAME of {user.username}</h1>
    </>
  );
};

export default GamePage;
