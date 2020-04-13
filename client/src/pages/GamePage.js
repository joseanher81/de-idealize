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
  const { game, setGame } = useState();

  console.log("GAME PAGE - GAME" + JSON.stringify(game));
  console.log("1");

  useEffect(() => {
    console.log("WELCOME TO THE GAME!");
    console.log("2");

    // Try to get the current logged in user from our backend
    loggedin()
      .then(async (user) => {
        console.log(`Welcome user` + JSON.stringify(user));
        console.log("3");
        setUser(user);

        // Check if user has an ongoing game
        if (!user.currentGame) {
          console.log("USER HAS NOT CURRENT GAME and his id is " + user._id);
          console.log("4");
          // Create new game
          let game = await createGame(user._id);
          console.log("GAME RECIEVED " + JSON.stringify(game));
          console.log("HOLA!!!!");
          console.log("5");
          setGame(game);
          console.log("6");

          // createGame(user._id).then((game) => {
          //   console.log("GAME RECIEVED " + JSON.stringify(game));
          //   console.log("PASA POR AQUI");
          //   setGame(game);
          // });

          // Get updated user
        } else {
          console.log("USER HAS GAME and his id is " + user._id);
          console.log("7");
        }
      })
      .catch((e) => {
        console.error("No user logged in ");
        console.log("8");
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
