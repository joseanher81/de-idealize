import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import { useHistory } from "react-router-dom";
import { createBrowserHistory } from "history";

const useStyles = makeStyles((theme) => ({
  page: {
    display: "flex",
    alignItems: "center",
    height: "100vh",
  },
  item: {},
  submit: {},
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
  image: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    border: "2px solid #ff8ba7",
  },
}));

const EndPage = () => {
  const classes = useStyles();
  const historyBrowser = createBrowserHistory();
  const history = useHistory();
  const { user, rival, gameStatus } = historyBrowser.location.state.data;

  const newGame = (e) => {
    console.log("Start new game");
    history.push("/game");

    //TODO MIRAR RESETEO DE JUEGO
  };

  return (
    <Grid container className={classes.page}>
      <Grid item xs={12} align="center">
        <Avatar
          alt={user?.username}
          src={user?.image1.url}
          className={gameStatus === "LOSE" ? classes.imageLose : classes.image}
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
          className={gameStatus === "LOSE" ? classes.imageLose : classes.image}
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
  );
};

export default EndPage;
