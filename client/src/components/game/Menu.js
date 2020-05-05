import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "10vh",
  },
  iconButton:{
    paddingLeft: "3px",
  },
  deidealize: {
    flexGrow: 1,
    fontFamily: "Sacramento",
    fontSize: "2.5em",
    color: "#FFFFFE",
    paddingTop: 2,
    paddingBottom: 2,
  },
}));

export default function MenuAppBar({ setDrawer }) {
  const classes = useStyles();

  const handleMenu = (event) => {
    setDrawer(true);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
    
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            </div>
          
            <Typography variant="h6" className={classes.deidealize}>
            De-Idealize
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
