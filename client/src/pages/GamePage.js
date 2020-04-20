import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "./../contexts/userContexts";
import { GameContext } from "./../contexts/gameContext";
import { createGame, getGame } from "./../services/gameService";
import { getUser, saveSocketId } from "./../services/userService";
import { getQuestion } from "./../services/questionService";
import NavBar from "./../components/game/NavBar";
import Head from "./../components/game/Head";
import Chat from "./../components/game/Chat";
import Foot from "./../components/game/Foot";
import Quiz from "./../components/game/Quiz";
import { Container, Box } from "@material-ui/core";
import {
  getSocketId,
  storeClientInfo,
  sendAnswer,
} from "./../services/socketService";
import { useHistory } from "react-router-dom";

const GamePage = () => {
  const history = useHistory();
  const [openQuiz, setOpenQuiz] = useState(false);

  const { user, setUser } = useContext(UserContext);
  const { playerTurn, setPlayerTurn, currentQuiz, setCurrentQuiz } = useContext(
    GameContext
  );
  const {
    gameStatus,
    setGameStatus,
    stage,
    setStage,
    messages,
    game,
    setGame,
    rival,
    setRival,
  } = useContext(GameContext);

  console.log("1");

  useEffect(() => {
    console.log("WELCOME TO THE GAME!");
    console.log("2");
    setGameStatus("PLAYING");

    // Save client info on socket server
    storeClientInfo(user._id);

    // Check if user has an ongoing game
    if (!user.currentGame) {
      // USER HAS NO GAME
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
          setPlayerTurn(game.playerTurn);
          console.log("5");
        })
        .catch((e) => {
          console.log("Error creating game " + e);
        });
    } else {
      // USER HAS GAME
      console.log("USER HAS GAME and his id is " + user._id);
      console.log("7");

      // Get current game
      console.log("JUEGO " + game);
      getGame(user._id)
        .then((game) => {
          setGame(game);
          setPlayerTurn(game.playerTurn);
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

  // GAME STAGE LOGIC
  useEffect(() => {
    console.log("GAME id " + JSON.stringify(game));
    //Every time a message is sent advance one stage
    setStage(stage + 1);
    console.log("GAME STAGE" + stage);

    // Every 5 stages a Question is asked
    if (stage !== 0 && stage % 5 === 0) {
      console.log("PREGUNTA!!!");
      getQuestion(game._id)
        .then((question) => {
          console.log(
            "LA PREGUNTA PARA EL MODAL ES " + JSON.stringify(question)
          );

          setCurrentQuiz(question);
          setOpenQuiz(true);
        })
        .catch((e) => {
          console.log("Error getting question " + e);
        });
    }

    // Every 7 stages a Photo is revealed (controlled by header)
  }, [messages]);

  // ENDING GAME
  useEffect(() => {
    if (gameStatus === "LOSE" || gameStatus === "WIN")
      history.push("/end", { data: { user, rival, gameStatus } });
  }, [gameStatus]);

  return (
    <Box>
      <NavBar />
      <Head rival={rival} />
      <Chat />
      <Foot rival={rival} game={game} setGame={setGame} />
      {<Quiz openQuiz={openQuiz} setOpenQuiz={setOpenQuiz} />}
    </Box>
  );
};

export default GamePage;
