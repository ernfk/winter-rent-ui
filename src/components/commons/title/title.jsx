import React from 'react';
import PropTypes from 'prop-types';
import { Typography, withStyles } from '@material-ui/core';
import styles from './title.style';

const Title = ({ title }) => (
  <Typography style={styles.typography}>
    {title}
  </Typography>
);

Title.propTypes = {
  title: PropTypes.string,
};

Title.defaultProps = {
  title: '',
};

export default withStyles(styles)(Title);
