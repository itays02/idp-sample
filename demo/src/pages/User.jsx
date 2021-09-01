import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Button, FormLabel, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@material-ui/core";

import { HOME_PAGE, LOGOUT_URL, ACS_URL, GET_USER_URL } from "../constants";

import useStyles from "../styles";

function User() {
    const classes = useStyles()
    const [user, setUser] = useState({})
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        getUserApi()
    }, []);

    async function getUserApi() {
        try {
            await axios.post(ACS_URL, {
                SAMLResponse: window.location.search.match(/SAMLResponse=([^&]*)/)[1]
            }, { withCredentials: true })

            const response = await axios.get(GET_USER_URL,{ withCredentials: true } ) || {}
            setUser(response.data)
        } catch (error) {
            error && setErrorMessage(error.response ? error.response.data : error.message)
        }
    }

    async function logout(){
        try {
            await axios.post(LOGOUT_URL, {
                email: user.email
            }, { withCredentials: true })
            window.location.href = HOME_PAGE
        } catch (error) {
            error && setErrorMessage(error.response ? error.response.data : error.message)
        }
    }

    return (
        <div className={classes.root}>
            <h2>Welcome {user.name}!</h2>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableBody>
                        <TableRow key={"id"}>
                            <TableCell component="th" scope="row">ID</TableCell>
                            <TableCell component="th" scope="row">{user.id}</TableCell>
                        </TableRow>
                        <TableRow key={"name"}>
                            <TableCell component="th" scope="row">Name</TableCell>
                            <TableCell component="th" scope="row">{user.name}</TableCell>
                        </TableRow>
                        <TableRow key={"email"}>
                            <TableCell component="th" scope="row">Email</TableCell>
                            <TableCell component="th" scope="row">{user.email}</TableCell>
                        </TableRow>
                        <TableRow key={"phone"}>
                            <TableCell component="th" scope="row">Phone</TableCell>
                            <TableCell component="th" scope="row">{user.phone}</TableCell>
                        </TableRow>
                        <TableRow key={"city"}>
                            <TableCell component="th" scope="row">City</TableCell>
                            <TableCell component="th" scope="row">{user.city}</TableCell>
                        </TableRow>
                        <TableRow key={"createdAt"}>
                            <TableCell component="th" scope="row">Created At</TableCell>
                            <TableCell component="th" scope="row">{new Date(user.createdAt).toLocaleString()}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained" color="primary" className={classes.logoutButton} onClick={logout}>
                Logout
            </Button>
            <FormLabel error={!!errorMessage}>{errorMessage}</FormLabel>
        </div>
    );
}

export default User;
