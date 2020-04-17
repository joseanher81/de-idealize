import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";

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
  image: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  item: {
    marginTop: "1em",
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
        <Grid item xs={4} className={classes.item} align="center">
          <Avatar
            alt="Remy Sharp"
            src="https://i.pinimg.com/originals/33/4f/5b/334f5bce0d22bc296a315839308d24a0.jpg"
            className={classes.image}
          />
        </Grid>
        <Grid item xs={4} className={classes.item} align="center">
          <Avatar
            alt="Remy Sharp"
            src="https://i.pinimg.com/originals/33/4f/5b/334f5bce0d22bc296a315839308d24a0.jpg"
            className={classes.image}
          />
        </Grid>
        <Grid item xs={4} className={classes.item} align="center">
          <Avatar
            alt="Remy Sharp"
            src="https://i.pinimg.com/originals/33/4f/5b/334f5bce0d22bc296a315839308d24a0.jpg"
            className={classes.image}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Head;
