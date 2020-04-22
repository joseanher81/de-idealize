import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "./../contexts/userContexts";
import { GameContext } from "./../contexts/gameContext";
import { createGame, getGame } from "./../services/gameService";
import { getUser } from "./../services/userService";
import { storeClientInfo } from "./../services/socketService";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  page: {
    display: "flex",
    alignItems: "center",
    height: "100vh",
    paddingBottom: "2em",
  },
  item: {},
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
  imageBlurred: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    border: "2px solid #ff8ba7",
    filter: "grayscale(100%) blur(5px)",
  },
  image: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    border: "2px solid #ff8ba7",
  },
}));

const IntroducePage = () => {
  const classes = useStyles();
  //const historyBrowser = createBrowserHistory();
  const history = useHistory();
  //const { user, rival, gameStatus } = historyBrowser.location.state.data;
  const { user, setUser } = useContext(UserContext);
  const {
    setPlayerTurn,
    gameStatus,
    setGameStatus,
    game,
    setGame,
    rival,
    setRival,
  } = useContext(GameContext);

  //SETTING UP GAME
  console.log("1");
  useEffect(() => {
    console.log("SETTING UP GAME!");
    console.log("2");
    if (gameStatus !== "MATCHED") setGameStatus("PLAYING"); // Check if the player has already matched
    console.log("GAMESTATUS " + gameStatus);

    // Save client info on socket server
    storeClientInfo(user._id);

    // Check if user has an ongoing game
    if (!user.currentGame) {
      // USER HAS NO GAME
      console.log("USER HAS NOT CURRENT GAME and his userid is " + user._id);
      console.log("3");

      // Create new game
      createGame(user._id)
        .then((data) => {
          const { game, playerA, playerB } = data;
          console.log("GAME RECIEVED " + JSON.stringify(game));
          console.log("4");
          setGame(game);
          setUser(playerA);
          setRival(playerB);
          setPlayerTurn(game.playerTurn);
          console.log("5");
        })
        .catch((e) => {
          console.log("Error creating game " + e);
        });
    } else {
      // USER HAS GAME
      console.log("USER HAS GAME and his id is " + user.currentGame);
      console.log("7");

      // Get current game
      console.log("JUEGO " + game);
      getGame(user._id)
        .then((game) => {
          setGame(game);
          setPlayerTurn(game.playerTurn);
          console.log("8");
          console.log("GAME RECIEVED " + JSON.stringify(game));

          // Get current rival
          let rival = user._id === game.playerA ? game.playerB : game.playerA;

          getUser(rival)
            .then((player) => {
              console.log("Rival recieved" + JSON.stringify(player));
              setRival(player);
            })
            .catch((e) => {
              console.log("Error getting player " + e);
            });
        })
        .catch((e) => {
          console.log("Error getting game " + e);
        });
    }
  }, []);

  const startGame = async (e) => {
    console.log("Starting new game");
    history.push("/game");
  };

  return (
    <div>
      <Grid container className={classes.page}>
        <Grid item xs={12} align="center">
          <Avatar
            alt={user?.username}
            src={user?.image1.url}
            className={classes.image}
          />
        </Grid>

        <Grid item xs={12} align="center">
          <Typography component="h1" className={classes.title}>
            You are gonna meet {rival?.username} :D
          </Typography>
        </Grid>

        <Grid item xs={12} align="center">
          <Avatar
            alt={rival?.username}
            src={rival?.image1.url}
            className={classes.imageBlurred}
          />
        </Grid>

        <Grid item xs={12} align="center">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={startGame}
          >
            Let's start!
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default IntroducePage;
