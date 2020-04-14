import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "./../contexts/userContexts";
import { createGame, getGame } from "./../services/gameService";
import { getUser, saveSocketId } from "./../services/userService";
import NavBar from "./../components/game/NavBar";
import Head from "./../components/game/Head";
import Chat from "./../components/game/Chat";
import Foot from "./../components/game/Foot";
import { Container, Box } from "@material-ui/core";
import { getSocketId } from "./../services/socketService";

const GamePage = () => {
  const { user, setUser } = useContext(UserContext);
  const [game, setGame] = useState();
  const [rival, setRival] = useState();

  console.log("1");

  useEffect(() => {
    console.log("WELCOME TO THE GAME!");
    console.log("2");

    // Save current socket id on database
    let socketId = getSocketId();

    saveSocketId(user._id, socketId)
      .then()
      .catch((e) => {
        console.log("Error " + e);
      });

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
    } else {
      console.log("USER HAS GAME and his id is " + user._id);
      console.log("7");

      // Get current game
      getGame(user._id)
        .then((game) => {
          setGame(game);
          console.log("8");
          console.log("GAME RECIEVED " + JSON.stringify(game));

          // Get current rival
          let rival = user._id === game.playerA ? game.playerB : game.playerA;

          getUser(rival)
            .then((player) => {
              console.log("Rival recieved" + JSON.stringify(player));
              setRival(player);
            })
            .catch((e) => {
              console.log("Error getting player " + e);
            });
        })
        .catch((e) => {
          console.log("Error getting game " + e);
        });
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
