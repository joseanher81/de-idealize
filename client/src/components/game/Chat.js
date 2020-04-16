import React, { useState, useEffect } from "react";
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

  return (
    <Grid container className={classes.chat}>
      {messages.map((msg, i) => {
        return <Bubble key={i} msg={msg} />;
      })}
    </Grid>
  );
};

export default Chat;
