import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({}));

const Bubble = (props) => {
  const classes = useStyles();
  const { msg } = props;

  return <p>{msg}</p>;
};

export default Bubble;
