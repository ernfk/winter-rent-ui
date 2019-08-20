import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles, Paper, Table,
  TableHead, TableRow, TableCell, TableBody,
} from '@material-ui/core';
import Title from '../commons/title/Title';
import styles from './Main.style';

const equipments = [
  {
    name: 'SKI', days: '100', week: '200', twoWeeks: '300', month: '500',
  },
  {
    name: 'BOARD', days: '120', week: '220', twoWeeks: '320', month: '520',
  },
  {
    name: 'CASQUE', days: '10', week: '30', twoWeeks: '50', month: '100',
  },
  {
    name: 'BOOTS', days: '30', week: '50', twoWeeks: '70', month: '110',
  },
  {
    name: 'JUNIOR-SET', days: '50', week: '80', twoWeeks: '110', month: '210',
  },
  {
    name: 'PROFESSIONAL-SET', days: '90', week: '180', twoWeeks: '310', month: '410',
  },
];

const Main = ({ classes }) => (
  <div>
    <Title title="Prices" style={styles.title} />
    <Paper className={classes.container}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Equipment</TableCell>
            <TableCell align="right">1-2 day</TableCell>
            <TableCell align="right">3-7 days</TableCell>
            <TableCell align="right">8-14</TableCell>
            <TableCell align="right">month</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {equipments.map((row, i) => (
            <TableRow key={i} className={(i % 2 !== 0) && classes.oddRow}>
              <TableCell component="th" scope="row">{row.name}</TableCell>
              <TableCell align="right">{row.days}</TableCell>
              <TableCell align="right">{row.week}</TableCell>
              <TableCell align="right">{row.twoWeeks}</TableCell>
              <TableCell align="right">{row.month}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  </div>
);

Main.propTypes = {
  classes: PropTypes.shape({}),
};

Main.defaultProps = {
  classes: {},
};

export default withStyles(styles)(Main);
