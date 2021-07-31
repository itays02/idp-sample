import React, {useEffect, useState} from 'react';
import axios from 'axios';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import constants from "../constants";
import useStyles from "../styles";

function User() {
    const classes = useStyles()
    const [user, setUser] = useState({})

    useEffect(() => {
        getUserApi()
    }, []);

    async function getUserApi() {
        try {
            await axios.post(`${constants.Sp}/acs`, {
                SAMLResponse: window.location.search.match(/SAMLResponse=([^&]*)/)[1]
            }, { withCredentials: true })

            const response = await axios.get(`${constants.Sp}/user`,{ withCredentials: true } ) || {}
            setUser(response.data)
        } catch (err) {
            console.log(err)
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
                        <TableRow key={"role"}>
                            <TableCell component="th" scope="row">Role</TableCell>
                            <TableCell component="th" scope="row">{user.role}</TableCell>
                        </TableRow>
                        <TableRow key={"roles"}>
                            <TableCell component="th" scope="row">Roles</TableCell>
                            <TableCell component="th" scope="row">{user.roles}</TableCell>
                        </TableRow>
                        <TableRow key={"phone"}>
                            <TableCell component="th" scope="row">Phone</TableCell>
                            <TableCell component="th" scope="row">{user.phone}</TableCell>
                        </TableRow>
                        <TableRow key={"createdAt"}>
                            <TableCell component="th" scope="row">Created At</TableCell>
                            <TableCell component="th" scope="row">{new Date(user.createdAt).toLocaleString()}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default User;
