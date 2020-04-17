import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Box";
import Bubble from "./Bubble";
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
  const { messages, setMessages } = props;
  const classes = useStyles();
  const refContainer = useRef();

  useEffect(() => {
    // Listen to private message
    socket.on(
      "mensajePrivado",
      function (msg) {
        console.log("Mensaje Privado:", msg);

        // Print msg on screen
        setMessages([...messages, msg]);
      },
      []
    );
  });

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
    </Grid>
  );
};

export default Chat;
