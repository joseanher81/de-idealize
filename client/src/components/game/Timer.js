import React, { useEffect, useState, useContext } from "react";
import { makeStyles, Typography, Box } from "@material-ui/core";
import { GameContext } from "./../../contexts/gameContext";
import {  sendTimeOut } from "./../../services/socketService";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

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
  const init_time = 45; // time for answering in seconds
  const classes = useStyles();
  const { messages } = props;
  const [seconds, setSeconds] = useState(init_time);
  const [percentage, setPercentage] = useState(100);
  const { gameStatus, setGameStatus, rival } = useContext(GameContext);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    if (timedOut){
      // Send time out notification to rival
      sendTimeOut(rival._id);
    } 
  }, [timedOut]);

  useEffect(() => {
    let currentMilis = 0;
    let currentTime = init_time;
    let initialTime = init_time;

    const intervalId = setInterval(function () {
      currentMilis++;
      if (currentMilis % 100 === 0) currentTime--;
      if (currentTime < 0 && gameStatus !== "MATCHED") {
        setTimedOut(true); // Send time out to rival
        setGameStatus("LOSE");
        clearInterval(intervalId);
      }
      setSeconds(getSeconds());
      setPercentage(getPercentage());
    }, 10);

    const getSeconds = () => Math.floor(currentTime % 60);
    const getPercentage = () => (currentTime * 100) / initialTime;

    return () => clearInterval(intervalId);
  }, [messages]);

  return (
    <Box className={classes.boxOutter}>
      <Typography variant="subtitle1" gutterBottom className={classes.title}>
        Your turn... Hurry up!
      </Typography>

      <Box className={classes.boxInner}>
        <CircularProgressbar
          value={percentage}
          text={`${seconds}`}
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
              fontSize: "2.5em"
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Timer;
