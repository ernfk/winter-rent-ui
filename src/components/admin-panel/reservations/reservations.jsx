import React from 'react';
import { Typography, withStyles } from '@material-ui/core';
import styles from './reservations.style';

const Reservations = () => <Typography style={styles.reservationsTypography}> Manage reservations </Typography>;

export default withStyles(styles)(Reservations);
