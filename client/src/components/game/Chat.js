import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import io from "socket.io-client";
const socket = io("localhost:5000");

const useStyles = makeStyles((theme) => ({
  chat: {
    backgroundColor: "#FFFFFE",
    height: "50vh",
  },
}));

const Chat = () => {
  const classes = useStyles();
  return <Box className={classes.chat}></Box>;
};

export default Chat;
