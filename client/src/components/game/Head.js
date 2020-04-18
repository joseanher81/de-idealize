import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { GameContext } from "./../../contexts/gameContext";

const useStyles = makeStyles((theme) => ({
  head: {
    height: "25vh",
    borderBottom: "1px solid #ff8ba7",
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
    width: theme.spacing(9),
    height: theme.spacing(9),
    filter: "blur(5px)",
    border: "2px solid #ff8ba7",
    transform: "scale(1.1)",
  },
  item: {
    marginTop: "1em",
  },
}));

const Head = (props) => {
  const classes = useStyles();
  const { rival } = props;
  const { match } = useContext(GameContext);

  return (
    <Container className={classes.head}>
      <Typography component="h1" variant="h5" className={classes.name}>
        {rival && rival.username}
      </Typography>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item xs={2} className={classes.item}>
          <Avatar
            alt={rival?.username}
            src={rival?.image1.url}
            className={classes.image}
          />
        </Grid>
        <Grid item xs={2} className={classes.item}>
          <Avatar
            alt={rival?.username}
            src={rival?.image2.url}
            className={classes.image}
          />
        </Grid>
        <Grid item xs={2} className={classes.item}>
          <Avatar
            alt={rival?.username}
            src={rival?.image3.url}
            className={classes.image}
          />
        </Grid>
        <Grid item xs={3} className={classes.item}>
          <CircularProgressbar
            value={match}
            text={`${match}%`}
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
        </Grid>
      </Grid>
    </Container>
  );
};

export default Head;
