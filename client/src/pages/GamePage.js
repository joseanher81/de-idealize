import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "./../contexts/userContexts";
import { GameContext } from "./../contexts/gameContext";
import { addToBlackList } from "./../services/userService";
import { getQuestion } from "./../services/questionService";
import { logout } from "./../services/authService";
import NavBar from "./../components/game/NavBar";
import Menu from "./../components/game/Menu";
import Head from "./../components/game/Head";
import Chat from "./../components/game/Chat";
import Foot from "./../components/game/Foot";
import Quiz from "./../components/game/Quiz";
import PicModal from "./../components/game/PicModal";
import Toast from "./../components/game/Toast";
import { Box } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { socket, shareQuiz } from "./../services/socketService";

const GamePage = () => {
  const history = useHistory();
  const [openQuiz, setOpenQuiz] = useState(false);
  const [openPic, setOpenPic] = useState(false);
  const [picUrl, setPicUrl] = useState("");
  const [openToast, setOpenToast] = useState(false);

  const { user } = useContext(UserContext);
  const { currentQuiz, setCurrentQuiz } = useContext(GameContext);
  const {
    gameStatus,
    setGameStatus,
    stage,
    setStage,
    messages,
    game,
    setGame,
    rival,
    playerTurn,
  } = useContext(GameContext);


  // GAME STAGE LOGIC
  useEffect(() => {
    console.log("GAME id " + JSON.stringify(game));
    //Every time a message is sent advance one stage
    setStage(stage + 1);
    console.log("GAME STAGE" + stage);

    // Every 5 stages shows a Question (only one player ask for it and shares it)
    if (stage !== 0 && stage % 5 === 0 && gameStatus !== "MATCHED" && user._id === playerTurn) {
      console.log("PREGUNTA!!!");
      console.log("user " + user._id );
      console.log("turn " + playerTurn);
      getQuestion(game._id)
        .then((question) => {
          console.log(
            "LA PREGUNTA PARA EL MODAL ES " + JSON.stringify(question)
          );
          shareQuiz(question, rival._id);
          setCurrentQuiz(question);
          setOpenQuiz(true);
        })
        .catch((e) => {
          console.log("Error getting question " + e);
        });
    }

    // Every 7 stages a Photo is revealed (controlled by header)
  }, [messages]);

  // Quiz selected
  useEffect(() => {
    console.log("ARRANCANDO EL LISTENER DE QUIZ");
    socket.on("shareQuiz", function (data) {
      console.log("holi")
      console.log(data)
      console.log(data)
      setCurrentQuiz(data.quiz);  
      setOpenQuiz(true);
    });
    return () => socket.off("shareQuiz");
  }, []);

  // ENDING GAME
  useEffect(() => {
    if (gameStatus === "LOSE" || gameStatus === "WIN") {
      // If LOSE add rival to blacklist to never meeting again
      if (gameStatus === "LOSE") {
        console.log("Adding to blacklist " + rival._id);
        addToBlackList(rival._id)
          .then(history.push("/end", { data: { user, rival, gameStatus } }))
          .catch((e) => {
          console.log("Error adding to blacklist " + e);
        })
      }
      history.push("/end", { data: { user, rival, gameStatus } });
    }
  }, [gameStatus]);

    // Avoid refreshing page and no users present
    useEffect(() => {
      if(!user) {
        console.log("LOGGING OUT")
        try {
          logout().then(history.push("/")).catch();      
        } catch (error) {
          console.log("Error login out" + error);
        }
      }
    }, []);

    useEffect(() => {
      // Listen to timeout of rival
      console.log("ARRANCANDO EL TIMEOUT");
      socket.on("timeout", function () {
        console.log("THERE WAS A TIME OUT SETING TO LOSE")
        setGameStatus("LOSE");
      });
    }, []);

  return (
    <Box>
      {/* <NavBar /> */}
      <Menu/>
      <Head rival={rival} setOpenPic={setOpenPic} setPicUrl={setPicUrl}/>
      <Chat />
      <Foot
        rival={rival}
        game={game}
        setGame={setGame}
        openToast={openToast}
        setOpenToast={setOpenToast}
      />
      {<Quiz openQuiz={openQuiz} setOpenQuiz={setOpenQuiz} />}
      {<PicModal openPic={openPic} setOpenPic={setOpenPic} picUrl={picUrl} setPicUrl={setPicUrl}/>}
      {<Toast openToast={openToast} setOpenToast={setOpenToast} />}
    </Box>
  );
};

export default GamePage;
