import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "./../contexts/userContexts";
import { GameContext } from "./../contexts/gameContext";
import { addToBlackList } from "./../services/userService";
import { getQuestion } from "./../services/questionService";
import { logout } from "./../services/authService";
import Menu from "./../components/game/Menu";
import Head from "./../components/game/Head";
import Chat from "./../components/game/Chat";
import Foot from "./../components/game/Foot";
import Quiz from "./../components/game/Quiz";
import MenuDrawer from "./../components/game/MenuDrawer";
import UnmatchModal from "./../components/game/UnmatchModal";
import PicModal from "./../components/game/PicModal";
import Toast from "./../components/game/Toast";
import { Box } from "@material-ui/core";
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { socket, shareQuiz } from "./../services/socketService";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

const GamePage = () => {
  const history = useHistory();
  const classes = useStyles();
  const [openQuiz, setOpenQuiz] = useState(false);
  const [openPic, setOpenPic] = useState(false);
  const [openUnmatch, setOpenUnmatch] = useState(false);
  const [picUrl, setPicUrl] = useState("");
  const [openToast, setOpenToast] = useState(false);

  const { user } = useContext(UserContext);
  const { setCurrentQuiz } = useContext(GameContext);
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

  // DRAWER SETUP
  const [drawer, setDrawer] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawer(open);
  };

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <MenuDrawer setOpenUnmatch={ setOpenUnmatch }/>
    </div>
  );

  //END DRAWER SETUP

  // GAME STAGE LOGIC
  useEffect(() => {
    console.log("Game id " + JSON.stringify(game));
    //Every time a message is sent advance one stage
    setStage(stage + 1);
    console.log("Game stage" + stage);

    // Every 5 stages shows a Question (only one player ask for it and shares it)
    if (stage !== 0 && stage % 5 === 0 && gameStatus !== "MATCHED" && user._id === playerTurn) {
      getQuestion(game._id)
        .then((question) => {
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
    socket.on("shareQuiz", function (data) {
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

    // Listen to timeout of rival
    useEffect(() => {
      socket.on("timeout", function () {
        console.log("There was a time out, setting to lose")
        setGameStatus("LOSE");
      });
    }, []);

    // Listen to unmatch from the other user
    useEffect(() => {
      socket.on("unmatch", function (msg) {
        console.log("You have been unmatched");
        setOpenUnmatch(true); // Open confirmation dialog
      });
      return () => socket.off("unmatch");
    }, []);

  return (
    <div>
      <React.Fragment key='left'>
        <Box>
          <Menu setDrawer={setDrawer}/>
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
          {<UnmatchModal openUnmatch={openUnmatch} setOpenUnmatch={setOpenUnmatch} />}
          {<Toast openToast={openToast} setOpenToast={setOpenToast} />}
          <Drawer anchor='left' open={drawer} onClose={toggleDrawer(false)}>
            {list()}
          </Drawer>
        </Box>
      </React.Fragment>
    </div>
  );
};

export default GamePage;
