import React, {useContext, useEffect} from 'react';
import { GameContext } from "./../../contexts/gameContext";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useHistory } from "react-router-dom";
import { logout } from "./../../services/authService";
import { deleteCurrentGame, addToBlackList } from "./../../services/userService";
import { unmatch } from "./../../services/socketService";

const MenuDrawer = ({ setOpenUnmatch }) => {
  const history = useHistory();
  const {gameStatus, rival} = useContext(GameContext);

  //LOGOUT
  const handleLogOut = async () => {
    console.log("UNMATCHING AND LOGIN OUT");
    try {
      await unmatch(rival._id); // Send unmatch notification to the other
      await addToBlackList(rival._id);
      await deleteCurrentGame();
      await logout();
    } catch (error) {
      console.log("Error login out" + error);
    }

    history.push("/"); 
  };

  //UNMATCH (Same as handleLogOut but possible differences on future)
  const handleUnmatch = async () => {
    console.log("UNMATCHING");
    try {
      await unmatch(rival._id); // Send unmatch notification to the other
      await addToBlackList(rival._id);
      await deleteCurrentGame();
      await logout();
    } catch (error) {
      console.log("Error login out" + error);
    }
  
    history.push("/"); 
  };

  return(
    <div>
      <List>
        <ListItem button>
          <ListItemIcon><AccountCircle /></ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      </List>
      <Divider />
      <List>
        {(gameStatus==="MATCHED") &&<ListItem button onClick={handleUnmatch}>
          <ListItemIcon><DirectionsRunIcon /></ListItemIcon>
          <ListItemText primary="Unmatch" />
        </ListItem>}
        {(gameStatus!=="MATCHED") &&<ListItem button onClick={handleLogOut}>
          <ListItemIcon><ExitToAppIcon /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>}
      </List>
    </div>
  );
}

export default MenuDrawer;