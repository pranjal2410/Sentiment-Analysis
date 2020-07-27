import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, CircularProgress, Container, FormGroup, FormControlLabel, Switch } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Bar, Doughnut } from 'react-chartjs-2';

const color = ['rgba(255, 99, 132, 0.8)','rgba(54, 162, 235, 0.8)','rgba(255, 206, 86, 0.8)','rgba(75, 192, 192, 0.8)','rgba(153, 102, 255, 0.8)','rgba(255, 159, 64, 0.8)','rgba(255, 99, 132, 0.8)','rgba(54, 162, 235, 0.8)','rgba(255, 206, 86, 0.8)','rgba(75, 192, 192, 0.8)','rgba(153, 102, 255, 0.8)','rgba(255, 159, 64, 0.8)','rgba(255, 99, 132, 0.8)','rgba(54, 162, 235, 0.8)','rgba(255, 206, 86, 0.8)','rgba(75, 192, 192, 0.8)','rgba(153, 102, 255, 0.8)','rgba(255, 159, 64, 0.8)','rgba(255, 99, 132, 0.8)','rgba(54, 162, 235, 0.8)','rgba(255, 206, 86, 0.8)','rgba(75, 192, 192, 0.8)','rgba(153, 102, 255, 0.8)','rgba(255, 159, 64, 0.8)','rgba(255, 99, 132, 0.8)','rgba(54, 162, 235, 0.8)','rgba(255, 206, 86, 0.8)','rgba(75, 192, 192, 0.8)','rgba(153, 102, 255, 0.8)','rgba(255, 159, 64, 0.8)','rgba(255, 99, 132, 0.8)','rgba(54, 162, 235, 0.8)','rgba(255, 206, 86, 0.8)','rgba(255, 99, 132, 0.8)','rgba(54, 162, 235, 0.8)','rgba(255, 206, 86, 0.8)','rgba(75, 192, 192, 0.8)',]

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
    const [chartProps, setChartProps] = useState({});
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
            const labels = response.data.data.regional;
            setChartProps({
                data: {
                    labels: labels.map( label => label.loc),
                    datasets:[
                        {
                            label:'Confirmed Cases',
                            data: labels.map( label => label.totalConfirmed),
                            backgroundColor: color,
                            borderColor: color,
                            borderWidth: 2,
                            hoverBorderWidth:2,
                            hoverBorderColor:'#000'
    
                        }
                    ],
                }, 
                options: {
                    title:{
                        display:true,
                        text: 'Statewise graph of COVID-19 confirmed cases',
                        fontSize:26
                    },
                    legend:{
                        display:true,
                        position:'right'
                    }
                }
            });

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
                        <FormGroup row>
                        <FormControlLabel
                            control={<Switch checked={state.checkedA} onChange={handleChange} name="checkedA" />}
                            label="Switch Graph Type"
                         />
                        </FormGroup>
                        {
                            state ? <Bar {...chartProps}/> : <Doughnut {...chartProps}/>
                        }
                    </Container>
                )
            }
        </div>
    );
}

export default Charts;