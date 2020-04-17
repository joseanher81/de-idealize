import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  head: {
    height: "25vh",
  },
  name: {
    color: "#594A4E",
    paddingTop: 10,
  },
  icon: {
    fontSize: "7em",
    color: "#FF8BA7",
  },
}));

const Head = (props) => {
  const classes = useStyles();
  const { rival } = props;

  return (
    <Container className={classes.head}>
      <Typography component="h1" variant="h5" className={classes.name}>
        {rival && rival.username}
      </Typography>
      <Grid container>
        <Grid item xs={4}>
          <AccountCircleIcon className={classes.icon} />
        </Grid>
        <Grid item xs={4}>
          <AccountCircleIcon className={classes.icon} />
        </Grid>
        <Grid item xs={4}>
          <AccountCircleIcon className={classes.icon} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Head;
