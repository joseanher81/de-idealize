import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "./../contexts/userContexts";
import { GameContext } from "./../contexts/gameContext";
import { addToBlackList } from "./../services/userService";
import { getQuestion } from "./../services/questionService";
import NavBar from "./../components/game/NavBar";
import Menu from "./../components/game/Menu";
import Head from "./../components/game/Head";
import Chat from "./../components/game/Chat";
import Foot from "./../components/game/Foot";
import Quiz from "./../components/game/Quiz";
import Toast from "./../components/game/Toast";
import { Box } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const GamePage = () => {
  const history = useHistory();
  const [openQuiz, setOpenQuiz] = useState(false);
  const [openToast, setOpenToast] = useState(false);

  const { user } = useContext(UserContext);
  const { setCurrentQuiz } = useContext(GameContext);
  const {
    gameStatus,
    stage,
    setStage,
    messages,
    game,
    setGame,
    rival,
  } = useContext(GameContext);

  // GAME STAGE LOGIC
  useEffect(() => {
    console.log("GAME id " + JSON.stringify(game));
    //Every time a message is sent advance one stage
    setStage(stage + 1);
    console.log("GAME STAGE" + stage);

    // Every 5 stages a Question is asked
    if (stage !== 0 && stage % 5 === 0 && gameStatus !== "MATCHED") {
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
    if (gameStatus === "LOSE" || gameStatus === "WIN") {
      // If LOSE add rival to blacklist to never meeting again
      if (gameStatus === "LOSE") {
        addToBlackList(rival._id);
      }

      history.push("/end", { data: { user, rival, gameStatus } });
    }
  }, [gameStatus]);

  return (
    <Box>
      {/* <NavBar /> */}
      <Menu/>
      <Head rival={rival} />
      <Chat />
      <Foot
        rival={rival}
        game={game}
        setGame={setGame}
        openToast={openToast}
        setOpenToast={setOpenToast}
      />
      {<Quiz openQuiz={openQuiz} setOpenQuiz={setOpenQuiz} />}
      {<Toast openToast={openToast} setOpenToast={setOpenToast} />}
    </Box>
  );
};

export default GamePage;
