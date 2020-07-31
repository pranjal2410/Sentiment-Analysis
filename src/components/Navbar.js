import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import jwt_decode from 'jwt-decode';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Drawer, CssBaseline, AppBar, Toolbar, Typography, Divider, IconButton, Slide, Button, List, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControlLabel, Checkbox} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useHistory } from 'react-router-dom';
import { ExitToApp, Equalizer, Dashboard } from '@material-ui/icons';


const drawerWidth = 340;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  heading: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#00acee"
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  profile : {
    backgroundColor:'#00acee',
    height:'200px',
    width:'200px',
    marginLeft: '21%',
    marginTop: '30px',
    borderRadius: '100%',
    textAlign:'center',
    paddingTop: '12%',
    marginBottom: '30px',
    fontSize : '6em',
    color:'white'
  },
  name : {
    textAlign:'center',
    fontSize:'2em',
    marginBottom : '0px',

  },
  email : {
    margin: '2px',
    color : '##808080',
    textAlign: 'center',
    marginBottom: '15px',
  },
  edit : {
    margin: '5px auto 15px' 
  }
}));

const Navbar = () => {
    const classes = useStyles();
    const dummy = null;
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [loggedin, setLoggedIn] = useState(true);
    const [dialog, setDialog] = useState(false);
    const [data, setData] = useState({
      email : '',
      name : '',
      city: '',
      state: ''
    })
    const history = useHistory();

    const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
    });
    
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

    const handleLogout = () => {
      setLoggedIn(false);
      document.cookie = "usertoken=; path=/;";
      history.push('/');
    }

    const handleDialog = () => {
      setDialog(!dialog);
    }

    useEffect(() => {
        let token = decodeURIComponent(document.cookie.split('=')[1]);
        let data= jwt_decode(token);
        console.log(data);

        setData({
          name: `${data.fname} ${data.lname}`,
          email : data.email,
          city: data.city,
          state: data.state
        })
    }, [dummy])

    return(

    <div className={classes.root}>
    <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.heading}>
            Welcome to your Dashboard!
          </Typography>
            <Button style={{ color: '#fff'}} onClick={handleDialog}>Edit Profile</Button>
            <Button style={{ color:'#fff' }} onClick = {() => history.push('/dashboard')}>Dashboard</Button>
            <Button style={{ color:'#fff' }} onClick = {() => history.push('/dashboard/charts')}>Charts</Button>
            <Button style={{ color: '#fff'}} onClick = {handleLogout} >Logout </Button>        
        </Toolbar>
        
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />

        <div className={classes.profile}> {data.name.split(' ')[0].charAt(0)}</div>

        <Divider />

        <p className={classes.name}>{data.name}</p>
        <p className={classes.email}>{data.email} | {data.city}, {data.state}</p>

        <Divider/>
        
        <Dialog aria-labelledby="form-dialog-title" open={dialog} TransitionComponent={Transition} keepMounted onClose={handleDialog}>
        
          <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
          <DialogContent>
          <TextField
            variant="outlined"
            margin="normal"
            id="fname"
            label="First Name"
            type="text"
            autoComplete="First Name"
            autoFocus required fullWidth
          />
          <TextField
            variant="outlined"
            margin="normal"
            id="lname"
            label="Last Name"
            type="text"
            autoComplete="Last Name"
            autoFocus required fullWidth
          />
          <TextField
            id="email"
            variant="outlined"
            label="Email Address"
            autoFocus required fullWidth
          />
          <TextField
            id="city"
            variant="outlined"
            label="Enter city name"
            autoFocus required fullWidth
          />
          <TextField
            id="state"
            variant="outlined"
            label="Enter state name"
            autoFocus required fullWidth
          />
          <FormControlLabel
            control={<Checkbox name="twitter"  color="primary" />}
            label="I have a Twitter account"
            id="twitter"
          />
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={handleDialog}>
              Cancel
            </Button>
            <Button color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>

        <List>
          <ListItem button onClick = {() => history.push('/dashboard')}>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard"/>
          </ListItem>
          <ListItem button onClick = {() => history.push('/dashboard/charts')}>
            <ListItemIcon>
              <Equalizer />
            </ListItemIcon>
            <ListItemText primary="Charts"/>
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Logout"/>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
      <div className={classes.drawerHeader} />
     
      </main>
    </div>
    );
}

export default Navbar;