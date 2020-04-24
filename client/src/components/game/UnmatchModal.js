import React, { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { useHistory } from "react-router-dom";
import { GameContext } from "./../../contexts/gameContext";
import { deleteCurrentGame, addToBlackList } from "./../../services/userService";
import { logout } from "./../../services/authService";

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
  button: {
    padding: "1em",
    borderRadius: "10px 0 10px 0",
    color: "#fffffe",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UnmatchModal = ({ openUnmatch, setOpenUnmatch }) => {
  const [open, setOpen] = React.useState(false);
  const {rival} = useContext(GameContext);
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => setOpen(openUnmatch), [openUnmatch]);


  const handleClose = async (e, option) => {
    try {
      await addToBlackList(rival._id);
      await deleteCurrentGame();
      await logout();
    } catch (error) {
      console.log("Error login out" + error);
    }

    history.push("/"); 
    setOpenUnmatch(false);
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
          {"Unmatch"}
        </DialogTitle>
        <DialogContent className={classes.dialog}>
          <Grid container className={classes.options}>

            <Grid item xs={12} align="center">
              <Typography component="h1" className={classes.text}>
                Sorry, you've been unmatched :(
              </Typography>
            </Grid>

            <Grid item xs={12} align="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleClose}
              >
                Bye, bye...
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UnmatchModal;
