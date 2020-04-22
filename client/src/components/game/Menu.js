import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GameContext } from "./../../contexts/gameContext";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import { useHistory } from "react-router-dom";
import { logout } from "./../../services/authService";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "10vh",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  iconButton:{
    paddingLeft: "3px",
  },
  title: {
    flexGrow: 1,
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

export default function MenuAppBar() {
  const history = useHistory();
  const {gameStatus} = useContext(GameContext);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = async (e) => {
    console.log("LOGIN OUT");
    setAnchorEl(null);
    try {
      const out = await logout();
      console.log("LOG OUT RESP " + out);
    } catch (error) {
      console.log("Error login out" + error);
    }

    history.push("/"); 
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
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                {(gameStatus==="MATCH") &&<MenuItem onClick={handleClose}>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                    className={classes.iconButton}
                  >
                    <DirectionsRunIcon />
                  </IconButton>
                  <p>Unmatch</p>
                </MenuItem>}
                <MenuItem onClick={handleClose}>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                    className={classes.iconButton}
                  >
                    <AccountCircle />
                  </IconButton>
                  <p>Profile</p>
                </MenuItem>
                <MenuItem onClick={handleLogOut}>
                  <IconButton
                    aria-label="log out"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                    className={classes.iconButton}
                  >
                    <ExitToAppIcon className={classes.iconOut}  />
                  </IconButton>
                  <p>Logout</p>
                </MenuItem>
              </Menu>
            </div>
          
            <Typography variant="h6" className={classes.deidealize}>
            De-Idealize
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
