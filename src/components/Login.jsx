import React from 'react';
import { Container ,Grid, Link, Typography, makeStyles, Paper, TextField, Button, Avatar } from '@material-ui/core';
import { LockOpen } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    cont : {
        paddingTop: '50%'
    },
    form : {
        padding: '20px',
        paddingTop: '0px',
        paddingBottom: '10px',

    },
    header : {
        paddingTop: '10px'
    },
    grid : {
        paddingTop: '10px',
        
    },
    avatar: {
        margin: 'auto',
        backgroundColor: theme.palette.secondary.main,
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    heading : {
        paddingTop: '10px'
    }
}));

const Login = () => {
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="sm">
            <div className={classes.cont}>
                <Paper className={classes.paper} elevation={5}>
                    <div class={classes.heading}>
                        <Avatar className={classes.avatar}>
                            <LockOpen />
                        </Avatar>
                        <Typography className={classes.header} align="center" variant="h4">
                            LOGIN
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
                        className={classes.submit}
                        >
                        Log In
                        </Button>
                        <Grid container className={classes.grid}>
                            <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                            </Grid>
                            <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                            </Grid>
                        </Grid>
                    </form>    
                </Paper>
            </div>
        </Container>
    )

}

export default Login;