import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "./../contexts/userContexts";
import { createGame } from "./../services/gameService";
import NavBar from "./../components/game/NavBar";
import Head from "./../components/game/Head";
import Chat from "./../components/game/Chat";
import Foot from "./../components/game/Foot";
import { Container, Box } from "@material-ui/core";

const GamePage = () => {
  const { user, setUser } = useContext(UserContext);
  const [game, setGame] = useState();
  const [rival, setRival] = useState();

  console.log("1");

  useEffect(() => {
    console.log("WELCOME TO THE GAME!");
    console.log("2");

    // Check if user has an ongoing game
    if (!user.currentGame) {
      console.log("USER HAS NOT CURRENT GAME and his id is " + user._id);
      console.log("3");

      // Create new game
      createGame(user._id)
        .then((data) => {
          const { game, playerA, playerB } = data;
          console.log("GAME RECIEVED " + JSON.stringify(game));
          console.log("4");
          setGame(game);
          setUser(playerA);
          setRival(playerB);
          console.log("5");
        })
        .catch((e) => {
          console.log("Error creating game " + e);
        });

      // Get updated user
    } else {
      console.log("USER HAS GAME and his id is " + user._id);
      console.log("7");
    }
  }, []);

  return (
    <Box>
      <NavBar />
      <Head rival={rival} />
      <Chat />
      <Foot />
    </Box>
  );
};

export default GamePage;
