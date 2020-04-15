import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { socket } from "./../../services/socketService";

const useStyles = makeStyles((theme) => ({
  chat: {
    backgroundColor: "#FFFFFE",
    height: "50vh",
  },
}));

const Chat = () => {
  const [msg, setMsg] = useState();
  const classes = useStyles();

  useEffect(() => {
    // Listen to private message
    socket.on("mensajePrivado", function (msg) {
      console.log("Mensaje Privado:", msg);
      setMsg(msg);
    });
  });

  return <Box className={classes.chat}>Mensaje: {msg}</Box>;
};

export default Chat;
