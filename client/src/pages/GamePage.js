import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "./../contexts/userContexts";
import { loggedin } from "./../services/authService";
import NavBar from "./../components/game/NavBar";
import Head from "./../components/game/Head";
import Chat from "./../components/game/Chat";
import Foot from "./../components/game/Foot";
import { Container, Box } from "@material-ui/core";

const GamePage = () => {
  const { user } = useContext(UserContext);

  console.log("GAME " + JSON.stringify(user));

  return (
    <Box>
      <NavBar />
      <Head user={user} />
      <Chat />
      <Foot />
    </Box>
  );
};

export default GamePage;
