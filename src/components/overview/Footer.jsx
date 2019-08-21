import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, withStyles } from '@material-ui/core';
import styles from './Footer.style';

const Footer = ({ classes }) => (
  <AppBar
    classes={{ root: classes.footer }}
    color="default"
    position="fixed"
    elevation={24}
  >
    <span className={classes.title}>Copyright © 2019 efk</span>
  </AppBar>
);

Footer.propTypes = {
  classes: PropTypes.shape({}),
};

Footer.defaultTypes = {
  classes: {},
};

export default withStyles(styles)(Footer);
