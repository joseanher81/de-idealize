import React, { useContext, useRef } from "react";
import { createBrowserHistory } from "history";
import { UserContext } from "./../contexts/userContexts";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { signup } from "./../services/authService";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { ageGenerator } from "./../lib/utils";

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
  formControl: {
    marginTop: theme.spacing(3),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ProfilePage = () => {
  const historyBrowser = createBrowserHistory();
  const history = useHistory();
  const classes = useStyles();
  const { setUser } = useContext(UserContext);
  const { register, handleSubmit, errors, control } = useForm(); // initialise hook-form

  // Get data from signup page
  const { username, password, email } = historyBrowser.location.state.data;

  //Handle submit
  const onSubmit = async (data) => {
    const { location, age, gender, looking, ageMin, ageMax } = data;

    try {
      const res = await signup({
        username,
        password,
        email,
        location,
        age,
        gender,
        looking,
        ageMin,
        ageMax,
      });

      if (res.user) {
        console.log("El usuario es " + JSON.stringify(res));
        setUser(res.user);
        history.push("/game");
      } else {
        console.log("Error en el signup");
        // TODO mostrar mensaje
      }
    } catch (error) {
      console.log(error);
    }
  };

  const inputRef = useRef();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {username}
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="location"
            label="Location"
            name="location"
            autoComplete="off"
            autoFocus
            inputRef={(e) => {
              register(e, { required: true });
              inputRef.current = e;
            }}
            error={!!errors.location}
          />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl
                fullWidth
                variant="outlined"
                className={classes.formControl}
                error={!!errors.age}
              >
                <InputLabel id="age-label">Age</InputLabel>

                <Controller
                  as={
                    <Select labelId="age-label" label="Age">
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {ageGenerator(18, 99).map((n) => {
                        return (
                          <MenuItem key={n} value={n}>
                            {n}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  }
                  name="age"
                  rules={{ required: "this is required" }}
                  control={control}
                  defaultValue=""
                />
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl
                fullWidth
                variant="outlined"
                className={classes.formControl}
                error={!!errors.gender}
              >
                <InputLabel id="gender-label">Gender</InputLabel>

                <Controller
                  as={
                    <Select labelId="gender-label" label="Gender">
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"Male"}>Male</MenuItem>
                      <MenuItem value={"Female"}>Female</MenuItem>
                    </Select>
                  }
                  name="gender"
                  rules={{ required: "this is required" }}
                  control={control}
                  defaultValue=""
                />
              </FormControl>
            </Grid>
          </Grid>

          <FormControl
            fullWidth
            variant="outlined"
            className={classes.formControl}
            error={!!errors.looking}
          >
            <InputLabel id="looking-label">Looking for</InputLabel>

            <Controller
              as={
                <Select labelId="looking-label" label="Looking for">
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                  <MenuItem value={"Both"}>Both</MenuItem>
                </Select>
              }
              name="looking"
              rules={{ required: "this is required" }}
              control={control}
              defaultValue=""
            />
          </FormControl>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl
                fullWidth
                variant="outlined"
                className={classes.formControl}
                error={!!errors.ageMin}
              >
                <InputLabel id="age-min-label">From</InputLabel>

                <Controller
                  as={
                    <Select labelId="age-min-label" label="From">
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {ageGenerator(18, 99).map((n) => {
                        return (
                          <MenuItem key={n} value={n}>
                            {n}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  }
                  name="ageMin"
                  rules={{ required: "this is required" }}
                  control={control}
                  defaultValue=""
                />
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl
                fullWidth
                variant="outlined"
                className={classes.formControl}
                error={!!errors.ageMax}
              >
                <InputLabel id="age-max-label">To</InputLabel>

                <Controller
                  as={
                    <Select labelId="age-max-label" label="To">
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {ageGenerator(18, 99).map((n) => {
                        return (
                          <MenuItem key={n} value={n}>
                            {n}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  }
                  name="ageMax"
                  rules={{ required: "this is required" }}
                  control={control}
                  defaultValue=""
                />
              </FormControl>
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default ProfilePage;
