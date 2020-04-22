import React, { useContext, useRef, useEffect } from "react";
import { UserContext } from "./../contexts/userContexts";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { signup } from "./../services/authService";

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
    margin: theme.spacing(3, 0, 2),
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
const SignupPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const { setUser } = useContext(UserContext);
  const { register, handleSubmit, errors } = useForm(); // initialise hook-form

  const onSubmit = async (data) => {
    const { username, password, email } = data;

    history.push("/profile", { data: { username, password, email } });

    /*     try {
      const user = await signup({ username, password });
      if (user) {
        setUser(user);
        history.push("/signup");
      } else {
        console.log("No se encuentra el usuario");
        // TODO mostrar mensaje
      }
    } catch (error) {
      console.log(error);
    } */
  };

  // For link to Login
  const handleLinkLogin = (e) => {
    e.preventDefault();
    history.push("/");
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email address"
            type="email"
            id="email"
            autoComplete="off"
            inputRef={register({ required: true })}
            error={!!errors.email}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Next
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link href="#" onClick={handleLinkLogin} variant="body2">
                {"Already a member? Log In"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignupPage;
