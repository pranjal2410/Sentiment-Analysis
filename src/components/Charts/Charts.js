import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, CircularProgress, Container, FormGroup, FormControlLabel, Switch } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import BarGraph from './BarGraph';
import PieChart from './PieChart';

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
    const [labels, setLabels] = useState([]);
    const [spinner, setSpinner] = useState(true);
    const [state,setState] = useState(true);

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
            setLabels(response.data.data.regional);
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
                        <Typography variant="h6">Loading you data..</Typography>
                    </div>
                ):(
                    <Container>
                        <FormGroup row>
                        <FormControlLabel
                            control={<Switch checked={state.checkedA} onChange={handleChange} name="checkedA" />}
                            label="Switch Graph Type"
                         />
                        </FormGroup>
                        { state ? 
                            (<BarGraph labels={labels} />) : (<PieChart labels={labels}/>)
                        }
                    </Container>
                )
            }
        </div>
    );
}

export default Charts;