import React from 'react'
import { Button, InputLabel, TextField } from "@material-ui/core";

import { LOGIN_URL } from "../constants";

import useStyles from "../styles";

function Login() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <h3 className={classes.signInLabel}>
                Sign In to Demo App
            </h3>
            <InputLabel className={classes.field} color="secondary">
                User Name (Email)
            </InputLabel>
            <TextField className={classes.textField} variant="outlined" />
            <InputLabel className={classes.field} color="secondary">
                Password
            </InputLabel>
            <TextField className={classes.textField} variant="outlined" />
            <Button variant="contained" color="primary" className={classes.formButton}
                    onClick={() => window.location.href = LOGIN_URL }>
                Login using IdP Service
            </Button>
            <Button variant="contained" color="primary">
                Sign In
            </Button>
        </div>
    );
}

export default Login;
