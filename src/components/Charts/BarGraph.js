import React from 'react';
import { Bar} from 'react-chartjs-2';

const color = ['rgba(255, 99, 132, 0.8)','rgba(54, 162, 235, 0.8)','rgba(255, 206, 86, 0.8)','rgba(75, 192, 192, 0.8)','rgba(153, 102, 255, 0.8)','rgba(255, 159, 64, 0.8)','rgba(255, 99, 132, 0.8)','rgba(54, 162, 235, 0.8)','rgba(255, 206, 86, 0.8)','rgba(75, 192, 192, 0.8)','rgba(153, 102, 255, 0.8)','rgba(255, 159, 64, 0.8)','rgba(255, 99, 132, 0.8)','rgba(54, 162, 235, 0.8)','rgba(255, 206, 86, 0.8)','rgba(75, 192, 192, 0.8)','rgba(153, 102, 255, 0.8)','rgba(255, 159, 64, 0.8)','rgba(255, 99, 132, 0.8)','rgba(54, 162, 235, 0.8)','rgba(255, 206, 86, 0.8)','rgba(75, 192, 192, 0.8)','rgba(153, 102, 255, 0.8)','rgba(255, 159, 64, 0.8)','rgba(255, 99, 132, 0.8)','rgba(54, 162, 235, 0.8)','rgba(255, 206, 86, 0.8)','rgba(75, 192, 192, 0.8)','rgba(153, 102, 255, 0.8)','rgba(255, 159, 64, 0.8)','rgba(255, 99, 132, 0.8)','rgba(54, 162, 235, 0.8)','rgba(255, 206, 86, 0.8)','rgba(255, 99, 132, 0.8)','rgba(54, 162, 235, 0.8)','rgba(255, 206, 86, 0.8)','rgba(75, 192, 192, 0.8)',]

const BarGraph = ({labels}) => {
    return (  
        <Bar 
            data={{
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
            }}  
            options={{
                title:{
                    display:true,
                    text: 'Statewise graph of COVID-19 confirmed cases',
                    fontSize:26
                },
                legend:{
                    display:true,
                    position:'right'
                }
            }}
        />
    );
}

export default BarGraph;