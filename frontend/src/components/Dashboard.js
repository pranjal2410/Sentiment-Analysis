import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography, Grid, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  headers : {
    paddingBottom: '5px'
  },
  time : {
    paddingBottom: '40px'
  },
  loading : {
    margin: 'auto',
    width: '50%',
    textAlign:'center',
    paddingTop: '25%'
  },
  paperNumber: {
    paddingTop: '30px',
    textAlign: 'center',
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#a317ad'
  },
  paperTitle : {
    textAlign: 'center',
    paddingTop: '2px',
    paddingBottom: '22px',
    fontSize: '14px'
  },
});


const SimpleTable = () => {
  
  const classes = useStyles();
  const dummy = null;
  const [rows, setRows] = useState([]);
  const [latest, setLatest] = useState({});
  const [time, setTime] = useState({});
  const [spinner, setSpinner] = useState(true);


  const fetchrows = () => {
    axios({
		method:'GET',
		headers: {
			"Content-Type": "application/json"
		},
		url: "https://api.rootnet.in/covid19-in/stats/latest"
    })
    .then((response) => {
		setTimeout(() => setSpinner(false), 1000);
		setLatest(response.data.data.summary);
		setRows(response.data.data.regional);
		setTime(response.data.lastRefreshed);
    })
    .catch(() => window.alert("Please Check you internet connection!"));
  }

  useEffect(() => { 
	fetchrows() 
  }, [dummy]);

  return (
    <Container>
    { 
		spinner ? 
			<div className={classes.loading}>
				<CircularProgress />
				<Typography variant="h6">Loading your data..</Typography>
			</div>
		:
			<div>
				<Typography variant="h2" className={classes.headers}>
					Current COVID-19 Cases In India
				</Typography>
				<Typography className={classes.time}>
					Cases updated on {time.slice(0,10)} at {time.slice(11,19)} IST 
				</Typography>
				<Grid container spacing={3} style={{paddingBottom:'40px'}}>
					<Grid item xs={12} sm={6}>
						<Paper elevation={3} style={{paddingLeft:'2px', paddingRight:'2px'}}>
							<Typography className={classes.paperNumber}>
								{latest.total}
							</Typography>
							<Typography className={classes.paperTitle}>
								Confirmed Cases
							</Typography>
						</Paper>
					</Grid>
					<Grid item xs={12} sm={6}>
					<Paper elevation={3} style={{paddingLeft:'2px', paddingRight:'2px'}}>
							<Typography className={classes.paperNumber}>
								{latest.confirmedCasesIndian}
							</Typography>
							<Typography className={classes.paperTitle}>
								Confirmed Cases Indian
							</Typography>
						</Paper>
					</Grid>
					<Grid item xs={12} sm={6}>
					<Paper elevation={3} style={{paddingLeft:'2px', paddingRight:'2px'}}>
							<Typography className={classes.paperNumber}>
								{latest.confirmedCasesForeign}
							</Typography>
							<Typography className={classes.paperTitle}>
								Confirmed Cases Foreign
							</Typography>
						</Paper>
					</Grid>
					<Grid item xs={12} sm={6}>
					<Paper elevation={3} style={{paddingLeft:'2px', paddingRight:'2px'}}>
							<Typography className={classes.paperNumber}>
								{latest.discharged}
							</Typography>
							<Typography className={classes.paperTitle}>
								Discharged
							</Typography>
						</Paper>
					</Grid>
					<Grid item xs={12} sm={6}>
					<Paper elevation={3} style={{paddingLeft:'2px', paddingRight:'2px'}}>
							<Typography className={classes.paperNumber}>
								{latest.deaths}
							</Typography>
							<Typography className={classes.paperTitle}>
								Deaths
							</Typography>
						</Paper>
					</Grid>
					<Grid item xs={12} sm={6}>
					<Paper elevation={3} style={{paddingLeft:'2px', paddingRight:'2px'}}>
							<Typography className={classes.paperNumber}>
								{latest.confirmedButLocationUnidentified}
							</Typography>
							<Typography className={classes.paperTitle}>
								Confirmed Cases Uniidentified
							</Typography>
						</Paper>
					</Grid>
				</Grid>
				
			
				
				<Typography variant="h2" className={classes.headers} >
					State Wise COVID-19 Data In India
				</Typography>
				<Typography className={classes.time}>
					Cases updated on {time.slice(0,10)} at {time.slice(11,19)} IST 
				</Typography>
				<TableContainer component={Paper}>
					<Table className={classes.table} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell align="center">Serial Number</TableCell>
								<TableCell align="center">Location</TableCell>
								<TableCell align="center">Total Confirmed Cases</TableCell>
								<TableCell align="center">Confirmed Cases Indian</TableCell>
								<TableCell align="center">Confirmed Cases Foreign</TableCell>
								<TableCell align="center">Discharged</TableCell>
								<TableCell align="center">Deaths</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{
								rows.map((row, index) => {
									return (
										<TableRow key={index}>
											<TableCell align="center">{index+1}</TableCell>
											<TableCell align="center">{row.loc}</TableCell>
											<TableCell align="center">{row.confirmedCasesIndian}</TableCell>
											<TableCell align="center">{row.confirmedCasesForeign}</TableCell>
											<TableCell align="center">{row.totalConfirmed}</TableCell>
											<TableCell align="center">{row.discharged}</TableCell>
											<TableCell align="center">{row.deaths}</TableCell>
										</TableRow>
									);
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		
	}
    </Container>
  );
}

export default SimpleTable;
