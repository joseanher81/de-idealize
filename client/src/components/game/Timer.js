import React, { useRef, useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { GameContext } from "./../../contexts/gameContext";
import { socket, sendTimeOut } from "./../../services/socketService";

const useStyles = makeStyles((theme) => ({
  boxOutter: {
    marginTop: "1em",
  },
  boxInner: {
    width: "80px",
    height: "80px",
    margin: "auto",
    marginTop: "0.5em",
  },
  title: {
    color: "#ff8ba7",
  },
}));

const Timer = (props) => {
  const classes = useStyles();
  const { messages } = props;
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(10);
  const [percentage, setPercentage] = useState(100);
  const { gameStatus, setGameStatus, rival } = useContext(GameContext);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    // Listen to timeout of rival
    socket.on("timeout", function () {
      setGameStatus("LOSE");
    });
  }, []);

  useEffect(() => {
    if (timedOut) sendTimeOut(rival._id);
  }, [timedOut]);

  useEffect(() => {
    let currentMilis = 0;
    let currentTime = 10;
    let initialTime = 10;

    const intervalId = setInterval(function () {
      currentMilis++;
      if (currentMilis % 100 === 0) currentTime--;
      if (currentTime < 0) {
        setTimedOut(true); // SEND TIMEOUT TO RIVAL
        setGameStatus("LOSE");
        clearInterval(intervalId);
      }
      setMinutes(getMinutes());
      setSeconds(getSeconds());
      setPercentage(getPercentage());
    }, 10);

    const getMinutes = () => Math.floor(currentTime / 60);
    const getSeconds = () => Math.floor(currentTime % 60);
    const getPercentage = () => (currentTime * 100) / initialTime;

    return () => clearInterval(intervalId);

    // TODO Check conditions
  }, [messages]);

  return (
    <Box className={classes.boxOutter}>
      <Typography variant="subtitle1" gutterBottom className={classes.title}>
        Your turn... Hurry up!
      </Typography>

      <Box className={classes.boxInner}>
        <CircularProgressbar
          value={percentage}
          text={`${minutes} : ${seconds}`}
          styles={{
            path: {
              // Path color
              stroke: "#ff8ba7",
              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: "round",
              // Customize transition animation
              transition: "stroke-dashoffset 0.5s ease 0s",
              // Rotate the path
              transform: "rotate(0.25turn)",
              transformOrigin: "center center",
            },
            text: {
              // Text color
              fill: "#ff8ba7",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Timer;
