import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  chat: {
    backgroundColor: "#FFFFFE",
    height: "55vh",
  },
}));

const Chat = () => {
  const classes = useStyles();
  return (
    <Box className={classes.chat}>
      <p>texto</p>
    </Box>
  );
};

export default Chat;
