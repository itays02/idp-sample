import React, {useState} from 'react';
import axios from "axios";
import { Button, TextField } from "@material-ui/core";

import useStyles from "./styles";
import headerImage from "./images/header.png";
import logo from './images/logo.png';

function App () {
    const classes = useStyles()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function redirectSaml(e) {
        e.preventDefault()
        const samlRequest = new URLSearchParams(window.location.search).get('SAMLRequest')
        try {
            const response = await axios.post(`/idp/login?SAMLRequest=${encodeURIComponent(samlRequest)}`, {
                email,
                password
            })
            window.location.href = response.data
        } catch (error) {
            console.log(error);
        }
    }

    return (
      <div className={classes.root}>
          <img className={classes.headerImage} src={headerImage}/>
          <div className={classes.content}>
              <div className={classes.formDiv}>
                  <label className={classes.label}>My Account</label>
                  <form className={classes.form} onSubmit={redirectSaml}>
                      <TextField className={classes.textField} fullWidth
                                 id="standard-basic"
                                 value={email}
                                 label="Email"
                                 onChange={e => setEmail(e.target.value)}
                                 variant="filled"
                      />
                      <TextField className={classes.textField} fullWidth
                                 id="standard-password-input"
                                 label="Password"
                                 type="password"
                                 value={password}
                                 onChange={e => setPassword(e.target.value)}
                                 autoComplete="current-password"
                                 variant="filled"
                      />
                      <Button color="primary" className={classes.submit} type={"submit"}>Sign In</Button>
                  </form>
              </div>
              <div>
                  <img className={classes.logo} src={logo}/>
              </div>
          </div>
      </div>
    );
}

export default App;
