// Signup component is rendered if the user needs to create a new account
import React, { useRef, useState } from "react";
import API from "../utils/API";

import { Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Signup() {
    // setting up state on if the user wants to create a manager account
    const [ isManager, setIsManager ] = useState(false);

    // setting up references to the user's input
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const firstNameRef = useRef("");
    const lastNameRef = useRef("")

    // When the submit button is pressed this event is triggered
    const submitHandler = (event) => {

        // preventing the page from refreshing 
        event.preventDefault();
        // creating a easy object to pass to the information to
        const userData = {
            email: emailRef.current.value.trim(),
            password: passwordRef.current.value.trim(),
            firstname: firstNameRef.current.value.trim(),
            lastname: lastNameRef.current.value.trim()
        };

        // Making sure all data is filled out
        if (!userData.email || !userData.password || !userData.firstname || !userData.lastname) {
            return;
        }

        // using the userData as parameters to the signup Function and resetting the input values
        signUpUser(userData.email, userData.password, isManager, userData.firstname, userData.lastname);
        emailRef.current.value = "";
        passwordRef.current.value = "";
        firstNameRef.current.value = "";
        lastNameRef.current.value = "";
    };

    // creating a function that uses the UserSignUp API function to create a post request for the server to handle
    const signUpUser = (email, password, isManager, firstname, lastname) => {
        API.UserSignUp(email, password, isManager, firstname, lastname)
        .then(result => console.log(result))
        .catch(error => console.log(error));
    }

    // setting the state of isManager to true or false for the signup function
    const isManagerCheck = () => {
        (isManager === false) ? setIsManager(true) : setIsManager(false)
    }

    const useStyles = makeStyles((theme) => ({
      paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
    }));

    const classes = useStyles();

    return(
      <div className="loginForm">
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  inputRef={firstNameRef}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  inputRef={lastNameRef}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  inputRef={emailRef}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  inputRef={passwordRef}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Are you a manager"
                  onClick={isManagerCheck}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={submitHandler}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
    )
}

export default Signup