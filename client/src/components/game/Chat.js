import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Bubble from "./Bubble";
import { socket } from "./../../services/socketService";

const useStyles = makeStyles((theme) => ({
  chat: {
    backgroundColor: "#FFFFFE",
    height: "50vh",
    color: "black",
  },
}));

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    // Listen to private message
    socket.on(
      "mensajePrivado",
      function (msg) {
        console.log("Mensaje Privado:", msg);
        setMessages([...messages, msg]);
      },
      []
    );
  });

  return (
    <Box className={classes.chat}>
      {messages.map((msg, i) => {
        return <Bubble key={i} msg={msg} />;
      })}
    </Box>
  );
};

export default Chat;
