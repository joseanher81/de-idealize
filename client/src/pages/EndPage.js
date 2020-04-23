import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "./../contexts/userContexts";
import { GameContext } from "./../contexts/gameContext";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useHistory } from "react-router-dom";
import { createBrowserHistory } from "history";
import { deleteCurrentGame } from "./../services/userService";
import { logout } from "./../services/authService";

const useStyles = makeStyles((theme) => ({
  page: {
    display: "flex",
    alignItems: "center",
    height: "100vh",
    paddingBottom: "2em",
  },
  submit: {
    borderRadius: "10px 0 10px 0",
    margin: theme.spacing(3, 0, 2),
    height: "4em",
    color: "#fffffe",
    fontSize: "1.3em",
    fontWeight: "bold",
  },
  title: {
    color: "#ff8ba7",
    flexGrow: 1,
    fontFamily: "Sacramento",
    fontSize: "2.5em",
  },
  imageLose: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    border: "2px solid #ff8ba7",
    filter: "grayscale(100%) opacity(80%)",
  },
  imageLoseBlur: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    border: "2px solid #ff8ba7",
    filter: "grayscale(100%) blur(5px) opacity(80%)",
    transform: "scale(1.1)",
  },
  image: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    border: "2px solid #ff8ba7",
  },
  iconOut: {
    color: "#FF8BA7",
    marginTop: "20px",
    marginLeft: "15px",
  },
  left: {
    textAlign: "left",
  },
}));

const EndPage = () => {
  const classes = useStyles();
  const historyBrowser = createBrowserHistory();
  const history = useHistory();
  const { user, rival, gameStatus } = historyBrowser.location.state.data;
  const { setUser } = useContext(UserContext);
  const {
    setPlayerTurn,
    setMessages,
    setGameStatus,
    setMatch,
    setStage,
    setPicShown,
    setCurrentQuiz,
    setOwnAnswer,
    setRivalAnswer,
    picShown
  } = useContext(GameContext);

  const handleLogOut = async (e) => {
    console.log("LOGIN OUT");
    e.preventDefault();
    try {
      await deleteCurrentGame();
      await logout();
    } catch (error) {
      console.log("Error login out" + error);
    }

    history.push("/");
  };

  const newGame = async (e) => {
    console.log("Start new game");

    if (gameStatus === "LOSE") {
      try {
        // PREPARE FOR NEW GAME
        let updatedUser = await deleteCurrentGame();
        console.log("Updated user " + JSON.stringify(updatedUser));
        setUser(updatedUser);
        // RESET GAME
        resetStates();
        history.push("/introduce");
      } catch (error) {
        console.log("Error deleting game from user " + error);
      }
    } else if (gameStatus === "WIN") {
      // CONTINUE TALKING WITHOUT LIMITS
      setGameStatus("MATCHED");
      history.push("/game");
    }
  };

  const resetStates = () => {
    setPlayerTurn("");
    setMessages([]);
    setGameStatus("PLAYING");
    setMatch(100);
    setStage(0);
    setPicShown(0);
    setCurrentQuiz({});
    setOwnAnswer(undefined);
    setRivalAnswer(undefined);
  };

  return (
    <div className={classes.left}>
      <ExitToAppIcon className={classes.iconOut} onClick={handleLogOut} />
      <Grid container className={classes.page}>
        <Grid item xs={12} align="center">
          <Avatar
            alt={user?.username}
            src={user?.image1.url}
            className={
              gameStatus === "LOSE" ? classes.imageLose : classes.image
            }
          />
        </Grid>

        <Grid item xs={12} align="center">
          <Typography component="h1" className={classes.title}>
            {gameStatus === "LOSE"
              ? "There where no future :("
              : "It's your turn! ;-)"}
          </Typography>
        </Grid>

        <Grid item xs={12} align="center">
          <Avatar
            alt={rival?.username}
            src={rival?.image1.url}
            className={
              gameStatus === "LOSE" ? (picShown >= 1 ? classes.imageLose: classes.imageLoseBlur) : classes.image
            }
          />
        </Grid>

        <Grid item xs={12} align="center">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={newGame}
          >
            {gameStatus === "LOSE" ? "Try another one!" : "Keep on talking!"}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default EndPage;
