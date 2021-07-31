import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Login from "./pages/Login";
import User from "./pages/User";

import useStyles from "./styles";

export default function App() {
    const classes = useStyles();

    return (
        <Router>
            <div className={classes.app}>
                <div className={classes.content}>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/user" component={User} />
                </Switch>
            </div>
            </div>
        </Router>
    );
}
