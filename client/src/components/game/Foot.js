import React, { useContext, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { GameContext } from "./../../contexts/gameContext";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import { useForm } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import { sendMessage } from "./../../services/socketService";

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
  const { messages, setMessages } = useContext(GameContext);
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm(); // initialise hook-form
  const { rival, game, setGame } = props;

  const onSubmit = async (data, e) => {
    const { message } = data;
    console.log("Mensaje " + message);

    // Enviar información
    sendMessage(rival._id, message);

    // Print msg on screen
    setMessages([...messages, { text: message, own: true }]);

    // Cambiar turno y guardar en ddbb
    setGame({ ...game, playerTurn: rival._id });

    // TODO Guardar en DDBB

    // Reset input
    e.target.reset();
  };

  useEffect(() => {
    console.log("A ver q hemos liado" + JSON.stringify(game));
  }, [game]);
  // Turn control
  /*   useEffect(() => {
    rival?._id === game?.playerTurn
      ? (refButton.current.disabled = true)
      : (refButton.current.disabled = false);
    console.log("Rival entrando" + rival?._id);
    console.log("Player turn entrando" + game?.playerTurn);
  }, [rival]); */

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
              /*               classes={{
                root: classes.submit,
                focusVisible: classes.submit,
              }} */
              className={
                rival?._id === game?.playerTurn
                  ? classes.submitInactive
                  : classes.submitActive
              }
              disabled={rival?._id === game?.playerTurn}
            >
              <SendIcon />
            </IconButton>
            {/* <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Send
            </Button> */}
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Foot;
