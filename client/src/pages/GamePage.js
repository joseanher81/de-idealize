import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "./../contexts/userContexts";
import { loggedin } from "./../services/authService";
import { createGame } from "./../services/gameService";
import NavBar from "./../components/game/NavBar";
import Head from "./../components/game/Head";
import Chat from "./../components/game/Chat";
import Foot from "./../components/game/Foot";
import { Container, Box } from "@material-ui/core";

const GamePage = () => {
  const { user, setUser } = useContext(UserContext);
  //const { game, setGame } = useState();

  console.log("GAME " + JSON.stringify(user));

  useEffect(() => {
    console.log("WELCOME TO THE GAME!");

    // Try to get the current logged in user from our backend
    loggedin()
      .then((user) => {
        console.log(`Welcome user` + JSON.stringify(user));
        setUser(user);

        // Check if user has an ongoing game
        if (!user.currentGame) {
          console.log("USER HAS NOT CURRENT GAME");
          // Create new game
          setUser(createGame(user.username));
        } else {
        }
      })
      .catch((e) => {
        console.error("No user logged in ");
      });
  }, []);

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
