import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import axios from 'axios';
import clsx from 'clsx';

import { ListItem, ListItemIcon, ListItemText ,Hidden, Drawer, CssBaseline, AppBar, Toolbar, Typography, Divider, IconButton, Button, List, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControlLabel, Checkbox} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { ExitToApp, Equalizer, Dashboard } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';


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
	},
	btn : { 
		color: '#fff',
		margin: '10px auto 15px', 
		backgroundColor: "#00acee"
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
		first_name : '',
		last_name: '',
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
      if( id === 'first_name') {
        setData({...data, first_name:event.target.value})
      }
      else if(id === 'last_name') {
        setData({...data, last_name:event.target.value})
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
      let cookie = getCookie("usertoken");
      axios({
        method: 'patch',
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type":"application/json",
          "Authorization": `Bearer ${cookie}`
        },
      data : {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          password: data.password,
          city: data.city,
          state: data.state,
          twitter: data.twitter,
      },
      url: '/api/edit/',
      })
      .then(() => {
        setDialog(false);
        window.alert("Profile details updated successfully");
      })
      .catch(() => {
        window.alert("Could not update data");
      })
    }

    const getCookie = (name) => {
      let dc = document.cookie;
      let prefix = name + "=";
      let begin = dc.indexOf('; ' + prefix);
      if (begin === -1) {
        begin = dc.indexOf(prefix);
        if (begin !== 0) return null;
      }
      else
      {
          begin += 2;
          var end = document.cookie.indexOf(";", begin);
          if (end === -1) {
            end = dc.length;
          }
      }
      return decodeURI(dc.substring(begin + prefix.length, end));

    }

    const fetchProfile = () => {
      	let cookie = getCookie("usertoken");
		axios({
			method:'get',
			headers: {
			"Access-Control-Allow-Origin": "*",
			"Content-Type":"application/json",
			"Authorization": `Bearer ${cookie}`
			},
			url : '/api/profile/',
		})
		.then(response => {
			let object = response.data.data[0];
			setData({
			email: object.email,
			first_name : object.first_name,
			last_name: object.last_name,
			city: object.city,
			state: object.state,
			twitter: object.twitter

			})
		})
		.catch(error => console.log(error))
		}

    useEffect(() => {
		fetchProfile();
    }, [dummy])
	
    return (
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

				<div className={classes.profile}> {data.first_name.charAt(0)}{data.last_name.charAt(0)}</div>

				<Divider />

				<p className={classes.name}>{data.first_name} {data.last_name}</p>
				<p className={classes.email}>{data.email} | {data.city}, {data.state}</p>

				<Button 
					variant="contained" 
					className={classes.btn} 
					onClick={handleDialog}
				>
					Edit Profile
				</Button>

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
									id="first_name"
									label="First Name"
									type="text"
									autoComplete="First Name"
									value={ data.first_name }
									autoFocus required fullWidth
								/>
								<TextField
									className={classes.textfield}
									onChange= {handleChange}
									variant="outlined"
									margin="normal"
									id="last_name"
									label="Last Name"
									type="text"
									autoComplete="Last Name"
									value={ data.last_name }
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