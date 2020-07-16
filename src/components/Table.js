import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


const SimpleTable = () => {
  
  const classes = useStyles();
  const dummy = null;
  const [rows, setRows] = useState([]);

  const fetchrows = () => {
    axios({
      method:'GET',
      headers: {
        "Content-Type": "appliction/json"
      },
      url: "https://api.rootnet.in/covid19-in/stats/latest"
    })
    .then((response) => {
      setRows(response.regional);
    })
    .catch((err) => window.alert(err));
  }

  useEffect(() => { 
    fetchrows() 
  }, [dummy]);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Location</TableCell>
            <TableCell align="right">Confirmed Cases Indian</TableCell>
            <TableCell align="right">Confirmed Cases Foreign</TableCell>
            <TableCell align="right">Total Confirmed Cases</TableCell>
            <TableCell align="right">Discharged</TableCell>
            <TableCell align="right">Deaths</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.loc}
              </TableCell>
              <TableCell align="right">{row.confirmedCasesIndian}</TableCell>
              <TableCell align="right">{row.confirmedCasesForeign}</TableCell>
              <TableCell align="right">{row.totalConfirmed}</TableCell>
              <TableCell align="right">{row.discharged}</TableCell>
              <TableCell align="right">{row.deaths}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SimpleTable;
