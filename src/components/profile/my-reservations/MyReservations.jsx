import React from 'react';
import { withStyles } from '@material-ui/core';
import Title from '../../commons/title/Title';
import styles from './MyReservations.style';

const MyReservations = () => (
  <div>
    <Title
      title="Your current reservations"
      style={styles.header}
    />
  </div>
);

export default withStyles(styles)(MyReservations);
