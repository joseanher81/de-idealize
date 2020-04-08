import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { UserContext } from "./contexts/userContexts";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { createTheme } from "./components/theme";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import GamePage from "./pages/GamePage";

function App() {
  const theme = createTheme();

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/game" component={GamePage} />
        </Switch>
      </ThemeProvider>
    </div>
  );
}

export default App;
