import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Typography, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

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
            console.log(response);
            setLabels(response.data.data.regional);
        })
    }
    useEffect(() => {
        fetchCases()
    },[dummy]);
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
                    <Bar
                        data={{
                            labels: labels.map( label => label.loc),
                            datasets:[
                                {
                                    label:'Population',
                                    data: labels.map( label => label.totalConfirmed),
                                    backgroundColor: 'green'
                                }
                            ]
                            }}
                        width={100}
                        height={50}
                    />
                    
                )
            }
        </div>
    );
}

export default Charts;