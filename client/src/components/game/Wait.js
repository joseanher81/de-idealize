import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  boxOutter: {
    marginTop: "1em",
  },
  title: {
    color: "#ff8ba7",
  },
}));

const Wait = () => {
  const classes = useStyles();

  return (
    <Box className={classes.boxOutter}>
      <Typography variant="subtitle1" gutterBottom className={classes.title}>
        Wait... :P
      </Typography>
    </Box>
  );
};

export default Wait;
