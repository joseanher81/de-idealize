import React, { useContext, useEffect, useState } from "react";
import { makeStyles, Typography, Grid, Button, Avatar} from "@material-ui/core";
import { UserContext } from "./../contexts/userContexts";
import { GameContext } from "./../contexts/gameContext";
import { createGame, getGame, getMessages, saveStatus } from "./../services/gameService";
import { getUser } from "./../services/userService";
import { storeClientInfo, socket, sendAreYouThere, sendIAmHere } from "./../services/socketService";
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
  name:{
    fontWeight: "bold",
  },
  buttontext: {
    paddingRight: "20px",
    paddingLeft: "20px",
  },
}));

const IntroducePage = () => {
  const classes = useStyles();
  const history = useHistory();
  const [ready, setReady] = useState(false);
  const [iamhere, setIamhere] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const {
    setPlayerTurn,
    gameStatus,
    setGameStatus,
    game,
    setGame,
    setMatch,
    rival,
    setRival,
    setMessages
  } = useContext(GameContext);

  // Listening to readiness of the other player
  useEffect(() => {
    socket.on("areyouthere", function () {
      setIamhere(true);
    });
    return () => socket.off("areyouthere");
  }, []);

  useEffect(() => {
    socket.on("iamhere", function () {
      setReady(true);
    });
    return () => socket.off("iamhere");
  }, []);

  useEffect(()=> {
    if(iamhere) {
      sendIAmHere(rival._id);
      console.log("READY")
      setReady(true);
    }
  }, [iamhere]);

  //SETTING UP GAME
  useEffect(() => {
    console.log("Setting up game");
    if (gameStatus !== "MATCHED") setGameStatus("PLAYING"); // Check if the player has already matched

    // Save client info on socket server
    storeClientInfo(user._id);

    console.log("A ver " + JSON.stringify(user));

    // Check if user has to create a new game
    if (!user.currentGame || user.currentGame?.status==="PLAYING") {
      // USER HAS NO GAME
      console.log("User has not current game");

      // Create new game
      createGame(user._id)
        .then((data) => {
          const { game, playerA, playerB } = data;
          setGame(game);
          setUser(playerA);
          setRival(playerB);
          sendAreYouThere(playerB._id);
          setPlayerTurn(game.playerTurn);
        })
        .catch((e) => {
          console.log("Error creating game " + e);
        });
    } else {
      // USER HAS MATCHED GAME OR IS WAITING TO START
      console.log("User has matched game");

      // Get current game
      getGame(user._id)
        .then((game) => {
          setGame(game);
          setPlayerTurn(game.playerTurn);
          setMatch(game.matchPercent);

          if (game.status === "MATCHED") {
            setGameStatus("MATCHED");
            setReady(true);
          } 

          // Get current rival
          let rival = user._id === game.playerA ? game.playerB : game.playerA;

          getUser(rival)
            .then((player) => {
              setRival(player);
              sendAreYouThere(player._id);
            })
            .catch((e) => {
              console.log("Error getting player " + e);
            });

          // Load old messages
          getMessages(game._id)
            .then((messages) => {
            
            // Process messages
            let newMessages = messages.map(msg => {
              return {text: msg.text, own: (user._id===msg.user)};
            });

            console.log("A ver que tenemos " + JSON.stringify(newMessages));

            setMessages(newMessages);
            })
            .catch((e) => {
              console.log("Error getting messages" + e);
            });
          
          
        })
        .catch((e) => {
          console.log("Error getting game " + e);
        });
    }
  }, []);

  const startGame = async (e) => {
    console.log("Starting new game");

    //Change game status if it is not an already MATCHED state
    if(game.status!=="MATCHED") saveStatus(game._id, "PLAYING");

    // Go to game page
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
            You are gonna meet <div className={classes.name}>{rival?.username}</div>
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
            disabled={!ready}
            onClick={startGame}
          >
            <span className={classes.buttontext}>{ready ? "Let's start!" : "Waiting player"}</span>
            
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default IntroducePage;
