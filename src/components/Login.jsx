import React from 'react';
import { Container, Typography, makeStyles, Paper, TextField, Button, Avatar } from '@material-ui/core';
import { LockOpen, Twitter } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    cont : {
        paddingTop: '15%'
    },
    twitter : {
        color: 'white',
        fontSize: '70px',
        paddingLeft: '43%',
        paddingBottom: '2%'
    },
    welcome : {
        color:'white',
        fontSize: '31px',
        paddingBottom: '15%'                    
    },
    heading : {
        paddingTop: '10px'
    },
    avatar: {
        margin: 'auto',
        backgroundColor: theme.palette.primary.main,
    },
    login : {
        paddingTop: '10px'
    },
    form : {
        padding: '20px',
        paddingTop: '0px',
        paddingBottom: '10px',
        color: 'white'

    }, 
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    grid : {
        paddingTop: '10px',
        
    },
    link : {
        textDecoration: 'none',
        color : theme.palette.primary.main
    }
}));

const Login = () => {
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="sm">
            <div className={classes.cont}>
                <Twitter className={classes.twitter}/>    
                <Typography className={classes.welcome}>
                    WELCOME BACK TO THE DASHBOARD!
                </Typography>
                <Paper elevation={5}>
                    <div class={classes.heading}>
                        <Avatar className={classes.avatar}>
                            <LockOpen />
                        </Avatar>
                        <Typography className={classes.login} align="center" variant="h4">
                            LOG IN
                        </Typography>
                    </div>
                    <form className={classes.form}>
                        <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
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
                        <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        className={classes.submit}
                        >
                        Log In
                        </Button>
                        <Link to="/" variant="body2" className={classes.link}>
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </form>    
                </Paper>
            </div>
        </Container>
    )

}

export default Login;