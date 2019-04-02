import React from 'react';
import PropTypes from 'prop-types';
import { Typography, withStyles } from '@material-ui/core';
import styles from './Title.style';

const Title = ({ title, style }) => (
  <Typography style={{ ...styles.typography, ...style }}>
    {title}
  </Typography>
);

Title.propTypes = {
  title: PropTypes.string,
  style: PropTypes.shape({}),
};

Title.defaultProps = {
  title: '',
  style: {},
};

export default withStyles(styles)(Title);
