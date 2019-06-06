import React from 'react';
import { withStyles } from '@material-ui/core';
import Title from '../../commons/title/Title';
import styles from './History.style';

const History = () => (
  <div>
    <Title
      title="History of reservations"
      style={styles.header}
    />
  </div>
);

export default withStyles(styles)(History);
