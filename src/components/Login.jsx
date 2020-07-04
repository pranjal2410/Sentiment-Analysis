import React from 'react';
import { Container , Typography, makeStyles, Paper, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper : {
        backgroundColor: '#d3d3d3',
        
    },
    form : {
        paddingLeft: '10px',
        paddingRight: '10px'
    }
}));

const Login = () => {
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="sm">
            <Paper className={classes.paper} elevation={3}>
                <Typography className={classes.header} align="center" variant="h3">
                    LOGIN
                </Typography>
                <form className={classes.form}>
                    <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth="true"
                    required
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="Uuername"
                    autoFocus
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
                    autoComplete="password"
                    />
                </form>
                
            </Paper>
        </Container>
    )

}

export default Login;