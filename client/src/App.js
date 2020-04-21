import React, { useContext, useEffect } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { UserContext } from "./contexts/userContexts";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { createTheme } from "./components/theme";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import EndPage from "./pages/EndPage";
import GamePage from "./pages/GamePage";
import IntroducePage from "./pages/IntroducePage";
import { loggedin } from "./services/authService";
import { useHistory } from "react-router-dom";
import GameContextProvider from "./contexts/gameContext";

function App() {
  const theme = createTheme();
  const { setUser } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
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
  }, []);

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
