import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import { Container ,Grid, Typography, makeStyles, Paper, TextField, Button, Avatar, FormControlLabel, Checkbox, IconButton } from '@material-ui/core';
import { LockOutlined, Twitter, Visibility, VisibilityOff } from '@material-ui/icons';

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
        padding: '0px 20px 10px',
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
    const dummy = null;
    const history = useHistory();
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
        setValues({...values, [event.target.id]: event.target.value})
        
        setSignupError(false);
        
        if(event.currentTarget.id === 'fname') {
            setFNameError(event.target.value === '');
        }
        if(event.currentTarget.id === 'lname') {
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
            setConfirmError(values.password !== event.target.value);
        }
        if(event.currentTarget.id === 'city') {
            setCityError(event.target.value === '');
        }
        if(event.currentTarget.id === 'state') {
            setStateError(event.target.value === '');
        }
        if(event.currentTarget.id === 'twitter') {
            setValues({...values, twitter: !values.twitter})
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(!emailerror && !passworderror && !confirmerror && !fnameerror && !lnameerror && !cityerror && !stateerror) {
            axios({
                method:'post',
                headers : {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type":"application/json"
                },
                data : {
                    first_name: values.fname,
                    last_name: values.lname,
                    email: values.email,
                    password: values.password,
                    city: values.city,
                    state: values.state,
                    twitter: values.twitter,
                },
                url: '/api/register/',
            })
            .then(response => {
                let date = new Date();
                date.setTime(date.getTime() +  180 * 60 * 1000);     // 180 minutes
                let expiration = `expires ${date.toUTCString()}`;
                document.cookie = `usertoken=${response.data.token}; expires=${expiration} ;path=/`; 
                setSignupError(false);
                history.push('/dashboard');
            })
            .catch(() => {
                setSignupError(true);
            })
        }
    }
    useEffect(() => {
        let token = document.cookie.split('=')[1];
        if(token !== '' && token !== undefined) {
            history.push('/dashboard')
        } 
    },[dummy, history])


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
                        {signuperror ?
                        <Typography style={{color:'red', textAlign:'center'}}>
                            Email Already Registered 
                        </Typography>
                        :
                        null}
                    </div>
                    <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={fnameerror}
                                variant="outlined"
                                margin="normal"
                                id="fname"
                                label="First Name"
                                type="text"
                                autoComplete="First Name"
                                onChange={handleChange}
                                helperText={fnameerror ? "This is a required field!" : null}
                                autoFocus required fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={lnameerror}
                                variant="outlined"
                                margin="normal"
                                id="lname"
                                label="Last Name"
                                type="text"
                                autoComplete="Last Name"
                                onChange={handleChange}
                                helperText={lnameerror ? "This is a required field!" : null}
                                autoFocus required fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="email"
                                variant="outlined"
                                label="Email Address"
                                onChange={handleChange}
                                error={emailerror || signuperror}
                                helperText={emailerror ? (values.email.length ? "Invalid email ID" : "Email Address required ") : null}
                                autoFocus required fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
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