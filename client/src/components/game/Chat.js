import React, { useEffect, useRef, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { GameContext } from "./../../contexts/gameContext";
import { UserContext } from "./../../contexts/userContexts";
import Grid from "@material-ui/core/Box";
import Bubble from "./Bubble";
import Timer from "./Timer";
import Wait from "./Wait";
import { socket } from "./../../services/socketService";

const useStyles = makeStyles((theme) => ({
  chat: {
    backgroundColor: "#FFFFFE",
    height: "50vh",
    paddingTop: "1em",
    paddingBottom: "1em",
    overflowY: "scroll",
  },
}));

const Chat = (props) => {
  const classes = useStyles();
  const refContainer = useRef();
  const {
    messages,
    setMessages,
    game,
    setGame,
    rival,
    playerTurn,
    setPlayerTurn,
    gameStatus,
  } = useContext(GameContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    // Listen to private message
    socket.on("mensajePrivado", function (msg) {
      console.log("Mensaje Privado:", messages);

      // Cambiar turno y guardar en ddbb
      setPlayerTurn(user._id);

      // Print msg on screen
      setMessages((oldmessages) => [...oldmessages, msg]);

      // TODO Guardar en DDBB
    });
    return () => socket.off("mensajePrivado");
  }, []);

  useEffect(() => {
    console.log("JODEEEER" + JSON.stringify(game));
  }, [game]);

  useEffect(() => {
    // Prior to getting your messages.
    let shouldScroll =
      refContainer.current.scrollTop + refContainer.current.clientHeight ===
      refContainer.current.scrollHeight;

    console.log("Should scroll " + shouldScroll);
    // After getting your messages.
    if (!shouldScroll) {
      refContainer.current.scrollTop = refContainer.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Grid container className={classes.chat} ref={refContainer}>
      {messages.map((msg, i) => {
        return <Bubble key={i} msg={msg} />;
      })}
      {!(rival?._id === playerTurn) && gameStatus !== "MATCHED" && (
        <Timer messages={messages} />
      )}
      {rival?._id === playerTurn && gameStatus !== "MATCHED" && <Wait />}
    </Grid>
  );
};

export default Chat;
