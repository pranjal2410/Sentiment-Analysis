import React from 'react';
import { Container ,Grid, Typography, makeStyles, Paper, TextField, Button, Avatar, FormControlLabel, Checkbox } from '@material-ui/core';
import { LockOutlined, Twitter } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    cont : {
        paddingTop: '15%'
    },
    twitter : {
        color: '#1dadf2',
        fontSize: '70px',
        paddingLeft: '43%',
        paddingBottom: '2%'
    },
    welcome : {
        fontSize: '36px',                  
    }, 
    heading : {
        paddingTop: '10px'
    },
    avatar: {
        margin: 'auto',
        backgroundColor: theme.palette.primary.main,
    },
    signup : {
        paddingTop: '10px'
    }, 
    form : {
        padding: '20px',
        paddingTop: '5px',
        paddingBottom: '10px',
    },
    grid : {
        paddingTop : theme.spacing(1)
    },
    link : {
        textDecoration: 'none',
        color : theme.palette.primary.main
    }
}));

const Signup = () => {
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="sm">
            <div className={classes.cont}>
                <Twitter className={classes.twitter}/>    
                <Typography className={classes.welcome}>
                    SIGN UP TO UNRAVEL. IT'S FREE!
                </Typography>
                <Paper className={classes.paper} elevation={5}>
                    <div class={classes.heading}>
                        <Avatar className={classes.avatar}>
                            <LockOutlined />
                        </Avatar>
                        <Typography className={classes.signup} align="center" variant="h4">
                            SIGN UP
                        </Typography>
                    </div>
                    <form className={classes.form}>
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
                            />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="city"
                                label="Enter your city"
                                name="city"
                                autoComplete="city"
                            />
                        </Grid> 
                        <Grid item xs={12} sm={7}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="state"
                                label="Enter your state"
                                name="state"
                                autoComplete="state"
                            />
                        </Grid>
                        <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox value="allowExtraEmails" color="primary" />}
                            label="I have a Twitter account"
                        />
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
                    <Grid container className={classes.grid}>
                        <Grid item className={classes.grid}>
                        <Link to="/" variant="body2" className={classes.link}>
                            Already have an account? Log in
                        </Link>
                        </Grid>
                    </Grid>            
                    </form>    
                </Paper>
            </div>
        </Container>
    )

}

export default Signup;