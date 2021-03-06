import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { GameContext } from "./../../contexts/gameContext";
import { UserContext } from "./../../contexts/userContexts";
import {TextField, Container, IconButton, Grid} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { useForm } from "react-hook-form";
import { sendMessage } from "./../../services/socketService";
import { addMessageToGame } from "./../../services/gameService";
import { isValid } from "./../../lib/utils";

const useStyles = makeStyles((theme) => ({
  stickToBottom: {
    width: "100%",
    bottom: 0,
    height: "15vh",
    borderTop: "1px solid #ff8ba7",
  },
  submitActive: {
    margin: theme.spacing(2, 0, 2, 0),
    backgroundColor: "#FF8BA7",
    color: "#594A4E",
    border: "1px solid #FF8BA7",
    "&:hover": { backgroundColor: "#FF8BA7" },
    "&:focus": { backgroundColor: "#FF8BA7" },
  },
  submitInactive: {
    margin: theme.spacing(2, 0, 2, 0),
    backgroundColor: "#ffc6c7",
    color: "#594A4E",
    border: "1px solid #FF8BA7",
    "&:hover": { backgroundColor: "#ffc6c7" },
    "&:focus": { backgroundColor: "#ffc6c7" },
  },
}));

const Foot = (props) => {
  const {
    game,
    messages,
    setMessages,
    playerTurn,
    setPlayerTurn,
    gameStatus,
  } = useContext(GameContext);
  const { user } = useContext(UserContext);
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm(); // initialise hook-form
  const { rival, setOpenToast } = props;

  const onSubmit = async (data, e) => {
    const { message } = data;

    if (isValid(message) || gameStatus === "MATCHED") {
      // Send message to rival
      sendMessage(rival._id, message);

      // Save message to ddbb
      await addMessageToGame(game._id, message, user._id);

       // Change turn
       setPlayerTurn(rival._id);

      // Print msg on screen
      setMessages([...messages, { text: message, own: true }]);

    } else {
      // Show a toast with warning
      setOpenToast(true);
    }

    // Reset input
    e.target.reset();
  };

  return (
    <Container className={classes.stickToBottom}>
      <form
        className={classes.form}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="message"
              id="message"
              autoComplete="off"
              inputRef={register({ required: true })}
              error={!!errors.message}
            />
          </Grid>
          <Grid item xs={2}>
            <IconButton
              aria-label="send"
              type="submit"
              className={
                rival?._id === playerTurn && gameStatus !== "MATCHED"
                  ? classes.submitInactive
                  : classes.submitActive
              }
              disabled={rival?._id === playerTurn && gameStatus !== "MATCHED"}
            >
              <SendIcon />
            </IconButton>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Foot;
