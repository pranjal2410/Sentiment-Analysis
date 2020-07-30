import React, { useState } from 'react';
import axios from 'axios';
import { Container ,Grid, Typography, makeStyles, Paper, TextField, Button, Avatar, FormControlLabel, Checkbox, IconButton } from '@material-ui/core';
import { LockOutlined, Twitter, Visibility, VisibilityOff } from '@material-ui/icons';
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

    const [values, setValues] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
        confirm: '',
        city: '',
        state: '',
        twitter: false,
        showPassword: false,
    });
    const [fnameerror, setFNameError] = useState(false);
    const [lnameerror, setLNameError] = useState(false);
    const [emailerror, setEmailError] = useState(false);
    const [passworderror, setPasswordError] = useState(false);
    const [confirmerror, setConfirmError] = useState(false);
    const [cityerror, setCityError] = useState(false);
    const [stateerror, setStateError] = useState(false);
    const [signuperror, setSignupError] = useState(false);

    const handleChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value})
        setSignupError(false);
        if(values.currentTarget.id === 'fname') {
            setFNameError(event.target.value === '');
        }
        if(values.currentTarget.id === 'lname') {
            setLNameError(event.target.value === '');
        }
        if(event.currentTarget.id === 'email') {
            setEmailError(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(event.currentTarget.value));
        }
        if(event.currentTarget.id === 'password') {
            var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
            setPasswordError(!strongRegex.test(event.target.value));
        }
        if(event.currentTarget.id === 'confirm') {
            setConfirmError(values.password !== event.password.value);
        }
        if(values.currentTarget.id === 'city') {
            setCityError(event.target.value === '');
        }
        if(values.currentTarget.id === 'state') {
            setStateError(event.target.value === '');
        }
        if(values.currentTarget.id === 'twitter') {
            setValues({...values, twitter: !values.twitter})
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(!emailerror && !passworderror && !confirmerror && !fnameerror && !lnameerror && !cityerror && !stateerror) {
            axios({
                method:'post',
                headers : {
                    'Content-Type':'application/json'
                },
                data : {
                    fname: values.fname,
                    lname: values.lname,
                    email: values.email,
                    password: values.password,
                    city: values.city,
                    state: values.state,
                    twitter: values.twitter,
                },
                url: '/api/signup',
            })
            .then(response => {
                let date = new Date();
                date.setTime(date.getTime() +  180 * 60 * 1000);     // 180 minutes
                let expiration = `expires ${date.toUTCString()}`;
                document.cookie = `usertoken = ${response.data.token}; ${expiration} ;path=/`; 
                setSignupError(false);
            })
            .catch(error => {
                setSignupError(true);
            })
        }
    }
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
                    <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="firstName"
                                id="fname"
                                variant="outlined"
                                label="First Name"
                                onChange={handleChange}
                                error={fnameerror}
                                helperText={fnameerror ? "This is a required field!" : null}
                                autoFocus required fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="lastName"
                                id="lastName"
                                variant="outlined"
                                label="Last Name"
                                onChange={handleChange}
                                error={lnameerror}
                                helperText={lnameerror ? "This is a required field!": null}
                                autoFocus required fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="email"
                                id="email"
                                variant="outlined"
                                label="Email Address"
                                onChange={handleChange}
                                error={emailerror}
                                helperText={emailerror ? (values.email.length ? "Invalid email ID" : "Email Address required ") : null}
                                autoFocus required fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                name="password"
                                label="Password"
                                type = { values.showPassword ? 'text': 'password'}
                                id="password"
                                onChange={handleChange}
                                helperText = {passworderror ? 
                                            values.password.length ? 
                                            "Password must have atleast 8 characters with 1 small letter, capital letter, number and symbol":"Password is required":null}
                                error={passworderror}
                                InputProps = {{
                                endAdornment: 
                                    <IconButton 
                                        aria-label= "toggle password visibility" 
                                        onClick={() => setValues({...values, showPassword:  !values.showPassword})}
                                    >
                                        { values.showPassword ? <Visibility/ > : <VisibilityOff />}
                                    </IconButton>

                                }}
                                required fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                name="confirm"
                                label="Confirm Password"
                                type = { values.showPassword ? 'text': 'password'}
                                id="confirm"
                                onChange={handleChange}
                                helperText= {
                                    confirmerror ? (values.confirm.length ? "Passwords do not match" : "Confirm password is required") : null
                                }
                                error={confirmerror}
                                InputProps = {{
                                endAdornment: 
                                    <IconButton 
                                        aria-label= "toggle password visibility" 
                                        onClick={() => setValues({...values, showPassword:  !values.showPassword})}
                                    >
                                        { values.showPassword ? <Visibility/ > : <VisibilityOff />}
                                    </IconButton>

                                }}
                                required fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <TextField
                                name="city"
                                id="city"
                                variant="outlined"
                                label="Enter city name"
                                onChange={handleChange}
                                error={cityerror}
                                helperText={cityerror ? "This is a required field!" : null}
                                autoFocus required fullWidth
                            />
                        </Grid> 
                        <Grid item xs={12} sm={7}>
                            <TextField
                                name="state"
                                id="state"
                                variant="outlined"
                                label="Enter state name"
                                onChange={handleChange}
                                error={stateerror}
                                helperText={stateerror ? "This is a required field!" : null}
                                autoFocus required fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                        <FormControlLabel
                            onClick={handleChange}
                            control={<Checkbox name="twitter"  color="primary" />}
                            label="I have a Twitter account"
                            id="twitter"
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