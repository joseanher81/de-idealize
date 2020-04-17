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
  rivalText: {
    textAlign: "left",
    fontSize: "1.3em",
    paddingTop: "0.5em",
    paddingBottom: "0.5em",
    paddingLeft: "1em",
    backgroundColor: "#c3f0ca",
    border: "1px solid #ffc6c7",
    borderRadius: "15px 15px 15px 0",
  },
  ownText: {
    textAlign: "left",
    fontSize: "1.3em",
    paddingTop: "0.5em",
    paddingBottom: "0.5em",
    paddingLeft: "1em",
    backgroundColor: "#ffc6c7",
    border: "1px solid #ffc6c7",
    borderRadius: "15px 15px 0 15px",
  },
}));

const Bubble = (props) => {
  const classes = useStyles();
  const { msg } = props;

  return (
    <Grid
      container
      className={`${msg.own ? classes.rightChat : classes.leftChat}`}
    >
      <Grid
        item
        xs={6}
        className={`${msg.own ? classes.ownText : classes.rivalText}`}
      >
        {msg.text}
      </Grid>
    </Grid>
  );
};

export default Bubble;
