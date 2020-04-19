import React, { useContext, useEffect } from "react";
import {
  makeStyles,
  Container,
  Typography,
  Grid,
  Avatar,
} from "@material-ui/core";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { GameContext } from "./../../contexts/gameContext";

const useStyles = makeStyles((theme) => ({
  head: {
    height: "25vh",
    borderBottom: "1px solid #FF8BA7",
  },
  name: {
    color: "#594A4E",
    paddingTop: 10,
  },
  imageBlur: {
    width: theme.spacing(9),
    height: theme.spacing(9),
    filter: "blur(5px)",
    border: "2px solid #FF8BA7",
    transform: "scale(1.1)",
  },
  imageSharp: {
    width: theme.spacing(9),
    height: theme.spacing(9),
    border: "2px solid #FF8BA7",
  },
  item: {
    marginTop: "1em",
  },
  percentage: {
    marginTop: "-5",
    color: "#FF8BA7",
  },
  iconHeart: {
    color: "#FF8BA7",
  },
}));

const Head = (props) => {
  const classes = useStyles();
  const { rival } = props;
  const { match, stage, picShown, setPicShown } = useContext(GameContext);

  // GAME LOGIC RELATED TO HEADER
  useEffect(() => {
    // Reveal a picture every 7 Stages
    if (stage !== 0 && stage % 7 === 0) setPicShown(picShown + 1);
  }, [stage]);

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
            className={picShown >= 1 ? classes.imageSharp : classes.imageBlur}
          />
        </Grid>
        <Grid item xs={2} className={classes.item}>
          <Avatar
            alt={rival?.username}
            src={rival?.image2.url}
            className={picShown >= 2 ? classes.imageSharp : classes.imageBlur}
          />
        </Grid>
        <Grid item xs={2} className={classes.item}>
          <Avatar
            alt={rival?.username}
            src={rival?.image3.url}
            className={picShown >= 3 ? classes.imageSharp : classes.imageBlur}
          />
        </Grid>
        <Grid item xs={3} className={classes.item}>
          <CircularProgressbarWithChildren
            value={match}
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
            }}
          >
            <FavoriteIcon className={classes.iconHeart} />
            <Typography variant="h6" className={classes.percentage}>
              {match}%
            </Typography>
          </CircularProgressbarWithChildren>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Head;
