import React, { useContext, useRef, useEffect } from "react";
import { UserContext } from "./../contexts/userContexts";
import {makeStyles, Container, Button, CssBaseline, TextField, Link, Grid, Typography} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { login } from "./../services/authService";

// Styles
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    borderRadius: "10px 0 10px 0",
    margin: theme.spacing(3, 0, 2),
    height: "4em",
    color: "#fffffe",
    fontSize: "1.3em",
    fontWeight: "bold",
  },
  logo: {
    fontFamily: "Sacramento",
    fontSize: "3.5em",
    color: "#FF8BA7",
  },
}));

// Component
const LoginPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const { setUser } = useContext(UserContext);
  const { register, handleSubmit, errors } = useForm(); // initialise hook-form

  const onSubmit = async (data) => {
    const { username, password } = data;
    try {
      const user = await login({ username, password });
      if (user) {
        setUser(user);
        history.push("/introduce");
      } else {
        console.log("No se encuentra el usuario");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // For link to Signup
  const handleLinkSignup = (e) => {
    e.preventDefault();
    history.push("/signup");
  };

  // Autofocus setup
  const inputRef = useRef();
  useEffect(() => inputRef.current.focus(), []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography className={classes.logo} component="h1" variant="h5">
          De-Idealize
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="off"
            autoFocus
            inputRef={(e) => {
              register(e, { required: true });
              inputRef.current = e;
            }}
            error={!!errors.username}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="off"
            inputRef={register({ required: true })}
            error={!!errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log In
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link href="#" onClick={handleLinkSignup} variant="body2">
                {"New here? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default LoginPage;
