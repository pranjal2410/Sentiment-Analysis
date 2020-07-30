import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, makeStyles, Paper, TextField, Button, Avatar, IconButton } from '@material-ui/core';
import { LockOpen, Twitter, Visibility, VisibilityOff } from '@material-ui/icons';
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
        fontSize: '31px',
        // paddingBottom: '15%'                    
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
    const [values,setValues] = useState({
        email: '',
        password: '',
        showPassword : false,
    });
    const [emailerror, setEmailError] = useState(false);
    const [passworderror, setPasswordError] = useState(false);
    const [loginerror, setLoginError] = useState(false);


    const handleChange = (event) => {
        setValues({...values, [event.currentTarget.id]: event.currentTarget.value})
        if(event.currentTarget.id === 'email') {
            setEmailError(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(event.currentTarget.value));
        }
        if(event.currentTarget.id === 'password') {
            setPasswordError(event.currentTarget.value.length ? false : true);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(!values.email.length)
			setEmailError(true);
		if(!values.password.length)
            setPasswordError(true);
        
        axios({
            method:'post',
            headers : {
                'Content-Type':'application/json'
            },
            data : {
                email : values.email,
                password : values.password
            },
            url: '/api/login',
        })
        .then(response => {
            let date = new Date();
            date.setTime(date.getTime() +  180 * 60 * 1000);     // 180 minutes
            let expiration = `expires ${date.toUTCString()}`;
            document.cookie = `usertoken = ${response.data.token}; ${expiration} ;path=/`; 
        })
        .catch(error => {
            setLoginError(true);
        })
    }

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
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <TextField
                            error={emailerror}
                            variant="outlined"
                            margin="normal"
                            id="email"
                            label="Email"
                            type="email"
                            autoComplete="Email"
                            onChange={handleChange}
                            helperText= { emailerror ? (values.email.length ? "Invalid Email Address" : "Required!") : null}
                            fullWidth required autoFocus
                        />
                        <TextField
                            error={passworderror || loginerror}
                            variant="outlined"
                            margin="normal"
                            label="Password"
                            id="password"
                            type = { values.showPassword ? 'text': 'password'}
                            onChange={handleChange}
                            helperText = { passworderror ? "Required!" : loginerror ? "Invalid Credentials" : null}
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
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            className={classes.submit}
                        >
                        Log In
                        </Button>
                        <Link to="/signup" variant="body2" className={classes.link}>
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </form>    
                </Paper>
            </div>
        </Container>
    )

}

export default Login;