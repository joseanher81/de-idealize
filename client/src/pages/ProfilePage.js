import React, { useContext, useRef, useState } from "react";
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
import IconButton from "@material-ui/core/IconButton";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import DoneIcon from "@material-ui/icons/Done";
import { changeAvatar } from "./../services/userService";

// Styles
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
    borderRadius: "10px 0 10px 0",
    margin: theme.spacing(3, 0, 2),
    height: "3em",
    color: "#fffffe",
    fontSize: "1.3em",
    fontWeight: "bold",
  },
  input: {
    display: "none",
  },
  icon: {
    fontSize: "4em",
  },
}));

const ProfilePage = () => {
  const historyBrowser = createBrowserHistory();
  const history = useHistory();
  const classes = useStyles();
  const { setUser } = useContext(UserContext);
  const { register, handleSubmit, errors, control } = useForm(); // initialise hook-form
  const [image1, setImage1] = useState();
  const [image2, setImage2] = useState();
  const [image3, setImage3] = useState();

  // Get data from signup page
  const { username, password, email } = historyBrowser.location.state.data;

  //Handle submit
  const onSubmit = async (data) => {
    const { location, age, gender, lookingFor, minAge, maxAge } = data;

    // Upload images
    let image1, image2, image3;
    try {
      image1 = await changeAvatar(data.file1[0]);
      image2 = await changeAvatar(data.file2[0]);
      image3 = await changeAvatar(data.file3[0]);
    } catch (error) {
      console.log("Error uploading file " + error);
    }

    if (minAge <= maxAge) {
      try {
        const user = await signup({
          username,
          password,
          email,
          location,
          age,
          gender,
          lookingFor,
          minAge,
          maxAge,
          image1,
          image2,
          image3,
        });

        if (user) {
          console.log("El usuario es " + JSON.stringify(user));
          setUser(user);
          history.push("/game");
        } else {
          console.log("Error en el signup");
          // TODO mostrar mensaje
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Bad age range");
      //TODO show message on screen
    }
  };

  const handleFiles = (e) => {
    console.log("Se seleccionó imagen " + e.target.id);
    if (e.target.id === "file1") setImage1(e.target);
    if (e.target.id === "file2") setImage2(e.target);
    if (e.target.id === "file3") setImage3(e.target);
  };

  const inputRef = useRef();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {username}
        </Typography>
        <Typography component="body1">Upload 3 cool pics of you</Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container>
            <Grid item xs={4}>
              <input
                accept="image/*"
                className={classes.input}
                id="file1"
                name="file1"
                type="file"
                onChange={(e) => handleFiles(e)}
                ref={register()}
              />
              <label htmlFor="file1">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  {!image1 && <AccountCircleIcon className={classes.icon} />}
                  {image1 && <DoneIcon className={classes.icon} />}
                </IconButton>
              </label>
            </Grid>
            <Grid item xs={4}>
              <input
                accept="image/*"
                className={classes.input}
                id="file2"
                name="file2"
                type="file"
                onChange={(e) => handleFiles(e)}
                ref={register()}
              />
              <label htmlFor="file2">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  {!image2 && <AccountCircleIcon className={classes.icon} />}
                  {image2 && <DoneIcon className={classes.icon} />}
                </IconButton>
              </label>
            </Grid>
            <Grid item xs={4}>
              <input
                accept="image/*"
                className={classes.input}
                id="file3"
                name="file3"
                type="file"
                onChange={(e) => handleFiles(e)}
                ref={register()}
              />
              <label htmlFor="file3">
                <IconButton
                  color="primary"
                  aria-label="upload picture3"
                  component="span"
                >
                  {!image3 && <AccountCircleIcon className={classes.icon} />}
                  {image3 && <DoneIcon className={classes.icon} />}
                </IconButton>
              </label>
            </Grid>
          </Grid>

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
            error={!!errors.lookingFor}
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
              name="lookingFor"
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
                error={!!errors.minAge}
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
                  name="minAge"
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
                error={!!errors.maxAge}
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
                  name="maxAge"
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
