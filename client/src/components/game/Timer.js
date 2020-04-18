import React, { useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({}));

const Timer = (props) => {
  const classes = useStyles();
  const refTimer = useRef();
  const { messages } = props;

  useEffect(() => {
    refTimer.current.innerHTML = "Testing";
    let currentMilis = 0;
    let currentTime = 599;

    const intervalId = setInterval(function () {
      currentMilis++;
      if (currentMilis % 100 == 0) currentTime--;
      refTimer.current.innerHTML = `${getMinutes()} : ${getSeconds()}`;
    }, 10);

    const getMinutes = () => Math.floor(currentTime / 60);
    const getSeconds = () => Math.floor(currentTime % 60);

    return () => clearInterval(intervalId);

    // TODO Check conditions
  }, [messages]);

  return (
    <div>
      <p>Timer</p>
      <p ref={refTimer}></p>
    </div>
  );
};

export default Timer;
