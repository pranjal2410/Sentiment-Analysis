import React, { useState, useEffect } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import jwt_decode from 'jwt-decode';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { ListItem, ListItemIcon, ListItemText ,Hidden, Drawer, CssBaseline, AppBar, Toolbar, Typography, Divider, IconButton, Slide, Button, List, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControlLabel, Checkbox} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
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
  },
  textfield: {
    margin: '10px 0px'
  }
}));

const Navbar = () => {
    const classes = useStyles();
    const dummy = null;
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [dialog, setDialog] = useState(false);
    const [data, setData] = useState({
      email : '',
      fname : '',
      lname: '',
      city: '',
      state: '',
      twitter: false
    })
    const history = useHistory();

    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

    const handleLogout = () => {
      document.cookie = "usertoken=; path=/;";
      history.push('/');
    }

    const handleDialog = () => {
      setDialog(!dialog);
    }
    
    const handleChange = (event) => {
      let id = event.currentTarget.id;
      if( id === 'fname') {
        setData({...data, fname:event.target.value})
      }
      else if(id === 'lname') {
        setData({...data, lname:event.target.value})
      }
      else if(id === 'email') {
        setData({...data, email:event.target.value})
      }
      else if(id === 'city') {
        setData({...data, city:event.target.value})
      }
      else if(id === 'state') {
        setData({...data, state:event.target.value})
      }
      else  { 
        // twitter 
        setData({...data, twitter:!data.twitter})
      }

    }

    const handleSubmit = (e) => {
      e.preventDefault();
      axios({
        method: 'post',
        headers : {
          'Content-Type':'application/json'
      },
      data : {
          fname: data.fname,
          lname: data.lname,
          email: data.email,
          password: data.password,
          city: data.city,
          state: data.state,
          twitter: data.twitter,
      },
      url: '/api/edit',
      })
      .then(() => {
        setDialog(false);
        window.alert("Profile details updated successfully");
      })
      .catch(() => {
        window.alert("Could not update data");
      })
    }

    useEffect(() => {
        
        let token = decodeURIComponent(document.cookie.split('=')[1]);
        
        if( token === '' || token === undefined ) {
            history.push('/');
        }
        else {
            let data= jwt_decode(token);
            setData({
            fname: data.fname, 
            lname: data.lname,
            email : data.email,
            city: data.city,
            state: data.state,
            twitter: data.twitter
          })
        }
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
              <Hidden mdDown>
                <Button style={{ color: '#fff'}} onClick={handleDialog}>Edit Profile</Button>
                <Button style={{ color: '#fff' }} onClick = {() => history.push('/dashboard')}>Dashboard</Button>
                <Button style={{ color: '#fff' }} onClick = {() => history.push('/dashboard/charts')}>Charts</Button>
                <Button style={{ color: '#fff'}} onClick = {handleLogout} >Logout </Button>        
              </Hidden>
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

            <div className={classes.profile}> {data.fname.charAt(0)}{data.lname.charAt(0)}</div>

            <Divider />

            <p className={classes.name}>{data.fname} {data.lname}</p>
            <p className={classes.email}>{data.email} | {data.city}, {data.state}</p>

            <Button variant="contained" style={{ color: '#fff',margin: '10px auto 15px', backgroundColor: "#00acee"}} onClick={handleDialog}>Edit Profile</Button>

            <Divider/>

            <Dialog
              aria-labelledby="form-dialog-title" 
              open={dialog} 
              onClose={handleDialog}
            >
            
              <DialogTitle id="form-dialog-title">Edit Your Profile Details</DialogTitle>
              <form onSubmit={handleSubmit}>
                <DialogContent>
                <TextField
                  variant="outlined"
                  className={classes.textfield}
                  onChange= {handleChange}
                  margin="normal"
                  id="fname"
                  label="First Name"
                  type="text"
                  autoComplete="First Name"
                  value={ data.fname }
                  autoFocus required fullWidth
                />
                <TextField
                  className={classes.textfield}
                  onChange= {handleChange}
                  variant="outlined"
                  margin="normal"
                  id="lname"
                  label="Last Name"
                  type="text"
                  autoComplete="Last Name"
                  value={ data.lname }
                  autoFocus required fullWidth
                />
                <TextField
                  variant="outlined"
                  className={classes.textfield}
                  onChange= {handleChange}
                  id="email"
                  label="Email Address"
                  value = { data.email }
                  autoFocus required fullWidth
                />
                <TextField
                  variant="outlined"
                  className={classes.textfield}
                  onChange= {handleChange}
                  id="city"
                  label="Enter city name"
                  value = { data.city }
                  autoFocus required fullWidth
                />
                <TextField
                  variant="outlined"
                  className={classes.textfield}
                  onChange= {handleChange}
                  id="state"
                  label="Enter state name"
                  value = { data.state }
                  autoFocus required fullWidth
                />
                <FormControlLabel
                  className={classes.textfield}
                  onChange= {handleChange}
                  control={<Checkbox name="twitter"  color="primary" />}
                  label="I have a Twitter account"
                  id="twitter"
                  checked = { data.twitter }
                />
                </DialogContent>
                <DialogActions>
                  <Button color="primary" onClick={handleDialog}>
                    CANCEL
                  </Button>
                  <Button color="primary" type="submit">
                    EDIT
                  </Button>
                </DialogActions>
              </form>
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