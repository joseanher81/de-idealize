import React, { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { GameContext } from "./../../contexts/gameContext";
import { socket } from "./../../services/socketService";

const useStyles = makeStyles((theme) => ({
  dialog: {
    marginBottom: "2em",
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
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Quiz = ({ openQuiz, setOpenQuiz, processQuiz }) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const { currentQuiz, setCurrentQuiz } = useContext(GameContext);

  useEffect(() => setOpen(openQuiz), [openQuiz]);

  useEffect(() => {
    // Listen to private message
    socket.on("quizAnswer", function (answer) {
      console.log("quizAnswer rival:" + JSON.stringify(answer));
    });
  }, []);

  const handleClose = (e, option) => {
    //setCurrentQuiz({ ...currentQuiz, choosen: option });
    processQuiz(option);
    setOpenQuiz(false);
    //setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title" classname={classes.title}>
          {"Quiz"}
        </DialogTitle>
        <DialogContent className={classes.dialog}>
          <Grid container className={classes.options}>
            <Grid item xs={12} align="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
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
                className={classes.submit}
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
