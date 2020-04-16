import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  leftChat: {
    justifyContent: "flex-start",
    marginTop: "1em",
    paddingLeft: "1em",
  },
  rightChat: {
    justifyContent: "flex-end",
    marginTop: "1em",
    paddingRight: "1em",
  },
  text: {
    textAlign: "left",
    fontSize: "1.3em",
    paddingTop: "0.5em",
    paddingBottom: "0.5em",
    paddingLeft: "1em",
    backgroundColor: "#c3f0ca",
    border: "1px solid #ffc6c7",
    borderRadius: "5px",
  },
}));

const Bubble = (props) => {
  const classes = useStyles();
  const { msg, ownMsg } = props;

  return (
    <Grid
      container
      className={`${ownMsg ? classes.leftChat : classes.rightChat}`}
    >
      <Grid item xs={6} className={classes.text}>
        {msg}
      </Grid>
    </Grid>
  );
};

export default Bubble;
