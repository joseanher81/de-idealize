import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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
  },
  submit: {
    margin: theme.spacing(2, 0, 2, 0),
    backgroundColor: "#FF8BA7",
    color: "#594A4E",
  },
}));

const Foot = (props) => {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm(); // initialise hook-form
  const { rival, messages, setMessages } = props;

  const onSubmit = async (data, e) => {
    const { message } = data;
    console.log("Mensaje " + message);

    // Enviar información
    sendMessage(rival._id, message);

    // Print msg on screen
    setMessages([...messages, { text: message, own: true }]);

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
              className={classes.submit}
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
