import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "./../contexts/userContexts";
import { loggedin } from "./../services/authService";
import NavBar from "./../components/game/NavBar";
import Head from "./../components/game/Head";
import Chat from "./../components/game/Chat";
import Foot from "./../components/game/Foot";

const GamePage = () => {
  const { user } = useContext(UserContext);

  console.log("GAME " + JSON.stringify(user));

  return (
    <>
      <NavBar />
      <Head />
      <Chat />
      <Foot />
    </>
  );
};

export default GamePage;
