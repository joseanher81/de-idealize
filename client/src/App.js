import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import GameContextProvider from "./contexts/gameContext";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { createTheme } from "./components/theme";
import {LoginPage, SignupPage, ProfilePage, EndPage, GamePage, IntroducePage} from "./pages";

function App() {
  const theme = createTheme();
  //const { setUser } = useContext(UserContext);
  //const history = useHistory();

  // I think it is better not to autologin according to game logic (Left this for reference)
/*   useEffect(() => {
    // When the app starts this runs only once
    console.log("WELCOME TO APP!");

    // Try to get the current logged in user from our backend
    loggedin()
      .then((user) => {
        console.log(`Welcome user` + JSON.stringify(user));
        console.log("HACIENDO LOGGEDIN");
        setUser(user);
        if (user) history.push("/game");
      })
      .catch((e) => {
        console.error("No user logged in ");
      });
  }, []); */

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route exact path="/profile" component={ProfilePage} />
          <GameContextProvider>
            <Route exact path="/introduce" component={IntroducePage} />
            <Route exact path="/game" component={GamePage} />
            <Route exact path="/end" component={EndPage} />
          </GameContextProvider>
        </Switch>
      </ThemeProvider>
    </div>
  );
}

export default App;
