import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, CircularProgress, Container, FormGroup, FormControlLabel, Switch } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import BarGraph from './BarGraph';
import DoughNut from './DoughNut';

const useStyles = makeStyles({
    loading : {
        margin: 'auto',
        width: '50%',
        textAlign:'center',
        paddingTop: '20%'
    },
})

const Charts = () => {
    const dummy = null;
    const classes = useStyles();
    const [spinner, setSpinner] = useState(true);
    const [state,setState] = useState({ 
                                switch1: true, 
                                switch2: true
                            });
    const [location, setLocation] = useState([]);
    const [totalConfirmed, setTotalConfirmed] = useState([]);
    const [deaths, setDeaths] = useState([]);

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
            setDeaths(labels.map(label => label.deaths))
        })
    }
    useEffect(() => {
        fetchCases()
    },[dummy]);

    const handleSwitch1 = () => {   
    }
    const handleSwitch2 = () => {
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
                        {
                            state.switch1 ? 
                                <BarGraph location={location} data={totalConfirmed} label='Confirmed Cases'/> : 
                                <DoughNut location={location} data={totalConfirmed} label='Confirmed Cases'/>
                        }
                        <FormGroup row style={{margin:'auto'}}>
                        <FormControlLabel
                            control={<Switch onChange={handleSwitch1}/>}
                            label="Switch Graph Type"
                         />
                        </FormGroup>
                        {
                            state.switch2 ? 
                                <BarGraph location={location} data={deaths} label='Deaths'/> : 
                                <DoughNut location={location} data={deaths} label='Deaths'/>
                        }
                        <FormGroup row style={{margin:'auto'}}>
                        <FormControlLabel
                            control={<Switch onChange={handleSwitch2}/>}
                            label="Switch Graph Type"
                         />
                        </FormGroup>
                    </Container>
                )
            }
        </div>
    );
}

export default Charts;
