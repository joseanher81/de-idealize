import React, { useEffect, useContext } from "react";
import { makeStyles, Button, Dialog, Typography, Grid, DialogContent, DialogTitle, Slide } from "@material-ui/core";
import { GameContext } from "./../../contexts/gameContext";
import { socket, sendAnswer } from "./../../services/socketService";
import { addQuestionToGame } from "./../../services/gameService";

const useStyles = makeStyles((theme) => ({
  dialog: {
    backgroundColor: "#faeee7",
  },
  title: {
    color: "#33272a",
  },
  options: {
    display: "flex",
    alignItems: "center",
  },
  text: {
    color: "#ff8ba7",
    fontFamily: "Sacramento",
    fontSize: "3.5em",
    marginTop: "0.5em",
    marginBottom: "0.5em",
  },
  buttonA: {
    padding: "1em",
    borderRadius: "10px 0 10px 0",
    color: "#fffffe",
    marginTop: "2em",
    width: '50%',
  },
  buttonB: {
    padding: "1em",
    borderRadius: "0 10px 0 10px",
    color: "#fffffe",
    marginBottom: "2em",
    width: '50%',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Quiz = ({ openQuiz, setOpenQuiz, processQuiz }) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const {
    currentQuiz,
    ownAnwser,
    setOwnAnswer,
    rivalAnswer,
    setRivalAnswer,
    match,
    setMatch,
    rival,
    game,
    gameStatus,
  } = useContext(GameContext);

  useEffect(() => setOpen(openQuiz), [openQuiz]);

  useEffect(() => {
    // Listen to private message
    socket.on("quizAnswer", function (answer) {
      setRivalAnswer(answer);
    });
    return () => socket.off("quizAnswer");
  }, []);

  // Check both answers
  useEffect(() => {
    if (ownAnwser?.answer && rivalAnswer?.answer) {
      if (ownAnwser.answer === rivalAnswer.answer && gameStatus !== "MATCHED") {
        setMatch(
          match + currentQuiz.factor < 100 ? match + currentQuiz.factor : 100
        );
        setOwnAnswer(undefined);
        setRivalAnswer(undefined);
      } else if (
        ownAnwser.answer !== rivalAnswer.answer &&
        gameStatus !== "MATCHED"
      ) {
        setMatch(match - currentQuiz.factor);
        setOwnAnswer(undefined);
        setRivalAnswer(undefined);
      }
    } else {
      console.log("Falta alguna respuesta");
    }
  }, [ownAnwser, rivalAnswer]);

  const handleClose = (e, option) => {
    setOwnAnswer({ answer: option });
    sendAnswer(rival._id, option);
    addQuestionToGame(game._id, currentQuiz._id);
    setOpenQuiz(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        disableBackdropClick
        disableEscapeKeyDown
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title" className={classes.title}>
          {"Quiz"}
        </DialogTitle>
        <DialogContent className={classes.dialog}>
          <Grid container className={classes.options}>
            <Grid item xs={12} align="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.buttonA}
                onClick={(e) => {
                  handleClose(e, "A");
                }}
              >
                {currentQuiz.questionA}
              </Button>
            </Grid>

            <Grid item xs={12} align="center">
              <Typography component="h1" className={classes.text}>
                Choose one...
              </Typography>
            </Grid>

            <Grid item xs={12} align="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.buttonB}
                onClick={(e) => {
                  handleClose(e, "B");
                }}
              >
                {currentQuiz.questionB}
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Quiz;
