import React, { useState, useEffect } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';

import axios from 'axios';

import { Typography, CircularProgress, Container, FormGroup, FormControlLabel, Switch, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const color = ['rgba(255, 99, 132, 0.8)','rgba(54, 162, 235, 0.8)','rgba(255, 206, 86, 0.8)','rgba(75, 192, 192, 0.8)','rgba(153, 102, 255, 0.8)','rgba(255, 159, 64, 0.8)','rgba(255, 99, 132, 0.8)','rgba(54, 162, 235, 0.8)','rgba(255, 206, 86, 0.8)','rgba(75, 192, 192, 0.8)','rgba(153, 102, 255, 0.8)','rgba(255, 159, 64, 0.8)','rgba(255, 99, 132, 0.8)','rgba(54, 162, 235, 0.8)','rgba(255, 206, 86, 0.8)','rgba(75, 192, 192, 0.8)','rgba(153, 102, 255, 0.8)','rgba(255, 159, 64, 0.8)','rgba(255, 99, 132, 0.8)','rgba(54, 162, 235, 0.8)','rgba(255, 206, 86, 0.8)','rgba(75, 192, 192, 0.8)','rgba(153, 102, 255, 0.8)','rgba(255, 159, 64, 0.8)','rgba(255, 99, 132, 0.8)','rgba(54, 162, 235, 0.8)','rgba(255, 206, 86, 0.8)','rgba(75, 192, 192, 0.8)','rgba(153, 102, 255, 0.8)','rgba(255, 159, 64, 0.8)','rgba(255, 99, 132, 0.8)','rgba(54, 162, 235, 0.8)','rgba(255, 206, 86, 0.8)','rgba(255, 99, 132, 0.8)','rgba(54, 162, 235, 0.8)','rgba(255, 206, 86, 0.8)','rgba(75, 192, 192, 0.8)',]

const theme = createMuiTheme();

theme.typography.h3 = {
    fontSize: '2rem',
    [theme.breakpoints.up('md')]: {
      fontSize: '3rem',
    },
};


const useStyles = makeStyles({
    card: {
        overflowX: "auto",
        marginBottom: "20px"
    },
    loading : {
        margin: 'auto',
        width: '50%',
        textAlign:'center',
        paddingTop: '15%'
    },
})

const Charts = () => {
    const dummy = null;
    const classes = useStyles();
    const [spinner, setSpinner] = useState(true);
    const [toggle,setToggle] = useState({ 
                                switch1: true, 
                                switch2: true,
                                switch3: true,
                            });
    const [location, setLocation] = useState([]);
    const [totalConfirmed, setTotalConfirmed] = useState([]);
    const [deaths, setDeaths] = useState([]);
    const [discharged, setDischarged] = useState([]);
    const [time, setTime] = useState({});

    const fetchCases = () => {
        axios({
            method:'get',
            headers: {
                'Content-type':'application/json'
            },
            url: 'https://api.rootnet.in/covid19-in/stats/latest'
        })
        .then(response => {
            setTimeout(() => setSpinner(false), 1000);
            const labels = response.data.data.regional;
            setLocation(labels.map(label => label.loc));
            setTotalConfirmed(labels.map(label => label.totalConfirmed));
            setDeaths(labels.map(label => label.deaths));
            setDischarged(labels.map(label => label.discharged));
            setTime(response.data.lastRefreshed);
        })
        .catch(() => window.alert("Please Check you internet connection!"))
		}
		
    useEffect(() => {
        fetchCases()
    },[dummy]);

    const handleSwitch = (event) => {   
        if(event.currentTarget.id === 'switch1') {
            setToggle({...toggle, switch1: !toggle.switch1})
        }
        else if(event.currentTarget.id === 'switch2') {
            setToggle({...toggle, switch2:!toggle.switch2})
        } 
        else if(event.currentTarget.id == 'switch3') {
            setToggle({...toggle, switch3:!toggle.switch3})
        }
    }

    const generateChart = (loc, data, label) => {
        return({
            data: {
                labels:loc,
                datasets:[
                    {
                        label: label,
                        data: data,
                        backgroundColor: color,
                        borderColor: color,
                        borderWidth: 2,
                        hoverBorderWidth:2,
                        hoverBorderColor:'#000'

                    }
                ],
            },
            width: 1152,
            height: 648,
            options: {
                legend:{
                    display:true,
                    position:'right'
                },
                maintainAspectRatio: false,
                responsive: false
            }
        });
    }
    
    return (
        <div className="charts">
            {
                spinner ? 
                (
                    <div className={classes.loading}>
                        <CircularProgress />
                        <Typography variant="h6">Loading your data..</Typography>
                    </div>
                ):(
                    <Container>
                        <Typography variant='h2' style={{paddingBottom:'10px'}}>
                            Graphical Representation of Data
                        </Typography>
                        <Typography style={{paddingBottom:'30px'}}>
					                Data last updated on {time.slice(0,10)} at {time.slice(11,19)} IST 
                        </Typography>
                            
                        <Card className={classes.card}>
                            <ThemeProvider theme={theme}>
                                <Typography variant="h3" align="center" style={{fontWeight:'lighter', paddingTop: '30px'}}>
                                    Total Confirmed Cases
                                </Typography>
                            </ThemeProvider>
                            <div style = {{padding: "20px"}}>
                                {
                                    toggle.switch1 ?
                                    <Bar {...generateChart(location, totalConfirmed, "Confirmed Cases")}/> :
                                    <Doughnut {...generateChart(location, totalConfirmed, "Confirmed Cases")}/>
                                }
                                <FormGroup row>
                                    <FormControlLabel
                                        control={<Switch onChange={handleSwitch} id="switch1" />}
                                        label="Switch Graph Type"
                                    />
                                </FormGroup>
                            </div>
                        </Card>  
                        <Card className={classes.card}>
                            <Typography variant="h3" align="center" style={{fontWeight:'lighter', paddingTop: '30px'}}>
                                Total Deaths
                            </Typography>
                            <div style = {{padding: "20px"}}>
                                {
                                    toggle.switch2 ? 
                                    <Bar {...generateChart(location, deaths, "Deaths")} /> : 
                                    <Doughnut {...generateChart(location, deaths, "Deaths")}/>
                                }
                                <FormGroup row >
                                    <FormControlLabel
                                        control={<Switch onChange={handleSwitch} id="switch2"/>}
                                        label="Switch Graph Type"
                                    />
                                </FormGroup>
                            </div>
                        </Card>
                        <Card className={classes.card}>
                            <Typography variant="h3" align="center" style={{fontWeight:'lighter', paddingTop: '30px'}}>
                                Total Discharged
                            </Typography>
                            <div style = {{padding: "20px"}}>
                                {
                                    toggle.switch3 ? 
                                    <Bar {...generateChart(location, discharged, "Discharged")} /> : 
                                    <Doughnut {...generateChart(location, discharged, "Discharged")}/>
                                }
                                <FormGroup row >
                                    <FormControlLabel
                                        control={<Switch onChange={handleSwitch} id="switch3"/>}
                                        label="Switch Graph Type"
                                    />
                                </FormGroup>
                            </div>
                        </Card>
                    </Container>
                )
            }
        </div>
    );
}

export default Charts;
