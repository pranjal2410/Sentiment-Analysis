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
    const [state,setState] = useState(true);
    const [location, setLocation] = useState([]);
    const [totalConfirmed, setTotalConfirmed] = useState([]);

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
            setTotalConfirmed(labels.map(label => label.totalConfirmed))
        })
    }
    useEffect(() => {
        fetchCases()
    },[dummy]);

    const handleChange = (event) => {
        setState(!state);
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
                            state ? <BarGraph location={location} totalConfirmed={totalConfirmed}/> : <DoughNut location={location} totalConfirmed={totalConfirmed}/>
                        }
                        <FormGroup row style={{margin:'auto'}}>
                        <FormControlLabel
                            control={<Switch onChange={handleChange}/>}
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
